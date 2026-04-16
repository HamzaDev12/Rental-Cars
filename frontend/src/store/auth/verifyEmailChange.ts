import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseURL, somError } from "../../constants/message";
import type { IForgetPasswordResponse } from "../../types/user.types";
import type { RootState } from "../store";

const initialState = {
  data: {} as IForgetPasswordResponse,
  loading: false,
  error: "",
};

export const verifyEmailChangeFn = createAsyncThunk(
  "verify/email",
  async ({ code }: { code: number }, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const token = state?.loginUser?.data?.token;
    try {
      const res = await axios.patch(
        `${baseURL}/users/verifyEmailChange`,
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || somError);
      }
      return rejectWithValue(somError);
    }
  },
);

export const verifyEmailChange = createSlice({
  name: "verifyEmailChange",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(verifyEmailChangeFn.pending, (state) => {
      state.data = {} as IForgetPasswordResponse;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(verifyEmailChangeFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(verifyEmailChangeFn.rejected, (state, action) => {
      state.data = {} as IForgetPasswordResponse;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
