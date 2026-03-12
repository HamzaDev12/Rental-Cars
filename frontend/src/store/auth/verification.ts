import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseURL, somError } from "../../constants/message";
import type { IVerifyPayload, IVerifyResponse } from "../../types/user.types";

const initialState = {
  data: {} as IVerifyResponse,
  loading: false,
  error: "",
};

export const verificationCodeFn = createAsyncThunk(
  "verification/code",
  async (data: IVerifyPayload, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${baseURL}/users/verify`, data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || somError);
      }
      return rejectWithValue(somError);
    }
  },
);

export const verificationCode = createSlice({
  name: "verificationCode",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(verificationCodeFn.pending, (state) => {
      state.data = {} as IVerifyResponse;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(verificationCodeFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(verificationCodeFn.rejected, (state, action) => {
      state.data = {} as IVerifyResponse;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
