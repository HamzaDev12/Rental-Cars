import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseURL, somError } from "../../constants/message";
import type { RootState } from "../store";
import type { IGetAllBookings } from "../../types/booking.types";

const initialState = {
  data: {} as IGetAllBookings,
  loading: false,
  error: "",
};

export const getAllBookingsFn = createAsyncThunk(
  "get/Allbookings",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const token = state?.loginUser?.data?.token;
    try {
      const res = await axios.get(`${baseURL}/bookings/getAll`, {
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

export const getAllBookings = createSlice({
  name: "getAllBookings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllBookingsFn.pending, (state) => {
      state.data = {} as IGetAllBookings;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(getAllBookingsFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(getAllBookingsFn.rejected, (state, action) => {
      state.data = {} as IGetAllBookings;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
