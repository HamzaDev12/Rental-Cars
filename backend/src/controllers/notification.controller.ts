import type { Response } from "express";
import { catchError, shortRes } from "../constants/messages.js";
import { prisma } from "../lib/prisma.js";
import { sentNotification } from "../services/notification.service.js";
import type { AuthRequest } from "../types/auth.types.js";

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.body) {
      return shortRes(res, 400, "Request body is missing");
    }

    const { userId, message } = req.body;

    if (!userId || !message) {
      return shortRes(res, 400, "Enter userId and message");
    }

    const numericUserId = Number(userId);

    if (isNaN(numericUserId)) {
      return shortRes(res, 400, "Invalid user id");
    }

    const user = await prisma.user.findUnique({
      where: { id: numericUserId },
    });

    if (!user) {
      return shortRes(res, 404, "User not found");
    }

    const notification = await prisma.notification.create({
      data: {
        userId: numericUserId,
        message,
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
            image: true,
          },
        },
      },
    });

    try {
      await sentNotification(user.email, message);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return shortRes(res, 201, "Message sent successfully", notification);
  } catch (error) {
    catchError(error, res);
  }
};

export const getMessage = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.userId;
    if (!id || isNaN(Number(id))) {
      shortRes(res, 404, "un-authorized, please first continue login");
      return;
    }

    const messages = await prisma.notification.findMany({
      where: {
        userId: Number(id),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma.notification.updateMany({
      where: {
        userId: Number(id),
        // isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    shortRes(res, 200, "Notification Fatched", messages);
  } catch (error) {
    catchError(error, res);
  }
};

export const deleteMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      shortRes(res, 400, "Invalid id number");
      return;
    }

    const message = await prisma.notification.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!message) {
      shortRes(res, 404, "Message not found");
      return;
    }

    await prisma.notification.delete({
      where: {
        id: Number(id),
      },
    });

    shortRes(res, 200, "Deleted message succssfully");
  } catch (error) {
    catchError(error, res);
  }
};
