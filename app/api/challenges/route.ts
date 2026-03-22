import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Challenge } from "@/models/Challenge";

export async function GET() {
  await connectDB();
  const challenges = await Challenge.find({ published: true }).sort({ createdAt: -1 });
  return NextResponse.json(challenges);
}
