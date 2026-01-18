// Auth Request Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  password: string;
}

export interface SetLoginPinRequest {
  login_pin: string;
  email: string;
}

export interface PinLoginRequest {
  email: string;
  pin: string;
}

export interface VerifyLoginEmailRequest {
  email: string;
  token: string;
}

// Auth Response Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: number;
  balance: string;
  commission: string;
  reference: string;
  fcmToken: string | null;
  created_at: string;
  updated_at: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: "admin";
  status: number;
  balance: string;
  commission: string;
  reference: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    authToken: string;
    expires_in: number;
  };
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  data: {
    admin: Admin;
    token: string;
    expires_in: number;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    code: number;
  };
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  data: null;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    expires_in: number;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
  data: null;
}

export interface VerifyLoginEmailResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    authToken: string;
    expires_in: number;
  };
}
