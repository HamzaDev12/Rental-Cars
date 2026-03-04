import { Router } from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import { authorized } from "../middlewares/authorized.meddleware.js";
import { Role } from "../generated/prisma/enums.js";
import {
  createBooking,
  deletedBooking,
  getAllBooking,
  myBooking,
  updatedBooking,
} from "../controllers/booking.controller.js";
const route = Router();

route.post(
  "/create",
  authentication,
  authorized([Role.CUSTOMER]),
  createBooking,
);

route.patch(
  "/update/:id",
  authentication,
  authorized([Role.ADMIN]),
  updatedBooking,
);

route.get("/getAll", authentication, authorized([Role.ADMIN]), getAllBooking);

route.delete(
  "/delete/:id",
  authentication,
  authorized([Role.ADMIN]),
  deletedBooking,
);

route.get(
  "/myBookings",
  authentication,
  authorized([Role.CUSTOMER]),
  myBooking,
);

export default route;
