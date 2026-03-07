import { configureStore } from "@reduxjs/toolkit";
import { getCars } from "./cars/getAllCars";

export const store = configureStore({
  reducer: {
    // cars
    getAllCars: getCars.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
