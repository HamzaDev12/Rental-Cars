import { body } from "express-validator";

export const createCarValidation = [
  body("name")
    .notEmpty()
    .withMessage("Car name is required")
    .isLength({ min: 2 })
    .withMessage("Car name must be at least 2 characters"),

  body("model")
    .notEmpty()
    .withMessage("Car model is required")
    .isLength({ min: 2 })
    .withMessage("Car model must be at least 2 characters"),

  body("year")
    .notEmpty()
    .withMessage("Year is required")
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage("Invalid car year"),

  body("pricePerDay")
    .notEmpty()
    .withMessage("Price per day is required")
    .isFloat({ min: 1 })
    .withMessage("Price must be greater than 0"),

  body("imageUrl")
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Invalid image URL"),
];

export const updateCarValidation = [
  body("name")
    .notEmpty()
    .withMessage("Car name is required")
    .isLength({ min: 2 })
    .withMessage("Car name must be at least 2 characters"),

  body("model")
    .notEmpty()
    .withMessage("Car model is required")
    .isLength({ min: 2 })
    .withMessage("Car model must be at least 2 characters"),

  body("year")
    .notEmpty()
    .withMessage("Year is required")
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage("Invalid car year"),

  body("pricePerDay")
    .notEmpty()
    .withMessage("Price per day is required")
    .isFloat({ min: 1 })
    .withMessage("Price must be greater than 0"),

  body("imageUrl")
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Invalid image URL"),

  body("isAvailable")
    .notEmpty()
    .withMessage("Availability is required")
    .isBoolean()
    .withMessage("isAvailable must be true or false"),
];
