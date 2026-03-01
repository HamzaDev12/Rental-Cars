import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../types/auth.types.js";
import { catchError, shortRes } from "../constants/messages.js";
import jwt from "jsonwebtoken";

export const authentication = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const headers = req?.headers?.authorization;
    if (!headers) {
      shortRes(res, 401, "un-authorized");
      return;
    }

    const token = headers.split(" ")[1];
    if (!token) {
      shortRes(res, 401, "un-authorized");
      return;
    }

    const decode: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decode) {
      shortRes(res, 401, "un-authorized");
      return;
    }

    req.userId = decode.userId;

    next();
  } catch (error) {
    catchError(error, res);
  }
};
