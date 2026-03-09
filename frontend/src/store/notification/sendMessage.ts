import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseURL, somError } from "../../constants/message";
import type {
  ICreateNotification,
  ICreateNotificationResponse,
} from "../../types/notification.types";
import type { RootState } from "../store";

const initialState = {
  data: {} as ICreateNotificationResponse,
  loading: false,
  error: "",
};

export const createNotificationFn = createAsyncThunk(
  "create/notification",
  async (data: ICreateNotification, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const token = state?.loginUser?.data?.token;
    try {
      const res = await axios.post(
        `${baseURL}/notifications/fromClient`,
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

export const createNotification = createSlice({
  name: "createNotification",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createNotificationFn.pending, (state) => {
      state.data = {} as ICreateNotificationResponse;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(createNotificationFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(createNotificationFn.rejected, (state, action) => {
      state.data = {} as ICreateNotificationResponse;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
