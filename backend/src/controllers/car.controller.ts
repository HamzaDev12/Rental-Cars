import type { Response } from "express";
import type { AuthRequest } from "../types/auth.types.js";
import { catchError, shortRes } from "../constants/messages.js";
import type { ICreateCar } from "../types/car.types.js";
import { uploads } from "../utils/multer.js";
import { prisma } from "../lib/prisma.js";

export const createCar = [
  uploads.single("image"),
  async (req: AuthRequest, res: Response) => {
    try {
      const { name, model, year, pricePerDay }: ICreateCar = req.body;
      const image = req.file ? req.file.filename : null;
      if (!name || !model || year == null || pricePerDay == null) {
        shortRes(res, 400, "please fill all inputs");
        return;
      }

      const created = await prisma.car.create({
        data: {
          model,
          name,
          imageUrl: image,
          pricePerDay,
          year,
        },
      });

      shortRes(res, 201, "successfully created", created);
    } catch (error) {
      catchError(error, res);
    }
  },
];
