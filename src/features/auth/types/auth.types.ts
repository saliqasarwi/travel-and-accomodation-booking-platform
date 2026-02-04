export type UserType = "User" | "Admin";

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  authentication: string;
  userType: UserType;
}
