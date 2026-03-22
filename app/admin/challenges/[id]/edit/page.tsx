import { connectDB } from "@/lib/mongodb";
import { Challenge } from "@/models/Challenge";
import ChallengeForm from "@/components/admin/ChallengeForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditChallengePage({ params }: { params: { id: string } }) {
  await connectDB();
  const challenge = await Challenge.findById(params.id).lean();
  if (!challenge) notFound();

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-8">Edit Challenge</h1>
      <ChallengeForm initial={JSON.parse(JSON.stringify(challenge))} />
    </div>
  );
}
