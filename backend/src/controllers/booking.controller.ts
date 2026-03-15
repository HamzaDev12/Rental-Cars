import type { Response } from "express";
import type { AuthRequest } from "../types/auth.types.js";
import { catchError, shortRes } from "../constants/messages.js";
import type { ICreateBooking } from "../types/booking.types.js";
import { prisma } from "../lib/prisma.js";
import { sentNotification } from "../services/notification.service.js";

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { carId, startDate, endDate } = req.body;

    if (!carId || !startDate || !endDate) {
      return shortRes(res, 400, "All fields are required");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.userId!,
      },
    });

    if (!user) {
      shortRes(res, 404, "User not found");
      return;
    }

    const car = await prisma.car.findUnique({
      where: { id: Number(carId) },
    });

    if (!car) {
      return shortRes(res, 404, "Car not found");
    }

    if (!car.isAvailable) {
      return shortRes(res, 400, "Car is not available");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return shortRes(res, 400, "Invalid booking dates");
    }

    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );

    const totalPrice = days * car.pricePerDay;

    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        carId: car.id,
        status: { in: ["CONFIRMED", "PENDING"] },
        OR: [
          {
            startDate: { lte: end },
            endDate: { gte: start },
          },
        ],
      },
    });

    if (conflictingBooking) {
      return shortRes(res, 400, "Car already booked for selected dates");
    }

    const booking = await prisma.$transaction(async (tx) => {
      const createdBooking = await tx.booking.create({
        data: {
          carId: car.id,
          userId: user.id,
          startDate: start,
          endDate: end,
          totalPrice,
        },
      });

      await tx.car.update({
        where: { id: car.id },
        data: { isAvailable: false },
      });

      return createdBooking;
    });

    sentNotification(
      user.email,
      `Booking Received – Awaiting Confirmation </br>

Hello ${user.name},<br/><br/>

We have received your booking request for the car "${car.name}". Your booking is currently <b>pending confirmation</b>. <br/>

📅 Start Date: ${start.toDateString()}<br/>
📅 End Date: ${end.toDateString()}<br/>
💰 Total Price: $${totalPrice}<br/>

We will notify you as soon as your booking is confirmed. Thank you for your patience.<br/>

Best regards,<br/>
Hargeisa Drive`,
    );
    return shortRes(res, 201, "Booking created successfully", booking);
  } catch (error) {
    catchError(error, res);
  }
};

const getBookingStatusMessage = (
  userName: string,
  carName: string,
  status: string,
) => {
  if (status === "CONFIRMED") {
    return `
      Hello ${userName},<br><br>
      Good news! Your booking for the car "${carName}" has been <b>approved</b>.<br>
      You can pick up the car as per your scheduled dates.<br><br>
      Best regards,<br>
      Hargeisa Drive
    `;
  } else if (status === "CANCELED") {
    return `
      Hello ${userName},<br><br>
      We’re sorry, but your booking for the car "${carName}" has been <b>rejected</b>.<br>
      Please try booking another car or contact support for more details.<br><br>
      Best regards,<br>
      Hargeisa Drive
    `;
  }
  return "";
};

export const updatedBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      shortRes(res, 400, "Invalid id number");
      return;
    }
    const { status } = req.body;
    if (!status || status === "PENDING") {
      shortRes(res, 400, "Please choose valid status ");
      return;
    }

    const booked = await prisma.booking.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
        car: true,
      },
    });

    if (!booked) {
      shortRes(res, 404, "Booking not found");
      return;
    }

    const updated = await prisma.$transaction(async (tx) => {
      const updatedBooking = await tx.booking.update({
        where: { id: Number(id) },
        data: { status },
      });

      if (status === "CANCELED" || status === "COMPLETED") {
        await tx.car.update({
          where: { id: booked.carId },
          data: { isAvailable: true },
        });
      }

      return updatedBooking;
    });

    if (status === "CONFIRMED" || status === "CANCELED") {
      const message = getBookingStatusMessage(
        booked.user.name,
        booked.car.name,
        status,
      );
      await sentNotification(booked.user.email, message);
    }

    shortRes(res, 200, "Updated booking seccussfully", updated);
  } catch (error) {
    catchError(error, res);
  }
};

export const deletedBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      shortRes(res, 400, "Invalid id number");
      return;
    }

    const booked = await prisma.booking.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!booked) {
      shortRes(res, 404, "Booking not found");
      return;
    }

    if (booked.status === "PENDING" || booked.status === "CONFIRMED") {
      shortRes(
        res,
        400,
        "Cannot delete booking that is pending or confirmed. Please cancel it first.",
      );
      return;
    }
    await prisma.$transaction(async (tx) => {
      if (booked.status === "CANCELED" || booked.status === "COMPLETED") {
        await tx.car.update({
          where: { id: booked.carId },
          data: { isAvailable: true },
        });
      }

      await tx.booking.delete({
        where: { id: Number(id) },
      });
    });

    shortRes(res, 200, "Deleted booking successfully");
  } catch (error) {
    catchError(error, res);
  }
};

export const getAllBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 10, search, status, userId, carId } = req.query;

    const pageNumber = Math.max(1, Number(page) || 1);
    const limitNumber = Math.min(50, Math.max(1, Number(limit) || 10));
    const skip = (pageNumber - 1) * limitNumber;

    const where: any = {};

    if (search) {
      where.OR = [
        {
          user: {
            name: { contains: search as string, mode: "insensitive" },
          },
        },
      ];
    }

    if (status) where.status = status;
    if (userId) where.userId = Number(userId);
    if (carId) where.carId = Number(carId);

    const [booking, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        skip,
        take: limitNumber,
        include: {
          car: {
            select: {
              imageUrl: true,
              name: true,
              model: true,
              year: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.booking.count({ where }),
    ]);

    return shortRes(res, 200, "Bookings fetched successfully", {
      data: booking,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    catchError(error, res);
  }
};

export const myBooking = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const { page = 1, limit = 10 } = req.query;

    const pageNumber = Math.max(1, Number(page) || 1);
    const limitNumber = Math.min(50, Math.max(1, Number(limit) || 10));
    const skip = (pageNumber - 1) * limitNumber;

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where: { userId: userId! },
        skip,
        take: limitNumber,
        include: {
          car: {
            select: {
              imageUrl: true,
              name: true,
              model: true,
              year: true,
              location: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.booking.count({
        where: { userId: userId! },
      }),
    ]);

    res.status(200).json({
      message: "Bookings fetched successfully",
      bookings,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    catchError(error, res);
  }
};
