import type { Response } from "express";
import type { AuthRequest } from "../types/auth.types.js";
import { catchError, shortRes } from "../constants/messages.js";
import type { ICreateCar, IUpdateCar } from "../types/car.types.js";
import { uploads } from "../utils/multer.js";
import { prisma } from "../lib/prisma.js";

export const createCar = [
  uploads.single("image"),
  async (req: AuthRequest, res: Response) => {
    try {
      const {
        name,
        model,
        year,
        pricePerDay,
        seats,
        mileage,
        transmission,
        location,
        description,
        fuelType,
      }: ICreateCar = req.body;
      const image = req.file ? req.file.filename : null;

      if (!name || !model || year == null || pricePerDay == null || !seats) {
        return shortRes(res, 400, "please fill all inputs");
      }

      if (year < 1900 || year > new Date().getFullYear()) {
        return shortRes(res, 400, "invalid year");
      }

      if (pricePerDay <= 0) {
        return shortRes(res, 400, "price must be greater than 0");
      }

      const created = await prisma.car.create({
        data: {
          name,
          model,
          year: Number(year),
          pricePerDay: Number(pricePerDay),
          imageUrl: image,
          seats,
          mileage,
          transmission,
          location,
          description,
          fuelType,
        },
      });

      return shortRes(res, 201, "car successfully created", created);
    } catch (error) {
      catchError(error, res);
    }
  },
];

export const updateCar = [
  uploads.single("image"),
  async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return shortRes(res, 400, "invalid id number");
      }

      const car = await prisma.car.findUnique({
        where: { id: Number(id) },
      });

      if (!car) {
        return shortRes(res, 404, "car not found");
      }

      const {
        name,
        model,
        year,
        pricePerDay,
        isAvailable,
        seats,
        mileage,
        transmission,
        location,
        description,
        fuelType,
      }: IUpdateCar = req.body;

      const image = req.file ? req.file.filename : null;

      if (year && (year < 1900 || year > new Date().getFullYear())) {
        return shortRes(res, 400, "invalid year");
      }

      if (pricePerDay && pricePerDay <= 0) {
        return shortRes(res, 400, "price must be greater than 0");
      }

      const updated = await prisma.car.update({
        where: { id: Number(id) },
        data: {
          name: name ?? car.name,
          model: model ?? car.model,
          year: Number(year) ?? car.year,
          pricePerDay: Number(pricePerDay) ?? car.pricePerDay,
          imageUrl: image ?? car.imageUrl,
          isAvailable: isAvailable ?? car.isAvailable,
          seats: seats ?? car.seats,
          mileage: Number(mileage) ?? car.mileage,
          transmission: transmission ?? car.transmission,
          location: location ?? car.location,
          fuelType: fuelType ?? car.fuelType,
          description: description ?? car.description,
        },
      });

      return shortRes(res, 200, "car successfully updated", updated);
    } catch (error) {
      catchError(error, res);
    }
  },
];

export const deleteCar = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return shortRes(res, 400, "invalid id number");
    }

    const car = await prisma.car.findUnique({
      where: { id: Number(id) },
    });

    if (!car) {
      return shortRes(res, 404, "car not found");
    }

    const activeBooking = await prisma.booking.findFirst({
      where: {
        carId: Number(id),
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
      },
    });

    if (activeBooking) {
      return shortRes(res, 400, "car has active bookings");
    }

    await prisma.car.delete({
      where: { id: Number(id) },
    });

    return shortRes(res, 200, "car successfully deleted");
  } catch (error) {
    catchError(error, res);
  }
};

export const getAllCars = async (req: AuthRequest, res: Response) => {
  try {
    let { page = "1", limit = "10", isAvailable, search } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (isNaN(pageNumber) || pageNumber < 1) {
      return shortRes(res, 400, "invalid page number");
    }

    if (isNaN(limitNumber) || limitNumber < 1) {
      return shortRes(res, 400, "invalid limit number");
    }

    const skip = (pageNumber - 1) * limitNumber;

    const whereCondition: any = {};

    if (isAvailable !== undefined) {
      whereCondition.isAvailable = isAvailable === "true";
    }

    if (search) {
      whereCondition.name = {
        contains: String(search),
        mode: "insensitive",
      };
    }

    const [cars, total] = await Promise.all([
      prisma.car.findMany({
        where: whereCondition,
        skip,
        take: limitNumber,
        orderBy: { createdAt: "desc" },
      }),
      prisma.car.count({
        where: whereCondition,
      }),
    ]);

    const totalPages = Math.ceil(total / limitNumber);

    // return shortRes(res, 200, "cars fetched successfully", {
    //   data: cars,
    //   pagination: {
    //     total,
    //     page: pageNumber,
    //     totalPages,
    //     limit: limitNumber,
    //   },
    // });

    res.status(200).json({
      cars,
      pagination: {
        total,
        page: pageNumber,
        totalPages,
        limit: limitNumber,
      },
    });
  } catch (error) {
    catchError(error, res);
  }
};
