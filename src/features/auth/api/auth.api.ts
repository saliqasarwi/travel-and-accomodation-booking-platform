import { httpClient } from "@shared/api";
import type { LoginRequest, LoginResponse } from "../types/auth.types";

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const res = await httpClient.post<LoginResponse>(
    "/auth/authenticate",
    payload
  );
  return res.data;
}
