import type { Role } from "../generated/prisma/enums.js";

export interface ICreateUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
  role: Role;
}

export interface ILoginUser {
  password: string;
  email: string;
}

export interface IChangePassword {
  currentPassword: string;
  confirm: string;
  password: string;
}

export interface IChangeEmail {
  email: string;
}
