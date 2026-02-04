export type UserType = "User" | "Admin";

export interface AuthenticateRequest {
  userName: string;
  password: string;
}

export interface AuthenticateResponse {
  authentication: string;
  userType: UserType;
}
