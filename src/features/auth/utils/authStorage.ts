import type { UserType } from "../types/auth.types";
import { getItem, removeItem, setItem } from "@shared/utils/storage";

const TOKEN_KEY = "auth_token";
const USER_TYPE_KEY = "user_type";

export function setAuthSession(token: string, userType: UserType) {
  setItem(TOKEN_KEY, token);
  setItem(USER_TYPE_KEY, userType);
}

export function clearAuthSession() {
  removeItem(TOKEN_KEY);
  removeItem(USER_TYPE_KEY);
}

export function getAuthToken(): string | null {
  return getItem(TOKEN_KEY);
}

export function getUserType(): UserType | null {
  const user = getItem(USER_TYPE_KEY);
  if (user === "Admin" || user === "User") return user;
  return null;
}
