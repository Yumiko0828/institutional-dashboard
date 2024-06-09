export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessExp: number;
  refreshExp: number;
}

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  permissionsLevel: number;
}
