import { Schema, model, models } from "mongoose";

export interface IUserStory {
  label: string;
  text: string;
  color: string; // tailwind border+text classes e.g. "border-[#c0c1ff] text-[#c0c1ff]"
}

export interface IRequirement {
  title: string;
  desc: string;
}

export interface IChallenge {
  slug: string;           // url-friendly id e.g. "ecommerce-platform"
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  brief: string;
  userStories: IUserStory[];
  requirements: IRequirement[];
  desktopImageUrl: string;
  mobileImageUrl?: string;
  figmaUrl?: string;      // pro-only
  published: boolean;
  isPremium: boolean;     // true = Pro only
  submissionsCount: number;
  createdAt: Date;
}

const ChallengeSchema = new Schema<IChallenge>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    tags: [{ type: String }],
    brief: { type: String, required: true },
    userStories: [
      {
        label: { type: String },
        text: { type: String },
        color: { type: String },
      },
    ],
    requirements: [
      {
        title: { type: String },
        desc: { type: String },
      },
    ],
    desktopImageUrl: { type: String, required: true },
    mobileImageUrl: { type: String },
    figmaUrl: { type: String },   // visible to all users
    published: { type: Boolean, default: true },
    isPremium: { type: Boolean, default: false }, // true = Pro only
    submissionsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Challenge = models.Challenge || model<IChallenge>("Challenge", ChallengeSchema);
