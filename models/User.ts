import mongoose, { Schema, model } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  id: string;
  createdAt: number;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model<IUser>("User", UserSchema);
export default User;
