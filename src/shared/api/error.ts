import { AxiosError } from "axios";

export interface ApiError {
  message: string;
  status?: number;
}

export function parseApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    return {
      message:
        error.response?.data?.message ||
        error.message ||
        "Unexpected API error",
      status: error.response?.status,
    };
  }

  return {
    message: "Unknown error occurred",
  };
}
