import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseURL, somError } from "../../constants/message";
import type { RootState } from "../store";
import type { IUpdateBookingResponse } from "../../types/booking.types";

const initialState = {
  data: {} as IUpdateBookingResponse,
  loading: false,
  error: "",
};

export const updateBookingFn = createAsyncThunk(
  "update/booking",
  async (
    { status, id }: { id: number | null; status: string },
    { rejectWithValue, getState },
  ) => {
    const state = getState() as RootState;
    const token = state?.loginUser?.data?.token;
    try {
      const res = await axios.patch(
        `${baseURL}/bookings/update/${id}`,
        { status },
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

export const updateBooking = createSlice({
  name: "updateBooking",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(updateBookingFn.pending, (state) => {
      state.data = {} as IUpdateBookingResponse;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(updateBookingFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(updateBookingFn.rejected, (state, action) => {
      state.data = {} as IUpdateBookingResponse;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
