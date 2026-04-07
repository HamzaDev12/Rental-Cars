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

export const updateUserFn = createAsyncThunk(
  "update/user",
  async (
    { data, id }: { data: FormData; id: number | null },
    { rejectWithValue, getState },
  ) => {
    const state = getState() as RootState;
    const token = state?.loginUser?.data?.token;
    try {
      const res = await axios.patch(`${baseURL}/users/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || somError);
      }
      return rejectWithValue(somError);
    }
  },
);

export const updateUser = createSlice({
  name: "updateUser",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(updateUserFn.pending, (state) => {
      state.data = {} as IForgetPasswordResponse;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(updateUserFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(updateUserFn.rejected, (state, action) => {
      state.data = {} as IForgetPasswordResponse;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
