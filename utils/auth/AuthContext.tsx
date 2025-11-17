import { IAuthContext, useProvideAuth } from "@/hooks/useProvideAuth";
import { createContext, ReactNode, useContext } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  accessToken: null,
  isAuthenticated: false,
  user: { "": "" },
  login: async () => {},
  logout: async () => {},
  isLoading: true,
  openAccountPage: async () => {},
  isWoofer: false,
  isBackpacker: false,
});

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
