import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const uploadBill = createAsyncThunk(
  "bill/upload",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      // const res = await API.post("/bill/upload", formData);
      // return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const billSlice = createSlice({
  name: "bill",
  initialState: {
    billData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setBillData: (state, action) => {
      state.billData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadBill.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadBill.fulfilled, (state, action) => {
        state.loading = false;
        state.billData = action.payload;
      })
      .addCase(uploadBill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setBillData } = billSlice.actions;
export default billSlice.reducer;