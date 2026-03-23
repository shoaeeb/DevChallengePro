import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { Challenge, type IChallenge } from "@/models/Challenge";

export const dynamic = "force-dynamic";

export default async function AdminChallengesPage() {
  await connectDB();
  const challenges = await Challenge.find().sort({ createdAt: -1 }).lean<IChallenge[]>();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight">Challenges</h1>
        <Link
          href="/admin/challenges/new"
          className="bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] text-[#1000a9] px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all"
        >
          + New Challenge
        </Link>
      </div>

      {challenges.length === 0 ? (
        <div className="text-center py-20 text-[#464554]">
          No challenges yet.{" "}
          <Link href="/admin/challenges/new" className="text-[#c0c1ff] hover:underline">
            Create one
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {challenges.map((c) => (
            <div
              key={String(c._id)}
              className="flex items-center justify-between bg-[#131b2e] rounded-lg px-6 py-4 border border-[#464554]/10"
            >
              <div className="flex items-center gap-4">
                {c.desktopImageUrl && (
                  <img src={c.desktopImageUrl} alt={c.title} className="w-16 h-10 object-cover rounded" />
                )}
                <div>
                  <p className="font-bold text-[#dae2fd]">{c.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#908fa0]">{c.difficulty}</span>
                    <span className="text-[#464554]">·</span>
                    <span className="text-[10px] text-[#908fa0]">{c.slug}</span>
                    {c.isPremium && (
                      <span className="text-[10px] text-[#c0c1ff] bg-[#c0c1ff]/10 px-2 py-0.5 rounded">💎 Pro</span>
                    )}
                    {!c.published && (
                      <span className="text-[10px] text-[#ffb4ab] bg-[#93000a]/20 px-2 py-0.5 rounded">Draft</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/challenges/${String(c._id)}/edit`}
                  className="text-xs text-[#4cd7f6] hover:underline uppercase tracking-wider"
                >
                  Edit
                </Link>
                <form action={`/api/admin/challenges/${String(c._id)}`} method="POST">
                  <input type="hidden" name="_method" value="DELETE" />
                  <DeleteButton id={String(c._id)} />
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Client component just for the delete button
function DeleteButton({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/challenges/${id}/delete`}
      className="text-xs text-[#ffb4ab] hover:underline uppercase tracking-wider"
    >
      Delete
    </Link>
  );
}
