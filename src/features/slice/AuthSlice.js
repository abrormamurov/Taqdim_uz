import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signup, login, logout, refreshToken } from "../../service/auth";
import {
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
  clearTokens,
} from "../../service/tokenService";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userDetails, thunkAPI) => {
    try {
      const response = await signup(userDetails.username, userDetails.password);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await login(credentials.username, credentials.password);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await logout();
});

export const refreshTokenThunk = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    const refreshTokenValue = getRefreshToken();
    if (!refreshTokenValue) {
      return thunkAPI.rejectWithValue("No refresh token found");
    }

    try {
      const response = await refreshToken(refreshTokenValue);
      saveAccessToken(response.data.access);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    user: null,
    accessToken: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
        saveAccessToken(action.payload.access);
        saveRefreshToken(action.payload.refresh);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
        saveAccessToken(action.payload.access);
        saveRefreshToken(action.payload.refresh);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
      })
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.access;
        saveAccessToken(action.payload.access);
      })
      .addCase(refreshTokenThunk.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.error = action.payload;
        clearTokens();
      });
  },
});

export default authSlice.reducer;
