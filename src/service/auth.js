import api from "./api";
import {
  saveAccessToken,
  getRefreshToken,
  saveRefreshToken,
  clearTokens,
} from "./tokenService";

// api.js
export const signup = async (username, password) => {
  try {
    const response = await api.post("/register/", {
      username,
      password,
    });
    const { access, refresh } = response.data;
    saveAccessToken(access);
    saveRefreshToken(refresh);
    return response.data;
  } catch (error) {
    console.error(
      "Signup error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await api.post("/login/", { username, password });
    const { access, refresh } = response.data;
    saveAccessToken(access);
    saveRefreshToken(refresh);
    return response.data;
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// auth.js
// Token yangilash
export const refreshToken = async (refreshToken) => {
  try {
    const response = await api.post("/token/refresh/", {
      refresh: refreshToken,
    });
    const { access } = response.data;
    saveAccessToken(access);
    return response.data;
  } catch (error) {
    console.error(
      "Token yangilashda xatolik:",
      error.response ? error.response.data : error.message
    );
    clearTokens();
    throw error;
  }
};

api.interceptors.response.use(
  // 'pi' o'rniga 'api' ishlatish
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newTokens = await refreshToken(getRefreshToken());
        saveAccessToken(newTokens.access);
        originalRequest.headers["Authorization"] = `Bearer ${newTokens.access}`;
        return api(originalRequest); // Asl so'rovni qayta yuborish
      } catch (refreshError) {
        clearTokens(); // Tokenlarni tozalash va foydalanuvchini tizimdan chiqarish
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const logout = async () => {
  try {
    await api.post("/logout"); // Ensure this endpoint is available
  } catch (error) {
    console.error(
      "Logout error:",
      error.response ? error.response.data : error.message
    );
  }
  clearTokens();
};
