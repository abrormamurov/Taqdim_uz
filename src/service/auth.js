import api from "./api";
import { saveAccessToken, saveRefreshToken, clearTokens } from "./tokenService";

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
export const refreshToken = async (refreshToken) => {
  try {
    const response = await api.post("/token/refresh/", {
      refresh: refreshToken,
    });
    const { access } = response.data;
    localStorage.setItem("access_token", access);
    return response.data;
  } catch (error) {
    throw error.response || new Error("Unknown error");
  }
};

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
