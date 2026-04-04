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
  image: string;
  role: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetWhoami {
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  name: string;
  email: string;
  phone: null;
  image?: string;
  role: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserPayload {
  name: string;
  email: string;
  password: string;
  confirm: string;
  role: string;
  phone: string;
  image?: string;
}

export interface ICreateUserResponse {
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  name: string;
  email: string;
  phone: null;
  image?: string;
  role: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVerifyResponse {
  message: string;
}

export interface IVerifyPayload {
  code: string;
  email: string;
}

export interface ISendOTPResponse {
  message: string;
}

export interface IGenerateCode {
  email: string;
}

export interface IForgetPassword {
  confirm: string;
  password: string;
  email: string;
}

export interface IForgetPasswordResponse {
  message: string;
}

export interface IChangePasswordPayload {
  currentPassword: string;
  confirm: string;
  password: string;
}
