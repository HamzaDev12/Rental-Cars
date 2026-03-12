import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseURL, somError } from "../../constants/message";
import type { IGenerateCode, ISendOTPResponse } from "../../types/user.types";

const initialState = {
  data: {} as ISendOTPResponse,
  loading: false,
  error: "",
};

export const sendOTPCodeFn = createAsyncThunk(
  "sendOTP/code",
  async (data: IGenerateCode, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseURL}/users/genrateOtp`, data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || somError);
      }
      return rejectWithValue(somError);
    }
  },
);

export const sendOTPCode = createSlice({
  name: "sentOTPCode",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(sendOTPCodeFn.pending, (state) => {
      state.data = {} as ISendOTPResponse;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(sendOTPCodeFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(sendOTPCodeFn.rejected, (state, action) => {
      state.data = {} as ISendOTPResponse;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
