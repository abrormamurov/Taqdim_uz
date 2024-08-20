// api.js
import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  clearTokens,
} from "./tokenService";
import { refreshToken } from "./auth";

const api = axios.create({
  baseURL: "https://api.taqdim.uz/",
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newTokens = await refreshToken(getRefreshToken());
        saveAccessToken(newTokens.access);
        originalRequest.headers["Authorization"] = `Bearer ${newTokens.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearTokens();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newTokens = await refreshToken(getRefreshToken());
        saveAccessToken(newTokens.access);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newTokens.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearTokens();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
