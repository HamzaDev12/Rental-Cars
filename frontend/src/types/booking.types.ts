export interface IGetAllMyBookings {
  message: string;
  bookings: Booking[];
  pagination: Pagination;
}

export interface Booking {
  id: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: string;
  createdAt: Date;
  car: Car;
}

export interface Car {
  imageUrl: string;
  name: string;
  model: string;
  year: number;
  location: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
