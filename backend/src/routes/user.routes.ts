import { Router } from "express";
import {
  createUserValidator,
  // changePasswordValidation,
  forgetPasswordSchema,
  loginUserValidator,
} from "../schema/user.schema.js";
import { validations } from "../middlewares/schema.middleware.js";
import {
  confirmChangeEmail,
  createUser,
  forgetPassword,
  generateOtp,
  login,
  requestChangeEmail,
  updatePassword,
  verifyOtp,
} from "../controllers/user.controller.js";
import { authentication } from "../middlewares/auth.middleware.js";
import { authorized } from "../middlewares/authorized.meddleware.js";
import { Role } from "../generated/prisma/enums.js";
const route = Router();

route.post("/create", createUserValidator, validations, createUser);

route.post("/genrateOtp", generateOtp);

route.patch("/verify", verifyOtp);

route.patch(
  "/resetPassword",
  forgetPasswordSchema,
  validations,
  forgetPassword,
);

route.post("/login", loginUserValidator, validations, login);

route.patch(
  "/updatePassword",
  authentication,
  authorized([Role.ADMIN, Role.CUSTOMER]),
  // changePasswordValidation,
  // validations,
  updatePassword,
);

route.post("/changeEmail", authentication, requestChangeEmail);

route.patch("/verifyEmailChange", authentication, confirmChangeEmail);

export default route;
