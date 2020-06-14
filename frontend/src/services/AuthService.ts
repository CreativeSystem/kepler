import { AxiosError } from "axios";

import { makeApi } from "@services/api";
import ApiService from "@services/ApiService";

export interface AuthService {
  login(email:string, password:string):Promise<any>
  verifyEmail(email:string) : Promise<boolean>
}

class AuthServiceImpl extends ApiService implements AuthService {
  async login(email: string, password: string): Promise<any> {
    const response = await this.api.post("", { email, password });
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
