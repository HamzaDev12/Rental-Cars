import { configureStore } from "@reduxjs/toolkit";
import { getCars } from "./cars/getAllCars";
import { createNotification } from "./notification/sendMessage";
import { loginUser } from "./auth/loginUser";

export const store = configureStore({
  reducer: {
    // cars
    getAllCars: getCars.reducer,

    // notification
    sendMessage: createNotification.reducer,

    // users
    loginUser: loginUser.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
