import { authRequestConfig, redirectUri } from "@/utils/auth/auth.constants";
import * as AuthStorage from "@/utils/auth/auth.storage";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useMemo, useState } from "react";

export interface IAuthContext {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

export function useProvideAuth(): IAuthContext {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [discovery, setDiscovery] =
    useState<AuthSession.DiscoveryDocument | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initAuth() {
      try {
        const discoveryUrl = `${process.env.EXPO_PUBLIC_KEYCLOAK_BASE}`;
        const result = await AuthSession.fetchDiscoveryAsync(discoveryUrl);
        setDiscovery(result);

        // Utilise le service de storage
        const { accessToken, refreshToken } = await AuthStorage.loadTokens();

        if (accessToken) {
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
        }
      } catch (error) {
        console.error("Erreur d'initialisation de l'Auth:", error);
      } finally {
        setIsLoading(false);
      }
    }
    initAuth();
  }, []);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    authRequestConfig,
    discovery,
  );

  useEffect(() => {
    if (response?.type !== "success" || !discovery || !response.params.code) {
      return;
    }

    const exchangeCode = async () => {
      try {
        const tokenResult = await AuthSession.exchangeCodeAsync(
          {
            code: response.params.code!,
            clientId: authRequestConfig.clientId,
            redirectUri,
            extraParams: {
              code_verifier: request?.codeVerifier ?? "",
            },
          },
          discovery,
        );

        const newRefreshToken = tokenResult.refreshToken || null;
        setAccessToken(tokenResult.accessToken);
        setRefreshToken(newRefreshToken);

        // Utilise le service de storage
        await AuthStorage.saveTokens(tokenResult.accessToken, newRefreshToken);
      } catch (error) {
        console.error("Erreur d'échange de code :", error);
      }
    };
    exchangeCode();
  }, [response, discovery, request]);

  const login = async () => {
    if (!discovery || !request) {
      console.warn("Configuration Keycloak non chargée. Réessayez.");
      return;
    }
    await promptAsync();
  };

  const logout = async () => {
    setAccessToken(null);
    setRefreshToken(null);

    await AuthStorage.clearTokens();

    if (discovery?.endSessionEndpoint) {
      try {
        const logoutUrl =
          `${discovery.endSessionEndpoint}` +
          `?client_id=${authRequestConfig.clientId}`;
        await WebBrowser.openBrowserAsync(logoutUrl);
      } catch (error) {
        console.error("Erreur lors de la déconnexion Keycloak:", error);
      }
    }
  };

  const contextValue = useMemo(
    () => ({
      accessToken,
      isAuthenticated: !!accessToken,
      login,
      logout,
      isLoading,
    }),
    [accessToken, isLoading],
  );

  return contextValue;
}
