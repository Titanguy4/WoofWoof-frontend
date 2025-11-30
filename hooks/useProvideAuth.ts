import { authRequestConfig, redirectUri } from "@/utils/auth/auth.constants";
import * as AuthStorage from "@/utils/auth/auth.storage";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  exp: number;
  realm_access?: { roles: string[] };
  resource_access?: { [clientName: string]: { roles: string[] } };
}

export function useProvideAuth(): IAuthContext {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [discovery, setDiscovery] =
    useState<AuthSession.DiscoveryDocument | null>(null);
  const [user, setUser] = useState<Record<string, any>>({ name: "Username " });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const isWoofer: boolean = userRoles.includes("Woofer");
  const isBackpacker: boolean = userRoles.includes("Backpacker");
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRefreshingRef = useRef<boolean>(false);

  const refreshTokenRef = useRef<string | null>(null);
  const discoveryRef = useRef<AuthSession.DiscoveryDocument | null>(null);

  useEffect(() => {
    refreshTokenRef.current = refreshToken;
  }, [refreshToken]);

  useEffect(() => {
    discoveryRef.current = discovery;
  }, [discovery]);

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
      const decodedToken = jwtDecode<KeycloakTokenPayload>(token);
      const keycloakUserId = decodedToken.sub;
      setUser((prev) => ({ ...prev, id: keycloakUserId, sub: keycloakUserId }));
      const realmRoles = decodedToken.realm_access?.roles || [];
      setUserRoles(realmRoles);
    } catch (e) {
      console.error("Erreur de décodage du token:", e);
      setUserRoles([]);
    }
  }

  /**
   * Rafraîchit l'access token en utilisant le refresh token
   */
  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    const currentRefreshToken = refreshTokenRef.current;
    const currentDiscovery = discoveryRef.current;

    if (!currentRefreshToken || !currentDiscovery) {
      console.error(
        "Impossible de rafraîchir : refresh token ou discovery manquant",
        {
          hasRefreshToken: !!currentRefreshToken,
          hasDiscovery: !!currentDiscovery,
        },
      );
      return false;
    }

    try {
      const config: AuthSession.RefreshTokenRequestConfig = {
        clientId: authRequestConfig.clientId,
        refreshToken: currentRefreshToken,
      };

      const tokenResult: AuthSession.TokenResponse =
        await AuthSession.refreshAsync(config, currentDiscovery);

      setAccessToken(tokenResult.accessToken);
      const newRefreshToken = tokenResult.refreshToken ?? currentRefreshToken;
      setRefreshToken(newRefreshToken);
      decodeAndSetRoles(tokenResult.accessToken);

      await AuthStorage.saveTokens(tokenResult.accessToken, newRefreshToken);

      scheduleTokenRefresh(tokenResult.accessToken);

      return true;
    } catch (error) {
      console.error("Erreur lors du refresh du token:", error);
      setAccessToken(null);
      setRefreshToken(null);
      await AuthStorage.clearTokens();
      return false;
    }
  }, []);

  /**
   * Planifie le rafraîchissement automatique du token avant son expiration
   */
  const scheduleTokenRefresh = useCallback(
    (token: string) => {
      try {
        const decoded = jwtDecode<KeycloakTokenPayload>(token);
        const expiresAt = decoded.exp * 1000;
        const now = Date.now();
        const timeUntilExpiry = expiresAt - now;

        const refreshIn = Math.max(timeUntilExpiry - 120000, 0);

        if (refreshTimerRef.current) {
          clearTimeout(refreshTimerRef.current);
        }

        refreshTimerRef.current = setTimeout(async () => {
          isRefreshingRef.current = true;
          await refreshAccessToken();
          isRefreshingRef.current = false;
        }, refreshIn);
      } catch (error) {
        console.error("Erreur lors de la planification du refresh:", error);
      }
    },
    [refreshAccessToken],
  );

  /**
   * Initialisation de Keycloak et chargement token existant
   */
  useEffect(() => {
    async function initAuth() {
      try {
        const discoveryUrl: string = `${process.env.EXPO_PUBLIC_KEYCLOAK_BASE}`;
        const result: AuthSession.DiscoveryDocument =
          await AuthSession.fetchDiscoveryAsync(discoveryUrl);
        setDiscovery(result);

        const { accessToken, refreshToken } = await AuthStorage.loadTokens();
        if (accessToken && refreshToken) {
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          decodeAndSetRoles(accessToken);
          scheduleTokenRefresh(accessToken);
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

    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [scheduleTokenRefresh]);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    authRequestConfig,
    discovery,
  );

  /**
   * Exchange code -> token après login
   */
  useEffect(() => {
    // Ne pas exécuter si on est en train de rafraîchir le token
    if (isRefreshingRef.current) {
      return;
    }

    async function exchangeCode() {
      try {
        if (response?.type === "success" && discovery && request) {
          const config: AuthSession.AccessTokenRequestConfig = {
            code: response.params.code,
            clientId: authRequestConfig.clientId,
            redirectUri,
            extraParams: {
              code_verifier: request.codeVerifier ?? "",
            },
          };

          const tokenResult: AuthSession.TokenResponse =
            await AuthSession.exchangeCodeAsync(config, discovery);

          setAccessToken(tokenResult.accessToken);
          setRefreshToken(tokenResult.refreshToken ?? null);
          decodeAndSetRoles(tokenResult.accessToken);

          await AuthStorage.saveTokens(
            tokenResult.accessToken,
            tokenResult.refreshToken,
          );

          scheduleTokenRefresh(tokenResult.accessToken);

          const userInfo: Record<string, any> =
            await AuthSession.fetchUserInfoAsync(tokenResult, discovery);
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
  }, [response, discovery, request, scheduleTokenRefresh]);

  /**
   * Login with keycloak
   */
  const login = useCallback(async (): Promise<void> => {
    if (!discovery || !request) {
      console.warn("Configuration Keycloak non chargée. Réessayez.");
      return;
    }
    await promptAsync();
  }, [discovery, request, promptAsync]);

  /**
   * Refresh user data
   */
  const refreshUserData = useCallback(async (): Promise<void> => {
    if (!accessToken || !discovery) {
      console.error("Impossible de rafraîchir : token ou discovery manquant.");
      return;
    }

    try {
      const tokenResponse = new AuthSession.TokenResponse({ accessToken });

      const userInfo: Record<string, any> =
        await AuthSession.fetchUserInfoAsync(tokenResponse, discovery);

      if (userInfo) {
        setUser(userInfo);
      }
    } catch (e) {
      console.error("Erreur lors du refreshUserData:", e);
    }
  }, [accessToken, discovery]);

  /**
   * Open Keycloak account page
   */
  const openAccountPage = useCallback(async (): Promise<void> => {
    const keycloakAccountUrl: string = `${process.env.EXPO_PUBLIC_KEYCLOAK_BASE}/account/`;

    try {
      const result = await WebBrowser.openBrowserAsync(keycloakAccountUrl);

      if (result.type === "dismiss" || result.type === "cancel") {
        console.log("Retour du navigateur, rafraîchissement du profil...");
        await refreshUserData();
      }
    } catch (e) {
      console.error("Erreur lors de l'ouverture de la page de profil:", e);
    }
  }, [refreshUserData]);

  /**
   * Logout with keycloak
   */
  const logout = useCallback(async (): Promise<void> => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }

    setAccessToken(null);
    setRefreshToken(null);
    setUserRoles([]);

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
  }, [discovery]);

  return useMemo<IAuthContext>(
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
    [accessToken, isLoading, user, isWoofer, isBackpacker],
  );
}
