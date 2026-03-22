import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Submission } from "@/models/Submission";

const PAGE_SIZE = 12;

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const challengeSlug = searchParams.get("challenge");
  const tech = searchParams.get("tech");
  const sort = searchParams.get("sort") ?? "recent";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));

  // Build filter
  const filter: Record<string, unknown> = {};
  if (challengeSlug) filter.challengeSlug = challengeSlug;
  if (tech) filter.techStack = tech; // MongoDB checks if array contains value

  const sortOrder: Record<string, 1 | -1> = sort === "votes"
    ? { votes: -1 }
    : { createdAt: -1 };

  const total = await Submission.countDocuments(filter);
  const submissions = await Submission.find(filter)
    .sort(sortOrder)
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE);

  return NextResponse.json({
    submissions,
    total,
    page,
    totalPages: Math.ceil(total / PAGE_SIZE),
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await req.json();

  if (!body.challengeSlug || !body.challengeTitle || !body.repoUrl) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const submission = await Submission.create({
    challengeSlug: body.challengeSlug,
    challengeTitle: body.challengeTitle,
    repoUrl: body.repoUrl,
    liveUrl: body.liveUrl || undefined,
    techStack: body.techStack ?? [],
    githubUsername: session.user.name,
    githubAvatar: session.user.image,
    githubProfileUrl: `https://github.com/${session.user.name}`,
  });

  return NextResponse.json(submission, { status: 201 });
}
