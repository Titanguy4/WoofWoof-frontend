import { authRequestConfig, redirectUri } from "@/utils/auth/auth.constants";
import * as AuthStorage from "@/utils/auth/auth.storage";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { jwtDecode } from "jwt-decode";
import { useEffect, useMemo, useState } from "react";

export interface IAuthContext {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: Record<string, any>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  openAccountPage: () => Promise<void>;
  isWoofer: boolean;
  isBackpacker: boolean;
}

interface KeycloakTokenPayload {
  sub: string;
  realm_access?: { roles: string[] };
  resource_access?: { [clientName: string]: { roles: string[] } };
}

export function useProvideAuth(): IAuthContext {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [discovery, setDiscovery] = useState<
    AuthSession.DiscoveryDocument | null
  >(null);
  const [user, setUser] = useState<Record<string, any>>({ name: "Username " });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const isWoofer: boolean = userRoles.includes("woofer");
  const isBackpacker: boolean = userRoles.includes("backpacker");

  /**
   * Init Auth for Keycloak
   * Search endpoints to realm (discovery)
   */
  useEffect(() => {
    async function initAuth() {
      try {
        const discoveryUrl: string = `${process.env.EXPO_PUBLIC_KEYCLOAK_BASE}`;
        const result: AuthSession.DiscoveryDocument = await AuthSession
          .fetchDiscoveryAsync(discoveryUrl);
        setDiscovery(result);

        // Check if the accessToken doesn't already exist (if user already connect)
        const { accessToken } = await AuthStorage.loadTokens();
        if (accessToken) {
          setAccessToken(accessToken);
        }
      } catch (error) {
        const initAuthErrMessage: string = "Erreur d'initialisation de l'Auth:";
        if (error instanceof Error) {
          console.error(initAuthErrMessage, error.message);
        } else console.log(initAuthErrMessage, error);
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

  /**
   * Due to PKCE, send code to keycloak and except the token
   * The token is save using SecureStore from expo
   */
  useEffect(() => {
    async function exchangeCode() {
      try {
        if (response?.type === "success" && discovery) {
          const config: AuthSession.AccessTokenRequestConfig = {
            code: response.params.code,
            clientId: authRequestConfig.clientId,
            redirectUri,
            extraParams: {
              code_verifier: request?.codeVerifier ?? "",
            },
          };

          const tokenResult: AuthSession.TokenResponse = await AuthSession
            .exchangeCodeAsync(config, discovery);

          setAccessToken(tokenResult.accessToken);
          decodeAndSetRoles(tokenResult.accessToken);
          await AuthStorage.saveTokens(tokenResult.accessToken);

          const userInfo: Record<string, any> = await AuthSession
            .fetchUserInfoAsync(tokenResult, discovery);
          if (userInfo) setUser(userInfo);
        }
      } catch (e) {
        const exchangeCodeErrorMessage = "Erreur d'échange de code :";
        if (e instanceof Error) {
          console.error(exchangeCodeErrorMessage, e.message);
        } else console.error(exchangeCodeErrorMessage, e);
      }
    }

    exchangeCode();
  }, [response, discovery, request]);

  /**
   * Fonctions
   */

  /**
   * Login with keycloak
   * a connection is ask at each connection (no cookies storage)
   * @returns Promise<void>
   */
  async function login(): Promise<void> {
    if (!discovery || !request) {
      console.warn("Configuration Keycloak non chargée. Réessayez.");
      return;
    }
    await promptAsync();
  }

  /**
   * @returns Promise<void>
   */
  async function refreshUserData(): Promise<void> {
    if (!accessToken || !discovery) {
      console.error("Impossible de rafraîchir : token ou discovery manquant.");
      return;
    }

    try {
      const tokenResponse = new AuthSession.TokenResponse({ accessToken });

      const userInfo: Record<string, any> = await AuthSession
        .fetchUserInfoAsync(tokenResponse, discovery);

      if (userInfo) {
        setUser(userInfo);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error("Erreur lors du refreshUserData:", e.message);
      }
      console.error("Erreur lors du refreshUserData:", e);
    }
  }

  /**
   * Using for edit the account of a user in keycloak
   */
  async function openAccountPage(): Promise<void> {
    const keycloakAccountUrl: string =
      `${process.env.EXPO_PUBLIC_KEYCLOAK_BASE}/account/`;

    try {
      // Ouvre le navigateur et ATTEND que l'utilisateur le ferme
      const result = await WebBrowser.openBrowserAsync(keycloakAccountUrl);

      // L'utilisateur est revenu dans l'application
      if (result.type === "dismiss" || result.type === "cancel") {
        console.log("Retour du navigateur, rafraîchissement du profil...");
        // C'est ici que la magie opère :
        await refreshUserData();
      }
    } catch (error) {
      console.error("Erreur lors de l'ouverture de la page de profil:", error);
    }
  }

  /**
   * Logout with keycloak
   * show the default page of keycloak logout in the browser
   * @returns Promise<void>
   */
  async function logout(): Promise<void> {
    setAccessToken(null);

    await AuthStorage.clearTokens();

    if (discovery?.endSessionEndpoint) {
      try {
        const logoutUrl = `${discovery.endSessionEndpoint}` +
          `?client_id=${authRequestConfig.clientId}`;
        await WebBrowser.openBrowserAsync(logoutUrl);
      } catch (error) {
        console.error("Erreur lors de la déconnexion Keycloak:", error);
      }
    }
  }

  /**
   * Helpers to simplify code
   */
  function decodeAndSetRoles(token: string | null) {
    if (!token) {
      console.error("pas de token");
      setUserRoles([]);
      return;
    }
    try {
      console.log(token);
      const decodedToken = jwtDecode<KeycloakTokenPayload>(token);
      // 📌 Récupération de l'id utilisateur
      const keycloakUserId = decodedToken.sub;
      console.log("User ID Keycloak:", keycloakUserId);
      setUser((prev) => ({ ...prev, id: keycloakUserId }));
      const realmRoles = decodedToken.realm_access?.roles || [];
      setUserRoles(realmRoles);
    } catch (e) {
      console.error("Erreur de décodage du token:", e);
      setUserRoles([]);
    }
  }

  const contextValue = useMemo(
    () => ({
      accessToken,
      isAuthenticated: !!accessToken,
      user,
      login,
      logout,
      isLoading,
      openAccountPage,
      isWoofer,
      isBackpacker,
    }),
    [
      accessToken,
      isLoading,
      user,
      isWoofer,
      isBackpacker,
      login,
      logout,
      openAccountPage,
    ],
  );

  return contextValue;
}
