import { Router } from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import { authorized } from "../middlewares/authorized.meddleware.js";
import { Role } from "../generated/prisma/enums.js";
import {
  createCarValidation,
  updateCarValidation,
} from "../schema/car.schema.js";
import { validations } from "../middlewares/schema.middleware.js";
import {
  createCar,
  deleteCar,
  getAllCars,
  updateCar,
} from "../controllers/car.controller.js";
const route = Router();

route.post(
  "/create",
  authentication,
  authorized([Role.ADMIN]),
  // createCarValidation,
  // validations,
  createCar,
);

route.patch(
  "/update/:id",
  authentication,
  authorized([Role.ADMIN]),
  // updateCarValidation,
  // validations,
  updateCar,
);

route.delete(
  "/delete/:id",
  authentication,
  authorized([Role.ADMIN]),
  deleteCar,
);

route.get("/getAllCars", getAllCars);
export default route;
