import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ICreateCarResponse } from "../../types/car.types";
import axios, { AxiosError } from "axios";
import { baseURL, somError } from "../../constants/message";
import type { RootState } from "../store";

const initialState = {
  data: {} as ICreateCarResponse,
  loading: false,
  error: "",
};

export const updateCarsFn = createAsyncThunk(
  "update/cars",
  async (
    { id, formData }: { id: number | null; formData: FormData },
    { rejectWithValue, getState },
  ) => {
    const state = getState() as RootState;
    const token = state?.loginUser?.data?.token;

    try {
      const res = await axios.patch(`${baseURL}/cars/update/${id}`, formData, {
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

export const updateCars = createSlice({
  name: "updateCars",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(updateCarsFn.pending, (state) => {
      state.data = {} as ICreateCarResponse;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(updateCarsFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(updateCarsFn.rejected, (state, action) => {
      state.data = {} as ICreateCarResponse;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
