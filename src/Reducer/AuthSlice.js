import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";

export const login = createAsyncThunk(
  "login",
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post("/logins/create-login", userInput);
      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response?.data || "Login failed");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || "Something went wrong");
    }
  }
);

export const registerUser = createAsyncThunk(
  "register",
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/register", userInput);
      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response?.data || "Registration failed");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || "Something went wrong");
    }
  }
);

const initialState = {
  loading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        sessionStorage.setItem("energy_token", JSON.stringify({ token: payload?.token }));
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(registerUser.pending, (state) => { state.loading = true; })
      .addCase(registerUser.fulfilled, (state) => { state.loading = false; })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default AuthSlice.reducer;