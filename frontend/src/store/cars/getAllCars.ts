import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IGetCars } from "../../types/car.types";
import axios, { AxiosError } from "axios";
import { baseURL, somError } from "../../constants/message";

const initialState = {
  data: {} as IGetCars,
  loading: false,
  error: "",
};

export const getCarsFn = createAsyncThunk(
  "get/cars",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseURL}/cars/getAllCars`);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || somError);
      }
      return rejectWithValue(somError);
    }
  },
);

export const getCars = createSlice({
  name: "getCars",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCarsFn.pending, (state) => {
      state.data = {} as IGetCars;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(getCarsFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(getCarsFn.rejected, (state, action) => {
      state.data = {} as IGetCars;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
