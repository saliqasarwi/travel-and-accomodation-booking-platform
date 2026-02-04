import { httpClient } from "@shared/api";
import type {
  AuthenticateRequest,
  AuthenticateResponse,
} from "../types/auth.types";

export async function authenticate(
  payload: AuthenticateRequest
): Promise<AuthenticateResponse> {
  const res = await httpClient.post<AuthenticateResponse>(
    "/auth/authenticate",
    payload
  );
  return res.data;
}
