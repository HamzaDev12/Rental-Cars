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
