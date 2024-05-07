import { Role } from "../enums/role.enum";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: number;
  password: string;
  age: number;
  role: Role;
  isDeleted: boolean;
  isVerified: boolean;
}
