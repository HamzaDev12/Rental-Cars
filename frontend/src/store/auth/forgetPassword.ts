import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseURL, somError } from "../../constants/message";
import type {
  IForgetPassword,
  IForgetPasswordResponse,
} from "../../types/user.types";

const initialState = {
  data: {} as IForgetPasswordResponse,
  loading: false,
  error: "",
};

export const forgetPasswordFn = createAsyncThunk(
  "forget/password",
  async (data: IForgetPassword, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseURL}/users/resetPassword`, data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || somError);
      }
      return rejectWithValue(somError);
    }
  },
);

export const forgetPassword = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(forgetPasswordFn.pending, (state) => {
      state.data = {} as IForgetPasswordResponse;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(forgetPasswordFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(forgetPasswordFn.rejected, (state, action) => {
      state.data = {} as IForgetPasswordResponse;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
