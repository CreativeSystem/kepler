import { store } from "@store/index";
import env from "~/utils/env";
import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: env("BACKEND_HOST"),
  withCredentials: true
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { token } = store.getState().session;
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => Promise.reject(err)
);

export interface PaginationResponse<T> {
  total: number;
  page: number;
  page_size: number;
  data: [T];
}

export default api;
