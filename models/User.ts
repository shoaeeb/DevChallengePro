import { Schema, model, models } from "mongoose";

export interface IUser {
  githubId: string;
  username: string;
  email?: string;
  avatarUrl: string;
  profileUrl: string;
  isPro: boolean;
  proExpiresAt?: Date;  // null = not pro, past date = expired
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    githubId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String },
    avatarUrl: { type: String, required: true },
    profileUrl: { type: String, required: true },
    isPro: { type: Boolean, default: false },
    proExpiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>("User", UserSchema);
