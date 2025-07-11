import mongoose, { Schema } from "mongoose";
import { User as UserType } from "../types";


const userSchema = new Schema<UserType>(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        ret._id = ret._id.toString();
        return ret;
      },
    },
  }
);

// Indexes for performance
userSchema.index({ googleId: 1 });
userSchema.index({ email: 1 });

export const UserModel = mongoose.model<UserType>("User", userSchema);