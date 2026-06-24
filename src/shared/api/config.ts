const rawApiUrl = (import.meta.env.VITE_API_URL as string | undefined) ?? "";
const normalizedApiUrl = rawApiUrl.replace(/\/$/, "");

export const API_URL = normalizedApiUrl.endsWith("/api")
  ? normalizedApiUrl
  : `${normalizedApiUrl}/api`;
