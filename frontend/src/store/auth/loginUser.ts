import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseURL, somError } from "../../constants/message";
import type {
  ILoginUserPayload,
  ILoginUserResponse,
} from "../../types/user.types";

const data = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")!)
  : {};

const initialState = {
  data: (data as ILoginUserResponse) || ({} as ILoginUserResponse),
  loading: false,
  error: "",
};

export const loginUserFn = createAsyncThunk(
  "user/login",
  async (data: ILoginUserPayload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseURL}/users/login`, data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || somError);
      }
      return rejectWithValue(somError);
    }
  },
);

export const loginUser = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = {} as ILoginUserResponse;
      state.loading = false;
      state.error = "";

      localStorage.removeItem("user");
    },
  },
  extraReducers(builder) {
    builder.addCase(loginUserFn.pending, (state) => {
      state.data = {} as ILoginUserResponse;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(loginUserFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(loginUserFn.rejected, (state, action) => {
      state.data = {} as ILoginUserResponse;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});

export const { logout } = loginUser.actions;
