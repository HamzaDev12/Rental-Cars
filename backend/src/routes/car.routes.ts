import { Router } from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import { authorized } from "../middlewares/authorized.meddleware.js";
import { Role } from "../generated/prisma/enums.js";
import { createCarValidation } from "../schema/car.schema.js";
import { validations } from "../middlewares/schema.middleware.js";
import { createCar } from "../controllers/car.controller.js";
const route = Router();

route.post(
  "/create",
  authentication,
  authorized([Role.ADMIN]),
  createCarValidation,
  validations,
  createCar,
);

export default route;
