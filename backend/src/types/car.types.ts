export interface ICreateCar {
  name: string;
  model: string;
  year: number;
  pricePerDay: number;
  imageUrl: string;
  seats: number;
  mileage: number;
  transmission: string;
  location: string;
  fuelType: string;
  description: string;
}
export interface IUpdateCar {
  name: string;
  model: string;
  year: number;
  pricePerDay: number;
  imageUrl: string;
  isAvailable: boolean;
  seats: number;
  mileage: number;
  transmission: string;
  location: string;
  fuelType: string;
  description: string;
}
