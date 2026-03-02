import { body } from "express-validator";
import type { Role } from "../generated/prisma/enums.js";

const roles: Role[] = ["ADMIN", "CUSTOMER"];

export const createUserValidator = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),

  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("phone").optional().isString().withMessage("Phone must be a string"),

  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("confirm")
    .exists({ checkFalsy: true })
    .withMessage("Confirm password is required")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Confirm password must match password"),

  body("role")
    .exists({ checkFalsy: true })
    .withMessage("Role is required")
    .isIn(roles)
    .withMessage(`Role must be one of: ${roles.join(", ")}`),
];

export const loginUserValidator = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
];

export const forgetPasswordSchema = [
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("confirm")
    .exists({ checkFalsy: true })
    .withMessage("Confirm password is required")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Confirm password must match password"),
];

export const ChangeEmailValidator = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
];

export const changePasswordValidation = [
  body("currentPassword")
    .exists({ checkFalsy: true })
    .withMessage("Current password is required")
    .isLength({ min: 8 })
    .withMessage("Current password must be at least 8 characters long"),

  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("confirm")
    .exists({ checkFalsy: true })
    .withMessage("Confirm password is required")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Confirm password must match password"),
];
