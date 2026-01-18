import api from "@/lib/api";
import {
  LoginRequest,
  LoginResponse,
  AdminLoginRequest,
  AdminLoginResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  RefreshTokenResponse,
  LogoutResponse,
  SetLoginPinRequest,
  PinLoginRequest,
  VerifyLoginEmailRequest,
  VerifyLoginEmailResponse,
} from "@/models/auth";

class AuthService {
  private readonly basePath = "/v1/auth";

  // User login
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
      `${this.basePath}/login`,
      data
    );
    return response.data;
  }

  // Admin login
  async adminLogin(data: AdminLoginRequest): Promise<AdminLoginResponse> {
    const response = await api.post<AdminLoginResponse>(
      `${this.basePath}/admin/login`,
      data
    );
    return response.data;
  }

  // Register
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>(
      `${this.basePath}/register`,
      data
    );
    return response.data;
  }

  // Forgot password
  async forgotPassword(
    data: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> {
    const response = await api.post<ForgotPasswordResponse>(
      `${this.basePath}/forgot/password`,
      data
    );
    return response.data;
  }

  // Reset password
  async resetPassword(
    data: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> {
    const response = await api.post<ResetPasswordResponse>(
      `${this.basePath}/reset/password`,
      data
    );
    return response.data;
  }

  // Refresh token
  async refreshToken(): Promise<RefreshTokenResponse> {
    const response = await api.post<RefreshTokenResponse>(
      `${this.basePath}/refresh`
    );
    return response.data;
  }

  // Logout
  async logout(): Promise<LogoutResponse> {
    const response = await api.post<LogoutResponse>(`${this.basePath}/logout`);
    return response.data;
  }

  // Set login pin
  async setLoginPin(
    data: SetLoginPinRequest
  ): Promise<{ success: boolean; message: string }> {
    const response = await api.post(`${this.basePath}/set/login/pin`, data);
    return response.data;
  }

  // Login with pin
  async pinLogin(data: PinLoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
      `${this.basePath}/pin/login`,
      data
    );
    return response.data;
  }

  // Verify login email
  async verifyLoginEmail(
    data: VerifyLoginEmailRequest
  ): Promise<VerifyLoginEmailResponse> {
    const response = await api.post<VerifyLoginEmailResponse>(
      `${this.basePath}/verify/login/email`,
      data
    );
    return response.data;
  }

  // Forgot login pin
  async forgotLoginPin(
    data: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> {
    const response = await api.post<ForgotPasswordResponse>(
      `${this.basePath}/forgot/login/pin`,
      data
    );
    return response.data;
  }

  // Reset login pin
  async resetLoginPin(data: {
    email: string;
    token: string;
    pin: string;
  }): Promise<{ success: boolean; message: string }> {
    const response = await api.post(`${this.basePath}/reset/login/pin`, data);
    return response.data;
  }

  // Store auth data in localStorage and cookies
  storeAuthData(token: string, authToken?: string, user?: object) {
    if (globalThis.window !== undefined) {
      localStorage.setItem("token", token);
      // Set token as cookie for middleware access
      document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
      if (authToken) {
        localStorage.setItem("authToken", authToken);
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    }
  }

  // Clear auth data from localStorage and cookies
  clearAuthData() {
    if (globalThis.window !== undefined) {
      localStorage.removeItem("token");
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      // Clear the cookie
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  // Get stored user
  getStoredUser() {
    if (globalThis.window !== undefined) {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  // Check if authenticated
  isAuthenticated(): boolean {
    if (globalThis.window !== undefined) {
      return !!localStorage.getItem("token");
    }
    return false;
  }
}

export const authService = new AuthService();
export default authService;
