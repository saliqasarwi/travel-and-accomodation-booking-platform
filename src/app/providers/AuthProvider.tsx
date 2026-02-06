import React from "react";
import type { UserType } from "@features/auth/types/auth.types";
import {
  clearAuthSession,
  getAuthToken,
  getUserType,
  setAuthSession,
} from "@features/auth/utils/authStorage";
import { AuthContext, type AuthContextValue } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | null>(() => getAuthToken());
  const [userType, setUserType] = React.useState<UserType | null>(() =>
    getUserType()
  );

  const setSession = React.useCallback(
    (newToken: string, newUserType: UserType) => {
      setAuthSession(newToken, newUserType);
      setToken(newToken);
      setUserType(newUserType);
    },
    []
  );

  const logout = React.useCallback(() => {
    clearAuthSession();
    setToken(null);
    setUserType(null);
  }, []);

  const value: AuthContextValue = {
    token,
    userType,
    isAuthenticated: Boolean(token),
    setSession,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
