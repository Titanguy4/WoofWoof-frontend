import * as AuthSession from "expo-auth-session";

export const ACCESS_TOKEN_KEY = "keycloak_access_token";
export const REFRESH_TOKEN_KEY = "keycloak_refresh_token";

export const redirectUri = AuthSession.makeRedirectUri({
  scheme: "woofwoof",
  path: "redirect",
});

export const authRequestConfig: AuthSession.AuthRequestConfig = {
  clientId: process.env.EXPO_PUBLIC_CLIENT_ID || "",
  redirectUri: redirectUri,
  scopes: ["openid", "profile", "email", "offline_access"],
  usePKCE: true,
  responseType: AuthSession.ResponseType.Code,
  extraParams: {
    prompt: "login",
  },
};
