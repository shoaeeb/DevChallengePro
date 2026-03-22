"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

interface Submission {
  _id: string;
  githubUsername: string;
  githubAvatar: string;
  githubProfileUrl: string;
  repoUrl: string;
  liveUrl?: string;
  challengeTitle: string;
  challengeSlug?: string;
  techStack: string[];
  createdAt: string;
  votes: number;
  views: number;
  featured?: boolean;
}

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

const TECH_FILTERS = ["React", "Vue", "Svelte", "Next.js", "Node.js", "TypeScript"];

export default function SolutionsGalleryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#464554]">Loading...</div>}>
      <SolutionsGallery />
    </Suspense>
  );
}

function SolutionsGallery() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const challengeFilter = searchParams.get("challenge") ?? "";
  const currentPage = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const sortParam = (searchParams.get("sort") ?? "recent") as "recent" | "votes";
  const techFilter = searchParams.get("tech") ?? "";

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (challengeFilter) params.set("challenge", challengeFilter);
    params.set("page", String(currentPage));
    params.set("sort", sortParam);
    if (techFilter) params.set("tech", techFilter);

    fetch(`/api/submissions?${params}`)
      .then((r) => r.json())
      .then((data) => {
        // Handle both old array format and new paginated format
        if (Array.isArray(data)) {
          setSubmissions(data);
          setTotal(data.length);
          setTotalPages(1);
        } else {
          setSubmissions(data.submissions ?? []);
          setTotal(data.total ?? 0);
          setTotalPages(data.totalPages ?? 1);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [challengeFilter, currentPage, sortParam, techFilter]);

  useEffect(() => { fetchSubmissions(); }, [fetchSubmissions]);

  function navigate(updates: Record<string, string | null>) {
    const p = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v === null || v === "") p.delete(k);
      else p.set(k, v);
    });
    // Reset to page 1 when filters change
    if (!("page" in updates)) p.set("page", "1");
    router.push(`/solutions?${p.toString()}`);
  }

  async function handleVote(id: string) {
    if (!session) return signIn("github");
    await fetch(`/api/submissions/${id}/vote`, { method: "POST" });
    setSubmissions((prev) =>
      prev.map((s) => (s._id === id ? { ...s, votes: s.votes + 1 } : s))
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-16 pb-12 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c0c1ff]/5 via-transparent to-[#4cd7f6]/5 pointer-events-none" />
        <div className="max-w-screen-2xl mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-extrabold text-5xl tracking-tight text-[#dae2fd] mb-2">
                {challengeFilter ? "Challenge Submissions" : "Solutions Gallery"}
              </h1>
              <p className="text-[#c7c4d7] max-w-2xl">
                {challengeFilter ? (
                  <>
                    Submissions for{" "}
                    <span className="text-[#c0c1ff] font-semibold">{challengeFilter}</span>.{" "}
                    <Link href="/solutions" className="text-[#4cd7f6] hover:underline">View all →</Link>
                  </>
                ) : (
                  "Browse submissions from the community. See who built what, check out their repos, and get inspired."
                )}
              </p>
            </div>
            {session ? (
              <Link href="/challenges" className="bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] text-[#1000a9] font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap">
                + Submit Solution
              </Link>
            ) : (
              <button onClick={() => signIn("github")} className="bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] text-[#1000a9] font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap">
                Sign in to Submit
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[52px] z-40 bg-[#0b1326]/80 backdrop-blur-xl border-y border-[#464554]/10">
        <div className="max-w-screen-2xl mx-auto px-8 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {/* Sort */}
            <button
              onClick={() => navigate({ sort: "recent" })}
              className={`text-xs uppercase tracking-widest px-4 py-2 rounded-lg whitespace-nowrap font-bold transition-colors ${sortParam === "recent" ? "bg-[#c0c1ff] text-[#1000a9]" : "text-[#c7c4d7] hover:bg-[#171f33]"}`}
            >
              Recent
            </button>
            <button
              onClick={() => navigate({ sort: "votes" })}
              className={`text-xs uppercase tracking-widest px-4 py-2 rounded-lg whitespace-nowrap font-bold transition-colors ${sortParam === "votes" ? "bg-[#c0c1ff] text-[#1000a9]" : "text-[#c7c4d7] hover:bg-[#171f33]"}`}
            >
              Most Voted
            </button>

            <div className="h-6 w-px bg-[#464554]/30 mx-2 shrink-0" />

            {/* Tech filters */}
            <span className="text-[10px] text-[#908fa0] uppercase tracking-tighter mr-1 shrink-0">Stack:</span>
            {TECH_FILTERS.map((tech) => (
              <button
                key={tech}
                onClick={() => navigate({ tech: techFilter === tech ? null : tech })}
                className={`text-xs uppercase tracking-widest px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${techFilter === tech ? "bg-[#4cd7f6]/20 text-[#4cd7f6]" : "text-[#c7c4d7] hover:bg-[#171f33]"}`}
              >
                {tech}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-[#908fa0] uppercase whitespace-nowrap shrink-0">
            {loading ? "Loading..." : `${total} submission${total !== 1 ? "s" : ""}`}
          </span>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-screen-2xl mx-auto px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#131b2e] rounded-xl h-64 animate-pulse border border-[#464554]/10" />
            ))}
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20 text-[#464554]">
            No submissions yet.{" "}
            {(techFilter || challengeFilter) && (
              <button onClick={() => navigate({ tech: null, challenge: null })} className="text-[#4cd7f6] hover:underline">
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submissions.map((sub) => (
                <div key={sub._id} className="group flex flex-col bg-[#131b2e] rounded-xl overflow-hidden hover:bg-[#222a3d] transition-all duration-300 border border-transparent hover:border-[#c0c1ff]/20">
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-5">
                      <a href={sub.githubProfileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group/author">
                        <img src={sub.githubAvatar} alt={sub.githubUsername} className="w-10 h-10 rounded-lg border border-[#464554]/30" />
                        <div>
                          <p className="text-sm font-bold text-[#dae2fd] group-hover/author:text-[#c0c1ff] transition-colors">@{sub.githubUsername}</p>
                          <p className="text-[10px] text-[#908fa0] uppercase tracking-wider">GitHub Profile ↗</p>
                        </div>
                      </a>
                      {sub.featured && (
                        <span className="bg-[#2d3449] px-2 py-1 rounded text-[10px] font-bold text-[#4cd7f6] uppercase tracking-widest">⚡ Featured</span>
                      )}
                    </div>

                    <div className="mb-4">
                      <p className="text-[10px] text-[#908fa0] uppercase tracking-widest mb-1">Challenge</p>
                      <p className="font-bold text-[#dae2fd]">{sub.challengeTitle}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {(sub.techStack ?? []).map((tech) => (
                        <button
                          key={tech}
                          onClick={() => navigate({ tech: techFilter === tech ? null : tech })}
                          className="bg-[#2d3449] px-2 py-1 rounded text-[10px] text-[#4cd7f6] font-bold uppercase tracking-wider hover:bg-[#4cd7f6]/20 transition-colors"
                        >
                          {tech}
                        </button>
                      ))}
                    </div>

                    <p className="text-[10px] text-[#908fa0] mb-5">
                      Submitted {new Date(sub.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-5 border-t border-[#464554]/10">
                      <div className="flex items-center gap-4">
                        <button onClick={() => handleVote(sub._id)} className="flex items-center gap-1 text-[#c7c4d7] text-xs hover:text-[#c0c1ff] transition-colors">
                          👍 {formatCount(sub.votes)}
                        </button>
                        <span className="flex items-center gap-1 text-[#c7c4d7] text-xs">👁 {formatCount(sub.views)}</span>
                      </div>
                      <div className="flex gap-3">
                        {sub.liveUrl && (
                          <a href={sub.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-wider text-[#4cd7f6] hover:underline">Live ↗</a>
                        )}
                        <a href={sub.repoUrl} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-wider text-[#c7c4d7] hover:text-[#dae2fd]">Repo ↗</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => navigate({ page: String(currentPage - 1) })}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border border-[#464554]/30 text-[#c7c4d7] hover:bg-[#171f33] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                    if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === "..." ? (
                      <span key={`ellipsis-${i}`} className="text-[#464554] px-2">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => navigate({ page: String(p) })}
                        className={`w-9 h-9 rounded-lg text-xs font-bold transition-colors ${
                          p === currentPage
                            ? "bg-[#c0c1ff] text-[#1000a9]"
                            : "border border-[#464554]/30 text-[#c7c4d7] hover:bg-[#171f33]"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                <button
                  onClick={() => navigate({ page: String(currentPage + 1) })}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border border-[#464554]/30 text-[#c7c4d7] hover:bg-[#171f33] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
