import { httpClient } from "@shared/api/httpClient";

export type UserProfile = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country?: string;
  city?: string;
  modifiedAt?: string;
};

export async function getProfile() {
  const res = await httpClient.get<UserProfile>("/profile");
  return res.data;
}

export async function updateProfile(payload: Partial<UserProfile>) {
  const res = await httpClient.put<UserProfile>("/profile", payload);
  return res.data;
}
