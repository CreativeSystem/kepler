import { AxiosError } from "axios";

import { makeApi } from "@services/api";
import ApiService from "@services/ApiService";

import { AuthService, LoginResponse } from "./types";

class AuthServiceImpl extends ApiService implements AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.api.post<LoginResponse>("", { email, password });
    return response.data;
  }

  async verifyEmail(email: string): Promise<boolean> {
    try {
      await this.api.get(`verify-email/?email=${email}`);
      return true;
    } catch (error) {
      const { response } = error as AxiosError;
      if (response?.status === 417) {
        return false;
      }
      throw new Error(response?.data);
    }
  }
}

export default new AuthServiceImpl(makeApi("auth/"));
