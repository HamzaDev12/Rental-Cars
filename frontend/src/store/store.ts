import { configureStore } from "@reduxjs/toolkit";
import { getCars } from "./cars/getAllCars";
import { createNotification } from "./notification/sendMessage";
import { loginUser } from "./auth/loginUser";
import { whoami } from "./auth/whoami";
import { createUser } from "./auth/createUser";
import { verificationCode } from "./auth/verification";
import { sendOTPCode } from "./auth/re-sendOtp";
import { getMyBookings } from "./bookings/getMyBooking";
import { createBooking } from "./bookings/createBooking";
import { getAllBookings } from "./bookings/getAllBookings";
import { createCars } from "./cars/createCar";
import { updateCars } from "./cars/updateCar";
import { deleteCars } from "./cars/deleteCar";

export const store = configureStore({
  reducer: {
    // cars
    getAllCars: getCars.reducer,
    createCar: createCars.reducer,
    updateCar: updateCars.reducer,
    deleteCar: deleteCars.reducer,

    // bookings
    myBookings: getMyBookings.reducer,
    createBooking: createBooking.reducer,
    getAllBooking: getAllBookings.reducer,

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
