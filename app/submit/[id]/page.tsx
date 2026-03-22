"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Challenge {
  _id: string;
  slug: string;
  title: string;
  isPremium: boolean;
}

const TECH_OPTIONS = [
  "React", "Next.js", "Vue", "Svelte", "Angular",
  "Node.js", "Express", "MongoDB", "PostgreSQL",
  "Tailwind", "TypeScript", "Stripe", "Prisma", "Redis",
];

export default function SubmitSolutionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const slug = params.id as string; // URL param is the challenge slug

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loadingChallenge, setLoadingChallenge] = useState(true);
  const [repoUrl, setRepoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/challenges/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setLoadingChallenge(false); return; }
        setChallenge(data);
        setLoadingChallenge(false);
      })
      .catch(() => setLoadingChallenge(false));
  }, [slug]);

  function toggleTech(tech: string) {
    setTechStack((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!repoUrl) return setError("Repository URL is required.");
    if (!challenge) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeSlug: challenge.slug,
          challengeTitle: challenge.title,
          repoUrl,
          liveUrl: liveUrl || undefined,
          techStack,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      router.push("/solutions");
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (status === "loading" || loadingChallenge) {
    return <div className="min-h-screen flex items-center justify-center text-[#464554]">Loading...</div>;
  }

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-4">Sign in to Submit</h1>
          <p className="text-[#c7c4d7] mb-8">You need a GitHub account to submit your solution.</p>
          <button onClick={() => signIn("github")} className="bg-[#c0c1ff] text-[#1000a9] px-8 py-3 rounded-lg font-bold hover:brightness-110 transition-all">
            Sign in with GitHub
          </button>
        </div>
      </main>
    );
  }

  if (!challenge) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[#c7c4d7] mb-4">Challenge not found.</p>
          <Link href="/challenges" className="text-[#4cd7f6] hover:underline">Browse challenges</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <div className="mb-10">
        <Link href={`/challenges/${challenge.slug}`} className="text-[#4cd7f6] text-xs uppercase tracking-wider hover:underline">
          ← Back to Challenge
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight mt-4 mb-2">Submit Solution</h1>
        <p className="text-[#c7c4d7]">
          Submitting for: <span className="text-[#c0c1ff] font-bold">{challenge.title}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-xs uppercase tracking-widest text-[#c7c4d7] mb-2">
            GitHub Repository URL <span className="text-[#ffb4ab]">*</span>
          </label>
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/username/repo"
            className="w-full bg-[#131b2e] border border-[#464554]/30 rounded-lg px-4 py-3 text-sm text-[#dae2fd] placeholder:text-[#464554] focus:outline-none focus:border-[#c0c1ff]/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-[#c7c4d7] mb-2">
            Live Demo URL <span className="text-[#464554]">(optional)</span>
          </label>
          <input
            type="url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="https://your-app.vercel.app"
            className="w-full bg-[#131b2e] border border-[#464554]/30 rounded-lg px-4 py-3 text-sm text-[#dae2fd] placeholder:text-[#464554] focus:outline-none focus:border-[#c0c1ff]/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-[#c7c4d7] mb-3">Tech Stack Used</label>
          <div className="flex flex-wrap gap-2">
            {TECH_OPTIONS.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => toggleTech(tech)}
                className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
                  techStack.includes(tech) ? "bg-[#c0c1ff] text-[#1000a9]" : "bg-[#2d3449] text-[#c7c4d7] hover:bg-[#464554]/40"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-[#ffb4ab] text-sm bg-[#93000a]/20 border border-[#93000a]/30 rounded-lg px-4 py-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] text-[#1000a9] py-4 rounded-lg font-bold uppercase tracking-wider hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting..." : "Submit Solution 🚀"}
        </button>
      </form>
    </main>
  );
}
