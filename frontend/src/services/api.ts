import { store } from "@store/index";
import env from "~/util/env";
import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: env("BACKEND_HOST"),
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

export default api;
