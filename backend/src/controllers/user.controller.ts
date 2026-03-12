import type { Request, Response } from "express";
import { catchError, shortRes } from "../constants/messages.js";
import type {
  IChangeEmail,
  IChangePassword,
  ICreateUser,
  ILoginUser,
} from "../types/user.types.js";
import { prisma } from "../lib/prisma.js";
import argon2 from "argon2";
import { sendOtpEmail } from "../services/email.service.js";
import { uploads } from "../utils/multer.js";
import type { AuthRequest } from "../types/auth.types.js";
import { generateToken } from "../utils/jwt.js";
import { Role } from "../generated/prisma/enums.js";
import fs from "fs";
import path from "path";

export const createUser = [
  uploads.single("image"),
  async (req: Request, res: Response) => {
    try {
      const { confirm, email, name, password, role, phone } =
        req.body as ICreateUser;

      const image = req.file ? req.file.filename : null;
      if (!confirm || !email || !name) {
        shortRes(res, 400, "please fill the required inputs");
        return;
      }

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        shortRes(res, 400, "already email exist, please change it");
        return;
      }

      if (phone) {
        const ph = await prisma.user.findUnique({ where: { phone } });
        if (ph) {
          shortRes(res, 400, "Phone number already exists, please change it");
          return;
        }
      }

      if (confirm !== password) {
        shortRes(res, 400, "Confirm password must match password");
        return;
      }

      const hashPassword = await argon2.hash(password);
      const created = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
          phone,
          role,
          image,
        },
      });

      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);

      await prisma.oTP.create({
        data: { userId: created.id, code: otpCode, expiresAt },
      });

      await sendOtpEmail(created.email, otpCode);

      const { password: _, ...userWithoutPassword } = created;
      res.status(201).json({
        message: "User created successfully",
        user: userWithoutPassword,
      });
    } catch (error) {
      catchError(error, res);
    }
  },
];

export const generateOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await prisma.oTP.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    await prisma.oTP.create({
      data: {
        userId: user.id,
        code: otpCode,
        expiresAt,
      },
    });

    await sendOtpEmail(user.email, otpCode);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = await prisma.oTP.findFirst({
      where: {
        userId: user.id,
        code: code.toString(),
        isVerified: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!otp)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    await prisma.oTP.update({
      where: { id: otp.id },
      data: { isVerified: true },
    });
    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true },
    });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password, confirm } = req.body;

    if (!email || !password || !confirm) {
      return shortRes(res, 400, "All fields are required");
    }

    if (password !== confirm) {
      return shortRes(res, 400, "Confirm password must match password");
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return shortRes(res, 404, "User not found");
    }

    const verification = await prisma.oTP.findFirst({
      where: {
        userId: user.id,
        isVerified: true,
        expiresAt: { gt: new Date() },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!verification) {
      return shortRes(res, 400, "OTP not verified or expired");
    }

    const hashPassword = await argon2.hash(password);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashPassword },
    });

    return shortRes(res, 200, "Password changed successfully");
  } catch (error) {
    catchError(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as ILoginUser;
    if (!email || !password) {
      shortRes(res, 400, "All fields are required");
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      shortRes(res, 400, "email or password incorrect");
      return;
    }

    const comparePass = await argon2.verify(user.password, password);

    if (!comparePass) {
      shortRes(res, 400, "email or password incorrect");
      return;
    }

    if (user.isVerified === false) {
      shortRes(
        res,
        400,
        "Your account is not verified. Please verify your email to continue.",
      );
      return;
    }
    const token = generateToken(user.id);
    const { password: _, ...rest } = user;

    res.status(200).json({
      message: `Welcome, ${user.name.split(" ")[0]}`,
      user: rest,
      token,
    });
  } catch (error) {
    catchError(error, res);
  }
};

export const updatePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { password, confirm, currentPassword }: IChangePassword = req.body;
    if (!password || !confirm || !currentPassword) {
      shortRes(res, 400, "All fields are required");
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.userId!,
      },
    });

    if (!user) {
      shortRes(res, 404, "un-authorized, please first continue login");
      return;
    }

    const compare = await argon2.verify(user.password, currentPassword);

    if (!compare) {
      shortRes(res, 400, "Your current password incorrect");
      return;
    }

    if (password !== confirm) {
      shortRes(res, 400, "Confirm password must mutch password");
      return;
    }

    const hashPassword = await argon2.hash(password);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashPassword,
      },
    });

    shortRes(res, 200, "You changed password successfully");
  } catch (error) {
    catchError(error, res);
  }
};

export const requestChangeEmail = async (req: AuthRequest, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return shortRes(res, 400, "Enter new email");
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
    });

    if (!user) {
      shortRes(res, 404, "un-authorized, please first continue login");
      return;
    }

    const existEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existEmail) {
      return shortRes(res, 400, "This email already exists");
    }

    await prisma.oTP.deleteMany({
      where: { userId: user.id },
    });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    await prisma.oTP.create({
      data: {
        userId: user.id,
        code: `${otpCode}|${email}`,
        expiresAt,
      },
    });

    await sendOtpEmail(email, otpCode);

    return shortRes(res, 200, "OTP sent to new email");
  } catch (error) {
    catchError(error, res);
  }
};

export const confirmChangeEmail = async (req: AuthRequest, res: Response) => {
  try {
    const { code } = req.body;

    if (!code) {
      return shortRes(res, 400, "Enter OTP code");
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
    });

    if (!user) {
      shortRes(res, 404, "un-authorized, please first continue login");
      return;
    }

    const otpRecord = await prisma.oTP.findFirst({
      where: {
        userId: user.id,
        isVerified: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!otpRecord) {
      return shortRes(res, 400, "Invalid or expired OTP");
    }

    const [storedOtp, newEmail] = otpRecord.code.split("|");

    if (storedOtp !== code.toString()) {
      return shortRes(res, 400, "Incorrect OTP");
    }
    if (!newEmail) {
      shortRes(res, 400, "Invalid OTP data");
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { email: newEmail },
    });

    await prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { isVerified: true },
    });

    return shortRes(res, 200, "Email changed successfully");
  } catch (error) {
    catchError(error, res);
  }
};

export const updateUser = [
  uploads.single("image"),
  async (req: AuthRequest, res: Response) => {
    try {
      const { name, role }: { role: string; name: string } = req.body;
      const image = req.file ? req.file.filename : null;

      if (!name || !role) {
        return shortRes(res, 400, "All fields are required");
      }

      if (!Object.values(Role).includes(role as Role)) {
        return shortRes(res, 400, "Invalid role provided");
      }

      const user = await prisma.user.findUnique({
        where: { id: req.userId! },
      });
      if (!user) {
        return shortRes(res, 404, "User not found, please login first");
      }

      if (image && user.image) {
        const oldImagePath = path.join(__dirname, "../../uploads", user.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.warn("Failed to delete old image:", err.message);
        });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          name,
          role: role as Role,
          image: image || user.image,
        },
      });

      return shortRes(res, 200, "User updated successfully");
    } catch (error) {
      catchError(error, res);
    }
  },
];

export const whoami = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.userId!,
      },
    });

    if (!user) {
      shortRes(res, 404, "User not found");
      return;
    }

    const { password, ...rest } = user;
    shortRes(res, 200, "user found", rest);
  } catch (error) {
    catchError(error, res);
  }
};
