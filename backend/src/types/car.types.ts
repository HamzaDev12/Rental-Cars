export interface ICreateCar {
  name: string;
  model: string;
  year: number;
  pricePerDay: number;
  imageUrl: string;
}
export interface IUpdateCar {
  name: string;
  model: string;
  year: number;
  pricePerDay: number;
  imageUrl: string;
  isAvailable: boolean;
}
