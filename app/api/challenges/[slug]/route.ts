import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Challenge } from "@/models/Challenge";

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  await connectDB();
  const challenge = await Challenge.findOne({ slug: params.slug, published: true });
  if (!challenge) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(challenge);
}
