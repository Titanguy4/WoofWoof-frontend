import { authRequestConfig, redirectUri } from "@/utils/auth/auth.constants";
import * as AuthStorage from "@/utils/auth/auth.storage";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { jwtDecode } from "jwt-decode";
import { useEffect, useMemo, useState } from "react";

export interface IAuthContext {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: Record<string, any> | null;
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
  const [discovery, setDiscovery] = useState<AuthSession.DiscoveryDocument | null>(null);
  const [user, setUser] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [isWoofer, setIsWoofer] = useState(false);
  const [isBackpacker, setIsBackpacker] = useState(false);

  /**
   * Réinitialisation des states quand on logout ou pas de token
   */
  function resetAuth() {
    setAccessToken(null);
    setUser(null);
    setUserRoles([]);
    setIsWoofer(false);
    setIsBackpacker(false);
  }

  /**
   * Initialisation de Keycloak et chargement token existant
   */
  useEffect(() => {
    async function initAuth() {
      try {
        const discoveryUrl = `${process.env.EXPO_PUBLIC_KEYCLOAK_BASE}`;
        const discoveryDoc = await AuthSession.fetchDiscoveryAsync(discoveryUrl);
        setDiscovery(discoveryDoc);

        const { accessToken: storedToken } = await AuthStorage.loadTokens();
        if (storedToken) {
          setAccessToken(storedToken);
          decodeAndSetRoles(storedToken);
        } else {
          resetAuth();
        }
      } catch (e) {
        console.error("Erreur d'initialisation de l'Auth:", e);
        resetAuth();
      } finally {
        setIsLoading(false);
      }
    }
    initAuth();
  }, []);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(authRequestConfig, discovery);

  /**
   * Exchange code -> token après login
   */
  useEffect(() => {
    async function exchangeCode() {
      if (response?.type === "success" && discovery) {
        try {
          const config: AuthSession.AccessTokenRequestConfig = {
            code: response.params.code,
            clientId: authRequestConfig.clientId,
            redirectUri,
            extraParams: { code_verifier: request?.codeVerifier ?? "" },
          };

          const tokenResult = await AuthSession.exchangeCodeAsync(config, discovery);

          setAccessToken(tokenResult.accessToken);
          decodeAndSetRoles(tokenResult.accessToken);
          await AuthStorage.saveTokens(tokenResult.accessToken);

          const userInfo = await AuthSession.fetchUserInfoAsync(tokenResult, discovery);
          if (userInfo) setUser(userInfo);
        } catch (e) {
          console.error("Erreur d'échange de code :", e);
          resetAuth();
        }
      }
    }
    exchangeCode();
  }, [response, discovery, request]);

  /**
   * Login
   */
  async function login(): Promise<void> {
    if (!discovery || !request) {
      console.warn("Configuration Keycloak non chargée. Réessayez.");
      return;
    }
    await promptAsync();
  }

  /**
   * Refresh user info
   */
  async function refreshUserData(): Promise<void> {
    if (!accessToken || !discovery) return;
    try {
      const tokenResponse = new AuthSession.TokenResponse({ accessToken });
      const userInfo = await AuthSession.fetchUserInfoAsync(tokenResponse, discovery);
      if (userInfo) setUser(userInfo);
    } catch (e) {
      console.error("Erreur lors du refreshUserData:", e);
    }
  }

  /**
   * Open Keycloak account page
   */
  async function openAccountPage(): Promise<void> {
    const keycloakAccountUrl = `${process.env.EXPO_PUBLIC_KEYCLOAK_BASE}/account/`;
    try {
      const result = await WebBrowser.openBrowserAsync(keycloakAccountUrl);
      if (result.type === "dismiss" || result.type === "cancel") {
        await refreshUserData();
      }
    } catch (e) {
      console.error("Erreur lors de l'ouverture de la page de profil:", e);
    }
  }

  /**
   * Logout
   */
  async function logout(): Promise<void> {
    resetAuth();
    await AuthStorage.clearTokens();
    if (discovery?.endSessionEndpoint) {
      try {
        await WebBrowser.openBrowserAsync(
          `${discovery.endSessionEndpoint}?client_id=${authRequestConfig.clientId}`
        );
      } catch (e) {
        console.error("Erreur lors de la déconnexion Keycloak:", e);
      }
    }
  }

  /**
   * Decode token et met à jour rôles
   */
  function decodeAndSetRoles(token: string | null) {
    if (!token) {
      resetAuth();
      return;
    }
    try {
      const decodedToken = jwtDecode<KeycloakTokenPayload>(token);
      setUser({ id: decodedToken.sub, ...decodedToken });

      const roles = decodedToken.realm_access?.roles || [];
      setUserRoles(roles);
      setIsWoofer(roles.includes("Woofer"));
      setIsBackpacker(roles.includes("Backpacker"));
    } catch (e) {
      console.error("Erreur de décodage du token:", e);
      resetAuth();
    }
  }

  /**
   * Log roles pour debug
   */
  useEffect(() => {
    console.log("userRoles updated:", userRoles);
    console.log("isWoofer =", isWoofer, "isBackpacker =", isBackpacker);
  }, [userRoles, isWoofer, isBackpacker]);

  return useMemo<IAuthContext>(() => ({
    accessToken,
    isAuthenticated: !!accessToken,
    user,
    login,
    logout,
    isLoading,
    openAccountPage,
    isWoofer,
    isBackpacker,
  }), [accessToken, isLoading, user, isWoofer, isBackpacker]);
}
