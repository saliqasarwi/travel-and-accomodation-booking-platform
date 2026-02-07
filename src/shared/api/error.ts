import { AxiosError } from "axios";

export interface ApiError {
  message: string;
  status?: number;
}

interface ApiErrorResponse {
  message?: string;
  error?: string;
}

export function parseApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data as ApiErrorResponse | undefined;
    const backendMessage = data?.message ?? data?.error;

    if (status === 401) {
      return {
        status,
        message: backendMessage || "Invalid username or password",
      };
    }

    return {
      message:
        data?.message ?? data?.error ?? error.message ?? "Unexpected API error",
      status,
    };
  }

  return {
    message: "Unknown error occurred",
  };
}
