import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseURL, somError } from "../../constants/message";
import type {
  ICreateUserPayload,
  ICreateUserResponse,
} from "../../types/user.types";

const data = localStorage.getItem("email")
  ? JSON.parse(localStorage.getItem("email")!)
  : {};

const initialState = {
  data: data || ({} as ICreateUserResponse),
  loading: false,
  error: "",
};

export const createUserFn = createAsyncThunk(
  "user/create",
  async (data: ICreateUserPayload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseURL}/users/create`, data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || somError);
      }
      return rejectWithValue(somError);
    }
  },
);

export const createUser = createSlice({
  name: "createUser",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createUserFn.pending, (state) => {
      state.data = {} as ICreateUserResponse;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(createUserFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(createUserFn.rejected, (state, action) => {
      state.data = {} as ICreateUserResponse;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
