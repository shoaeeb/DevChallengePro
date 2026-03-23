import type { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { Challenge, type IChallenge } from "@/models/Challenge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Challenges — DevChallenge Pro",
  description:
    "Browse full stack coding challenges built from real Figma designs. MERN stack, portfolio projects, and real-world tasks for developers of all levels.",
  keywords: [
    "Full Stack Coding Challenges",
    "MERN Stack Practice Projects",
    "Figma to MERN Project",
    "Real World Full Stack Tasks",
    "Portfolio Projects for Developers",
    "Interactive Full Stack Practice",
  ],
};

const difficultyColor: Record<string, string> = {
  Easy: "bg-[#8083ff] text-[#0d0096]",
  Medium: "bg-[#03b5d3] text-[#00424e]",
  Hard: "bg-[#93000a] text-[#ffb4ab]",
};

export default async function ChallengesPage() {
  await connectDB();
  const challenges = await Challenge.find({ published: true }).sort({ createdAt: -1 }).lean<IChallenge[]>();

  return (
    <main className="max-w-screen-2xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">All Challenges</h1>
        <p className="text-[#c7c4d7]">Pick a challenge and start building.</p>
      </div>

      {challenges.length === 0 ? (
        <div className="text-center py-20 text-[#464554]">No challenges yet. Check back soon.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((c) => (
            <div
              key={String(c._id)}
              className="group bg-[#171f33] rounded-lg overflow-hidden border border-[#464554]/10 hover:border-[#c0c1ff]/40 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden bg-[#131b2e]">
                {c.desktopImageUrl && (
                  <img
                    src={c.desktopImageUrl}
                    alt={c.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${c.isPremium ? "grayscale brightness-50" : "grayscale group-hover:grayscale-0"}`}
                  />
                )}
                <div className={`absolute top-4 right-4 ${difficultyColor[c.difficulty] ?? "bg-[#464554] text-[#dae2fd]"} px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest`}>
                  {c.difficulty}
                </div>
                {c.isPremium && (
                  <div className="absolute top-4 left-4 bg-[#c0c1ff]/10 backdrop-blur border border-[#c0c1ff]/30 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-[#c0c1ff]">
                    💎 Pro
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {c.tags.map((tag) => (
                    <span key={tag} className="bg-[#2d3449] px-2 py-1 rounded-full text-[#4cd7f6] text-[10px] font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-2">{c.title}</h3>
                <p className="text-[#c7c4d7] text-sm mb-5 line-clamp-2">{c.brief}</p>
                <Link
                  href={c.isPremium ? "/pro" : `/challenges/${c.slug}`}
                  className={`px-5 py-2 rounded text-xs font-bold uppercase tracking-widest inline-block transition-colors ${
                    c.isPremium
                      ? "bg-[#c0c1ff]/10 text-[#c0c1ff] border border-[#c0c1ff]/20 hover:bg-[#c0c1ff] hover:text-[#1000a9]"
                      : "bg-[#2d3449] text-[#dae2fd] hover:bg-[#c0c1ff] hover:text-[#1000a9]"
                  }`}
                >
                  {c.isPremium ? "Unlock with Pro →" : "View Challenge"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
