
import env from "~/utils/env";
import axios, { AxiosRequestConfig } from "axios";

import { store } from "@store/index";

export function makeApi(basePath?:string) {
  const backendHost = env("BACKEND_HOST");

  const api = axios.create({
    baseURL: basePath ? `${backendHost}/${basePath}` : backendHost,
    withCredentials: true,
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
    err => Promise.reject(err),
  );
  return api;
}

export interface PaginationResponse<T> {
    total: number;
    page: number;
    page_size: number;
    data: [T];
}

export default makeApi();
