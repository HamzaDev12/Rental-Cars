import jwt from "jsonwebtoken";
import "dotenv/config";
export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};
