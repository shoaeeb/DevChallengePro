import { connectDB } from "@/lib/mongodb";
import { Challenge } from "@/models/Challenge";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DeleteChallengePage({ params }: { params: { id: string } }) {
  await connectDB();
  const challenge = await Challenge.findById(params.id).lean();

  async function confirmDelete() {
    "use server";
    await connectDB();
    await Challenge.findByIdAndDelete(params.id);
    redirect("/admin/challenges");
  }

  return (
    <div className="max-w-md mx-auto text-center py-20">
      <h1 className="text-2xl font-extrabold mb-4">Delete Challenge?</h1>
      <p className="text-[#c7c4d7] mb-8">
        This will permanently delete{" "}
        <span className="text-[#ffb4ab] font-bold">
          {(challenge as { title?: string })?.title ?? "this challenge"}
        </span>
        . This cannot be undone.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/admin/challenges"
          className="px-6 py-3 rounded-lg border border-[#464554]/30 text-sm font-bold hover:bg-[#171f33] transition-colors"
        >
          Cancel
        </Link>
        <form action={confirmDelete}>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-[#93000a] text-[#ffb4ab] text-sm font-bold hover:brightness-110 transition-all"
          >
            Yes, Delete
          </button>
        </form>
      </div>
    </div>
  );
}
