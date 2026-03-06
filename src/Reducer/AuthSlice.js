import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";

// ✅ LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post("/logins/create-login", userInput); // ✅ fixed

      if (response?.data?.token) {
        return response.data;
      }

      return rejectWithValue(
        response?.data?.message || "Login failed - no token received"
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Something went wrong. Please try again."
      );
    }
  }
);

// ✅ REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post("/registers/create-register", userInput); // ✅ fixed

      if (response?.data) {
        return response.data;
      }

      return rejectWithValue(
        response?.data?.message || "Registration failed"
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Something went wrong. Please try again."
      );
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  user: null,
  token: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.token = null;
      sessionStorage.removeItem("energy_token");
    },
  },
  extraReducers: (builder) => {
    builder
      // ── LOGIN ──
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.token = payload.token;
        state.user = payload.user;
       sessionStorage.setItem("energy_token", JSON.stringify(payload));
        console.log("Login successful - token stored");
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // ── REGISTER ──
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;