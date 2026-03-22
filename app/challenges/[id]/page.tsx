"use client";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IChallenge {
  _id: string;
  slug: string;
  title: string;
  difficulty: string;
  tags: string[];
  brief: string;
  isPremium: boolean;
  figmaUrl?: string;
  desktopImageUrl: string;
  mobileImageUrl?: string;
  submissionsCount: number;
  userStories: { label: string; text: string; color: string }[];
  requirements: { title: string; desc: string }[];
}

const difficultyStyles: Record<string, string> = {
  Easy: "bg-[#8083ff] text-[#0d0096]",
  Medium: "bg-[#03b5d3] text-[#00424e]",
  Hard: "bg-[#93000a] text-[#ffb4ab]",
};

export default function ChallengeDetailPage() {
  const { data: session, status } = useSession();
  const isPro = (session?.user as { isPro?: boolean })?.isPro;
  const params = useParams();
  const [challenge, setChallenge] = useState<IChallenge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/challenges/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setLoading(false); return; }
        // Normalise arrays in case DB returns undefined fields
        setChallenge({
          ...data,
          tags: data.tags ?? [],
          userStories: data.userStories ?? [],
          requirements: data.requirements ?? [],
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading || status === "loading") {
    return <div className="min-h-screen flex items-center justify-center text-[#464554]">Loading...</div>;
  }

  if (!challenge) {
    return <div className="min-h-screen flex items-center justify-center text-[#464554]">Challenge not found.</div>;
  }

  // Gate premium challenges
  if (challenge.isPremium && !isPro) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">
          <div className="bg-[#131b2e] rounded-2xl border border-[#c0c1ff]/20 p-12 shadow-[0_0_60px_-10px_rgba(192,193,255,0.1)]">
            <span className="text-5xl mb-6 block">🔒</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#dae2fd] mb-3">Premium Challenge</h1>
            <p className="text-[#c7c4d7] mb-2">
              <span className="text-[#c0c1ff] font-bold">{challenge.title}</span> is a Pro challenge.
            </p>
            <p className="text-[#908fa0] text-sm mb-8">Upgrade to Pro for ₹800/month to unlock all premium challenges.</p>
            <Link href="/pro" className="inline-block w-full bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] text-[#1000a9] py-4 rounded-lg font-bold uppercase tracking-wider hover:brightness-110 transition-all mb-4">
              Upgrade to Pro →
            </Link>
            <Link href="/challenges" className="block text-xs text-[#908fa0] hover:text-[#c0c1ff] transition-colors uppercase tracking-wider">
              ← Back to free challenges
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-screen-2xl mx-auto px-6 py-12 md:py-20">
      <section className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#464554]/10 pb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded font-bold ${difficultyStyles[challenge.difficulty] ?? ""}`}>
                {challenge.difficulty}
              </span>
              {challenge.isPremium && (
                <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded font-bold bg-[#c0c1ff]/10 text-[#c0c1ff] border border-[#c0c1ff]/20">
                  💎 Pro
                </span>
              )}
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">{challenge.title}</h1>
            <div className="flex flex-wrap gap-2">
              {challenge.tags.map((tag) => (
                <span key={tag} className="text-xs bg-[#171f33] px-3 py-1.5 rounded border border-[#464554]/10 text-[#4cd7f6]">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 min-w-[240px]">
            {session ? (
              <Link href={`/submit/${challenge.slug}`} className="w-full bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] text-[#1000a9] py-4 px-8 rounded-lg font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                Start Challenge 🚀
              </Link>
            ) : (
              <button onClick={() => signIn("github")} className="w-full bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] text-[#1000a9] py-4 px-8 rounded-lg font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                Sign in to Start 🚀
              </button>
            )}
            <Link href={`/solutions?challenge=${challenge.slug}`} className="w-full text-center text-xs uppercase tracking-widest text-[#4cd7f6] hover:underline">
              View Submissions
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-16">
          <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3"><span className="w-8 h-[2px] bg-[#c0c1ff]" />The Brief</h2>
            <p className="text-[#c7c4d7] leading-relaxed mb-8 text-lg">{challenge.brief}</p>
            <div className="grid gap-6">
              {challenge.userStories.map((story, i) => (
                <div key={i} className={`bg-[#131b2e] p-6 rounded-lg border-l-4 ${story.color.split(" ")[0]}`}>
                  <h3 className={`text-sm uppercase tracking-widest mb-3 ${story.color.split(" ")[1]}`}>{story.label}</h3>
                  <p className="text-[#dae2fd] text-sm">{story.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3"><span className="w-8 h-[2px] bg-[#4cd7f6]" />Technical Requirements</h2>
            <ul className="space-y-4">
              {challenge.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-4 p-4 hover:bg-[#131b2e] transition-colors rounded-lg">
                  <span className="text-[#4cd7f6] mt-0.5">✓</span>
                  <div>
                    <span className="block font-bold mb-1">{req.title}</span>
                    <span className="text-sm text-[#c7c4d7]">{req.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-8">
            <div className="bg-[#171f33] rounded-xl overflow-hidden border border-[#464554]/10">
              <div className="bg-[#2d3449] p-4 flex justify-between items-center border-b border-[#464554]/10">
                <span className="text-[10px] uppercase tracking-widest font-bold">Asset Preview</span>
                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab]/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4cd7f6]/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c0c1ff]/40" />
                </div>
              </div>
              <div className="p-4 space-y-4">
                {challenge.desktopImageUrl && (
                  <div className="aspect-video relative rounded-lg overflow-hidden group">
                    <img src={challenge.desktopImageUrl} alt="Desktop Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  {challenge.mobileImageUrl && (
                    <div className="aspect-[9/16] relative rounded-lg overflow-hidden group">
                      <img src={challenge.mobileImageUrl} alt="Mobile Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  )}
                  <div className="bg-[#2d3449] rounded-lg p-6 flex flex-col justify-center items-center text-center gap-4">
                    <span className="text-4xl">💎</span>
                    <div className="space-y-1">
                      <p className="font-bold text-sm">Figma File</p>
                      <p className="text-[10px] text-[#c7c4d7] uppercase">Free for all</p>
                    </div>
                    {challenge.figmaUrl ? (
                      <a href={challenge.figmaUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-[#31394d] text-[#dae2fd] py-2 rounded text-[10px] uppercase font-bold hover:bg-[#c0c1ff] hover:text-[#1000a9] transition-colors">
                        Open in Figma ↗
                      </a>
                    ) : (
                      <span className="text-[10px] text-[#464554] uppercase">Coming soon</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#171f33] p-8 rounded-xl border border-[#464554]/10">
              <h3 className="text-xl font-bold mb-4">Community</h3>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#31394d] flex items-center justify-center text-[10px] font-bold">
                  +{challenge.submissionsCount}
                </div>
                <span className="text-[10px] uppercase text-[#c7c4d7]">solutions submitted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-[#464554]/15 mt-20 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <span className="text-lg font-black text-[#c0c1ff]">DevChallenge Pro</span>
          <p className="text-[#464554] text-sm mt-2">© 2025 DevChallenge Pro.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Refund Policy", href: "/refunds" },
            { label: "Contact Us", href: "/contact" },
          ].map(({ label, href }) => (
            <Link key={label} href={href} className="text-[10px] uppercase tracking-wider text-[#464554] hover:text-[#c0c1ff] transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </footer>
    </main>
  );
}
