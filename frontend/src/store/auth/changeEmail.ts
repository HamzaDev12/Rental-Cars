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

export const changeEmailFn = createAsyncThunk(
  "change/email",
  async (
    { email, id }: { id: number | null; email: string },
    { rejectWithValue, getState },
  ) => {
    const state = getState() as RootState;
    const token = state?.loginUser?.data?.token;
    try {
      const res = await axios.patch(
        `${baseURL}/users/changeEmail/${id}`,
        { email },
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

export const changeEmail = createSlice({
  name: "changeEmail",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(changeEmailFn.pending, (state) => {
      state.data = {} as IForgetPasswordResponse;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(changeEmailFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(changeEmailFn.rejected, (state, action) => {
      state.data = {} as IForgetPasswordResponse;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
