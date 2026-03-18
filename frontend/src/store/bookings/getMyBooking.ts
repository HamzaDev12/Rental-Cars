import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseURL, somError } from "../../constants/message";
import type { RootState } from "../store";
import type { IGetAllMyBookings } from "../../types/booking.types";

const initialState = {
  data: {} as IGetAllMyBookings,
  loading: false,
  error: "",
};

export const getMyBookingsFn = createAsyncThunk(
  "get/my-bookings",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const token = state?.loginUser?.data?.token;
    try {
      const res = await axios.get(`${baseURL}/bookings/myBookings`, {
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

export const getMyBookings = createSlice({
  name: "getMyBookings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMyBookingsFn.pending, (state) => {
      state.data = {} as IGetAllMyBookings;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(getMyBookingsFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(getMyBookingsFn.rejected, (state, action) => {
      state.data = {} as IGetAllMyBookings;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
