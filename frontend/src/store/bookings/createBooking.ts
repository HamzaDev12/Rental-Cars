import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseURL, somError } from "../../constants/message";
import type { RootState } from "../store";
import type {
  ICreateBooking,
  ICreateBookingResponse,
} from "../../types/booking.types";

const initialState = {
  data: {} as ICreateBookingResponse,
  loading: false,
  error: "",
};

export const createBookingFn = createAsyncThunk(
  "create/booking",
  async (data: ICreateBooking, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const token = state?.loginUser?.data?.token;
    try {
      const res = await axios.post(`${baseURL}/bookings/create`, data, {
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

export const createBooking = createSlice({
  name: "createBooking",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createBookingFn.pending, (state) => {
      state.data = {} as ICreateBookingResponse;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(createBookingFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(createBookingFn.rejected, (state, action) => {
      state.data = {} as ICreateBookingResponse;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
