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

export const deleteCarsFn = createAsyncThunk(
  "delete/cars",
  async ({ id }: { id: number | null }, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const token = state?.loginUser?.data?.token;

    try {
      const res = await axios.delete(`${baseURL}/cars/delete/${id}`, {
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

export const deleteCars = createSlice({
  name: "deleteCars",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(deleteCarsFn.pending, (state) => {
      state.data = {} as ICreateCarResponse;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(deleteCarsFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(deleteCarsFn.rejected, (state, action) => {
      state.data = {} as ICreateCarResponse;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
