import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  ICreateCarPayload,
  ICreateCarResponse,
} from "../../types/car.types";
import axios, { AxiosError } from "axios";
import { baseURL, somError } from "../../constants/message";
import type { RootState } from "../store";

const initialState = {
  data: {} as ICreateCarResponse,
  loading: false,
  error: "",
};

export const createCarsFn = createAsyncThunk(
  "create/cars",
  async (data: ICreateCarPayload, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const token = state?.loginUser?.data?.token;
    try {
      const res = await axios.post(`${baseURL}/cars/create`, data, {
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

export const createCars = createSlice({
  name: "createCars",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createCarsFn.pending, (state) => {
      state.data = {} as ICreateCarResponse;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(createCarsFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(createCarsFn.rejected, (state, action) => {
      state.data = {} as ICreateCarResponse;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
