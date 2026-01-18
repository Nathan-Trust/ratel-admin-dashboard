import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/users";
import { UsersParams } from "@/models/admin";
import { successToast, errorToast } from "@/util/toast";

const QUERY_KEYS = {
  USERS: "admin-users",
  USER: "admin-user",
  USER_BANKS: "admin-user-banks",
  USER_WALLETS: "admin-user-wallets",
};

export const useUsers = (params?: UsersParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS, params],
    queryFn: () => userService.getUsers(params),
  });
};

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER, userId],
    queryFn: () => userService.getUser(userId),
    enabled: !!userId,
  });
};

export const useToggleBanUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => userService.toggleBanUser(userId),
    onSuccess: (response) => {
      successToast({ message: response.message });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to update user status.";
      errorToast({ message });
    },
  });
};

export const useUserBanks = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_BANKS, userId],
    queryFn: () => userService.getUserBanks(userId),
    enabled: !!userId,
  });
};

export const useUserWallets = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_WALLETS, userId],
    queryFn: () => userService.getUserWallets(userId),
    enabled: !!userId,
  });
};
