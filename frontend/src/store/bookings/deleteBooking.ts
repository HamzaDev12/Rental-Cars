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

export const deleteBookingFn = createAsyncThunk(
  "delete/booking",
  async ({ id }: { id: number }, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const token = state?.loginUser?.data?.token;
    try {
      const res = await axios.delete(`${baseURL}/bookings/delete/${id}`, {
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

export const deleteBooking = createSlice({
  name: "deleteBooking",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(deleteBookingFn.pending, (state) => {
      state.data = {} as IUpdateBookingResponse;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(deleteBookingFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(deleteBookingFn.rejected, (state, action) => {
      state.data = {} as IUpdateBookingResponse;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
