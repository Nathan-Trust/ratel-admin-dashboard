import api from "@/lib/api";
import {
  UsersResponse,
  UserResponse,
  BanUserResponse,
  UserBanksResponse,
  UserWalletsResponse,
  UsersParams,
} from "@/models/admin";

class UserService {
  private readonly basePath = "/v1/admin/user";

  // List all users
  async getUsers(params?: UsersParams): Promise<UsersResponse> {
    const response = await api.get<UsersResponse>(this.basePath, { params });
    return response.data;
  }

  // Get single user
  async getUser(userId: string): Promise<UserResponse> {
    const response = await api.get<UserResponse>(`${this.basePath}/${userId}`);
    return response.data;
  }

  // Toggle ban user
  async toggleBanUser(userId: string): Promise<BanUserResponse> {
    const response = await api.post<BanUserResponse>(
      `${this.basePath}/${userId}/ban`
    );
    return response.data;
  }

  // Get user banks
  async getUserBanks(userId: string): Promise<UserBanksResponse> {
    const response = await api.get<UserBanksResponse>(
      `${this.basePath}/${userId}/banks`
    );
    return response.data;
  }

  // Get user wallets
  async getUserWallets(userId: string): Promise<UserWalletsResponse> {
    const response = await api.get<UserWalletsResponse>(
      `${this.basePath}/${userId}/wallets`
    );
    return response.data;
  }
}

export const userService = new UserService();
export default userService;
