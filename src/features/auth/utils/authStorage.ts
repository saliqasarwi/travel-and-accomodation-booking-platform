import type { UserType } from "../types/auth.types";

const TOKEN_KEY = "auth_token";
const USER_TYPE_KEY = "user_type";

export function setAuthSession(token: string, userType: UserType) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_TYPE_KEY, userType);
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_TYPE_KEY);
}

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUserType(): UserType | null {
  const user = localStorage.getItem(USER_TYPE_KEY);
  if (user === "Admin" || user === "User") return user;
  return null;
}
