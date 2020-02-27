import axios, { AxiosRequestConfig } from "axios";
import { store } from "@store/index";
import env from "~/util/env";

const api = axios.create({
  baseURL: env("BACKEND_HOST"),
  withCredentials: true
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = store.getState().session.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default api;
