import type { Response } from "express";

const serverError = "Something went wrong please try again!";

export const catchError = (error: any, res: Response) => {
  console.log(error);
  res.status(500).json({
    message: serverError,
  });
};

export const shortRes = (
  res: Response,
  status: number,
  message: string,
  data?: any,
) => {
  res.status(status).json({
    message,
    data,
  });
};
