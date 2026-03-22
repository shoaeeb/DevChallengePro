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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  const body = await req.json();
  const challenge = await Challenge.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(challenge);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  await Challenge.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
