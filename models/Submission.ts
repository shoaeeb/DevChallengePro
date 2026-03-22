import { Schema, model, models } from "mongoose";

export interface ISubmission {
  challengeSlug: string;
  challengeTitle: string;
  githubUsername: string;
  githubAvatar: string;
  githubProfileUrl: string;
  repoUrl: string;
  liveUrl?: string;
  techStack: string[];
  votes: number;
  views: number;
  featured: boolean;
  createdAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    challengeSlug: { type: String, required: true, index: true },
    challengeTitle: { type: String, required: true },
    githubUsername: { type: String, required: true },
    githubAvatar: { type: String, required: true },
    githubProfileUrl: { type: String, required: true },
    repoUrl: { type: String, required: true },
    liveUrl: { type: String },
    techStack: [{ type: String }],
    votes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Submission =
  models.Submission || model<ISubmission>("Submission", SubmissionSchema);
