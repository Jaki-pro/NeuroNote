import { Types } from "mongoose";

export type User = {
  _id?: Types.ObjectId;
  googleId: string;
  email: string;
  name: string;
  picture?: string;
  createdAt?: Date;
  updatedAt?: Date;
};