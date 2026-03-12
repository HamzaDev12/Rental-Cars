import { configureStore } from "@reduxjs/toolkit";
import { getCars } from "./cars/getAllCars";
import { createNotification } from "./notification/sendMessage";
import { loginUser } from "./auth/loginUser";
import { whoami } from "./auth/whoami";
import { createUser } from "./auth/createUser";
import { verificationCode } from "./auth/verification";
import { sendOTPCode } from "./auth/re-sendOtp";

export const store = configureStore({
  reducer: {
    // cars
    getAllCars: getCars.reducer,

    // notification
    sendMessage: createNotification.reducer,

    // users
    loginUser: loginUser.reducer,
    whoami: whoami.reducer,
    createUser: createUser.reducer,
    verifyCode: verificationCode.reducer,
    sendCode: sendOTPCode.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
