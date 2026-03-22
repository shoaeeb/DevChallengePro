import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

  // Verify Razorpay signature
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  await connectDB();

  const dbUser = await User.findOne({ githubId: (session.user as { id?: string }).id });

  // If already pro and not expired, extend from current expiry — otherwise start from now
  const base =
    dbUser?.proExpiresAt && dbUser.proExpiresAt > new Date()
      ? dbUser.proExpiresAt
      : new Date();

  const proExpiresAt = new Date(base);
  proExpiresAt.setDate(proExpiresAt.getDate() + 30);

  await User.findOneAndUpdate(
    { githubId: (session.user as { id?: string }).id },
    { isPro: true, proExpiresAt }
  );

  return NextResponse.json({ success: true, proExpiresAt });
}
