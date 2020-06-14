import { AxiosInstance } from "axios";

export default class ApiService {
  protected api:AxiosInstance;

  constructor(api:AxiosInstance) {
    this.api = api;
  }
}
