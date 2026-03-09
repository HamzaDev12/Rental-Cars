export interface ILoginUserPayload {
  email: string;
  password: string;
}

export interface ILoginUserResponse {
  message: string;
  user: User;
  token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: null;
  image: null;
  role: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
