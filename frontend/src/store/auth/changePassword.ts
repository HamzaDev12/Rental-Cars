import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseURL, somError } from "../../constants/message";
import type {
  IChangePasswordPayload,
  IForgetPasswordResponse,
} from "../../types/user.types";
import type { RootState } from "../store";

const initialState = {
  data: {} as IForgetPasswordResponse,
  loading: false,
  error: "",
};

export const changePasswordFn = createAsyncThunk(
  "change/password",
  async (
    { data, id }: { id: number | null; data: IChangePasswordPayload },
    { rejectWithValue, getState },
  ) => {
    const state = getState() as RootState;
    const token = state?.loginUser?.data?.token;
    try {
      const res = await axios.patch(
        `${baseURL}/users/updatePassword/${id}`,
        data,
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

export const changePassword = createSlice({
  name: "changePassword",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(changePasswordFn.pending, (state) => {
      state.data = {} as IForgetPasswordResponse;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(changePasswordFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(changePasswordFn.rejected, (state, action) => {
      state.data = {} as IForgetPasswordResponse;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
