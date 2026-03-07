import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseURL, somError } from "../../constants/message";

const initialState = {
  data: {},
  loading: false,
  error: "",
};

export const createUserFn = createAsyncThunk(
  "user/create",
  async (data: number, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseURL}/users/create`, data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || somError);
      }
      return rejectWithValue(somError);
    }
  },
);

export const createUser = createSlice({
  name: "createUser",
  initialState,
  reducers: {},
});
