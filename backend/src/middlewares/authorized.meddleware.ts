import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/auth.types.js";
import { catchError, shortRes } from "../constants/messages.js";
import { prisma } from "../lib/prisma.js";

export const authorized = (role: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.userId!,
        },
      });

      if (!user) {
        shortRes(res, 401, "un-authorized");
        return;
      }

      if (!role.includes(user.role)) {
        shortRes(res, 403, "this user is not allowed this part");
        return;
      }

      next();
    } catch (error) {
      catchError(error, res);
    }
  };
};
