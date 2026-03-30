export interface IGetCars {
  cars: Car[];
  pagination: Pagination;
}

export interface Car {
  id: number;
  name: string;
  model: string;
  year: number;
  pricePerDay: number;
  imageUrl: string;
  mileage: number;
  seats: number;
  transmission: string;
  location: string;
  fuelType: string;
  description: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  bookings: Bookings[];
}

export interface Pagination {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface Bookings {
  userId: number;
  status: string;
  totalPrice: number;
}

export interface ICreateCarPayload {
  name: string;
  model: string;
  year: number | string;
  pricePerDay: number | string;
  imageUrl: string | File;
  seats: number | string;
  mileage: number | string;
  transmission: string;
  location: string;
  fuelType: string;
  description: string;
}

export interface ICreateCarResponse {
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  name: string;
  model: string;
  year: number;
  pricePerDay: number;
  imageUrl: string;
  mileage: number;
  seats: number;
  transmission: string;
  location: string;
  fuelType: string;
  description: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}
