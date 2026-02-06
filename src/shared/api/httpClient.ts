import axios from "axios";
import { API_URL } from "./config";
import { getItem } from "@shared/utils/storage";
export const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
httpClient.interceptors.request.use(
  (config) => {
    const token = getItem("auth_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
