import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseURL, somError } from "../../constants/message";
import type { RootState } from "../store";
import type { IGetWhoami } from "../../types/user.types";

const initialState = {
  data: {} as IGetWhoami,
  loading: false,
  error: "",
};

export const whoamiFn = createAsyncThunk(
  "user/whoami",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const token = state?.loginUser?.data?.token;
    try {
      const res = await axios.get(`${baseURL}/users/whoami`, {
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

export const whoami = createSlice({
  name: "whoami",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(whoamiFn.pending, (state) => {
      state.data = {} as IGetWhoami;
      state.error = "";
      state.loading = true;
    });

    builder.addCase(whoamiFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
      state.loading = false;
    });

    builder.addCase(whoamiFn.rejected, (state, action) => {
      state.data = {} as IGetWhoami;
      state.error = String(action.payload);
      state.loading = false;
    });
  },
});
