import mongoose from "mongoose";
import { Role } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: false },
    age: { type: Number, required: true },
    role: { type: String, enum: Role, default: Role.USER },
    isValid: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const User = mongoose.model<IUser>("users", userSchema);