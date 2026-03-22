import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Challenge } from "@/models/Challenge";

const ADMIN_EMAIL = "osman.shoaeeb@gmail.com";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.email === ADMIN_EMAIL;
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  const body = await req.json();
  const challenge = await Challenge.create(body);
  return NextResponse.json(challenge, { status: 201 });
}
