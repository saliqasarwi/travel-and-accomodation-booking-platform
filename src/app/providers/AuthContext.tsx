import React from "react";
import type { UserType } from "@features/auth/types/auth.types";

type AuthState = {
  token: string | null;
  userType: UserType | null;
  isAuthenticated: boolean;
};

export type AuthContextValue = AuthState & {
  setSession: (token: string, userType: UserType) => void; //login
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
