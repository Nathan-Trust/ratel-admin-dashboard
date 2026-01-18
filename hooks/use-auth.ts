import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import {
  LoginRequest,
  AdminLoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  SetLoginPinRequest,
  PinLoginRequest,
  VerifyLoginEmailRequest,
} from "@/models/auth";
import { successToast, errorToast } from "@/util/toast";
import { AdminRoutes } from "@/routes";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      const { token, authToken, user } = response.data;
      authService.storeAuthData(token, authToken, user);
      successToast({ message: response.message });
      queryClient.invalidateQueries();
      router.push(AdminRoutes.DASHBOARD);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";
      errorToast({ message });
    },
  });
};

export const useAdminLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AdminLoginRequest) => authService.adminLogin(data),
    onSuccess: (response) => {
      const { token, admin } = response.data;
      authService.storeAuthData(token, undefined, admin);
      successToast({ message: response.message });
      queryClient.invalidateQueries();
      router.push(AdminRoutes.DASHBOARD);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Admin login failed. Please try again.";
      errorToast({ message });
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (response) => {
      const { token, user } = response.data;
      authService.storeAuthData(token, undefined, user);
      successToast({ message: response.message });
      router.push(AdminRoutes.DASHBOARD);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      errorToast({ message });
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      authService.forgotPassword(data),
    onSuccess: (response) => {
      successToast({ message: response.message });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Failed to send reset token. Please try again.";
      errorToast({ message });
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
    onSuccess: (response) => {
      successToast({ message: response.message });
      router.push("/login");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Password reset failed. Please try again.";
      errorToast({ message });
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: () => authService.refreshToken(),
    onSuccess: (response) => {
      const { token } = response.data;
      authService.storeAuthData(token);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Session expired. Please login again.";
      errorToast({ message });
      authService.clearAuthData();
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: (response) => {
      authService.clearAuthData();
      queryClient.clear();
      successToast({ message: response.message });
      router.push("/login");
    },
    onError: () => {
      // Even if logout fails on server, clear local data
      authService.clearAuthData();
      queryClient.clear();
      router.push("/login");
    },
  });
};

export const useSetLoginPin = () => {
  return useMutation({
    mutationFn: (data: SetLoginPinRequest) => authService.setLoginPin(data),
    onSuccess: (response) => {
      successToast({ message: response.message });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Failed to set login PIN. Please try again.";
      errorToast({ message });
    },
  });
};

export const usePinLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PinLoginRequest) => authService.pinLogin(data),
    onSuccess: (response) => {
      const { token, authToken, user } = response.data;
      authService.storeAuthData(token, authToken, user);
      successToast({ message: response.message });
      queryClient.invalidateQueries();
      router.push(AdminRoutes.DASHBOARD);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "PIN login failed. Please try again.";
      errorToast({ message });
    },
  });
};

export const useVerifyLoginEmail = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VerifyLoginEmailRequest) =>
      authService.verifyLoginEmail(data),
    onSuccess: (response) => {
      const { token, authToken, user } = response.data;
      authService.storeAuthData(token, authToken, user);
      successToast({ message: response.message });
      queryClient.invalidateQueries();
      router.push(AdminRoutes.DASHBOARD);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Email verification failed. Please try again.";
      errorToast({ message });
    },
  });
};

export const useForgotLoginPin = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      authService.forgotLoginPin(data),
    onSuccess: (response) => {
      successToast({ message: response.message });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Failed to send reset token. Please try again.";
      errorToast({ message });
    },
  });
};

export const useResetLoginPin = () => {
  return useMutation({
    mutationFn: (data: { email: string; token: string; pin: string }) =>
      authService.resetLoginPin(data),
    onSuccess: (response) => {
      successToast({ message: response.message });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "PIN reset failed. Please try again.";
      errorToast({ message });
    },
  });
};
