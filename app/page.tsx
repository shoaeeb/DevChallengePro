"use client";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";

const challenges = [
  {
    id: "eccomerce-platfrom",
    title: "E-commerce Platform",
    description: "Build a high-performance storefront with inventory management, secure checkout, and real-time analytics.",
    difficulty: "HARD",
    difficultyColor: "bg-[#93000a] text-[#ffb4ab]",
    tags: ["React", "Node.js", "Stripe"],
    colSpan: "md:col-span-8",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9biASf4IHOrFwYQulgKc9kNtoh_2jF7CfgFpPev0IykdFOQDc3gKDqswDVZf6ngUn3Ml81LlE7sy3iB3Umk1POoeTHPD08wcTSt6yGHmUIHKDNXJtOXM7wCS2Ghbx52a6PX62fZEKymJwGCqBk69CL4178VPPc2RFYHvsj_8_7Sds2HawrPAP7C7MIHMU9lk1D0BmaG2dZHsNXWmBpume1Low53tJiZBDqygIy5AVVZ_RqGau0EdGUTusyqvj_TaIR53SDVjl4Mk",
  },
  {
    id: "devnotes-component-driven-markdown-editor",
    title: "Pro Notes App",
    description: "A markdown-first productivity tool with offline support and sync.",
    difficulty: "EASY",
    difficultyColor: "bg-[#8083ff] text-[#0d0096]",
    tags: ["Next.js", "MDX"],
    colSpan: "md:col-span-4",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjO941dTaZ8rDwb6wWAFM5jfA9KZJQjeWT0vgtVFs3US4WR2tWFUtoi3T7XbgSiWjTTvNWDxVi6iyGKhHywzgheiHNDqTZsLxo5ZY34OC1JOiEJ9AHWz2DPMrZ7nNf43hMV8-E_HYx6-Ax1qV4VMqXjaSr5ARTY537vHaBQQ_TqNccG5lUTt_n9pPDYfsyv1k3VZnczWq80upuqgXkoyTayDEPnLpSMwwjLOkTtu0kxHd95ZkcNEogMdIcSkm8bM7FPlUrdZPrSTg",
  },
  {
    id: "pulsemetric-real-time-social-sentiment-dashboard",
    title: "Social Analytics",
    description: "Real-time data visualization engine for multi-channel social growth.",
    difficulty: "HARD",
    difficultyColor: "bg-[#93000a] text-[#ffb4ab]",
    tags: ["React", "Redis"],
    colSpan: "md:col-span-4",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGRCOevEwmIyx-MFQJsyTRefHMb5UstEyo5g1q7Payvw3Kx6gX_YssCMafearKNKDEESL4seusyTvD2oH1wsjT5Y_5z8ADZIa1BI_4lQMQtSAUC2WXogm5JauFZlWUzERPuV9CqVCcr_T0Hhmhcd7SXnIUMln_NyhFNwfclDYFk-ETRXLhNX8L9844awqR-p5g_QlS-j7VnanVBkZH5WGAMVSNnbuktfASrcRb-W8LqtZE29EZdjxBWmYbW9lteCdukST9A3jHc5w",
  },
  {
    id:"designed-dashboard",
    title: "Designer Dashboard",
    description: "Implement complex UI patterns and intricate layout logic for a professional design resource manager.",
    difficulty: "MEDIUM",
    difficultyColor: "bg-[#03b5d3] text-[#00424e]",
    tags: ["Tailwind", "Vite"],
    colSpan: "md:col-span-8",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7yBKyCWBYuVF0W1GxoLA7zrWEDefZE55j7UL6xc2ZTmMa5f0d0-SxAq3K06VqwyqS1sIUumUSIui0D1n3qnFF8ponua9oqU0pcmmW8NkUQL7kJrSDFFKpOOyo94mNirKIj_6mXWW875Vk6a0HjJOKMcvNCMAJj2pCqmMjVkG6zzQoW7uIUdV2j0wox1BoZ2jIGH_xKSF9iDjfLzIevEoxFnifgdQYoXCnJqAcjwova-gPPEqxPLtxja8jF5mGKNGfBmaEi0jS09Y",
  },
];

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-[#464554]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#171f33_0%,_#0b1326_100%)] opacity-50" />
        <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="text-[#4cd7f6] uppercase tracking-[0.3em] text-xs mb-4 block">
              Engineered for Performance
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#dae2fd] mb-6 leading-[0.9]">
              Build real full-stack apps from{" "}
              <span className="bg-gradient-to-r from-[#c0c1ff] to-[#4cd7f6] bg-clip-text text-transparent">
                professional designs.
              </span>
            </h1>
            <p className="text-[#c7c4d7] text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
              Stop building Todo apps. Level up your engineering craft by solving
              production-grade challenges with real-world technical requirements.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/challenges"
                className="bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] px-8 py-4 rounded-lg font-bold text-[#0d0096] shadow-xl hover:brightness-110 transition-all flex items-center gap-2"
              >
                Browse Challenges →
              </Link>
              <Link
                href="/solutions"
                className="px-8 py-4 rounded-lg font-bold text-[#4cd7f6] border border-[#464554]/30 hover:bg-[#171f33] transition-all"
              >
                View Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Challenges */}
      <section className="py-24 bg-[#131b2e]">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#dae2fd] mb-2">
                Featured Challenges
              </h2>
              <p className="text-[#c7c4d7] text-sm uppercase tracking-wider">
                Curated curriculum for full-stack mastery
              </p>
            </div>
            <Link href="/challenges" className="text-[#4cd7f6] text-sm flex items-center gap-2 hover:underline">
              SEE ALL TRACKS ↗
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {challenges.map((c) => (
              <div
                key={c.id}
                className={`${c.colSpan} group bg-[#171f33] rounded-lg overflow-hidden border border-[#464554]/10 hover:border-[#c0c1ff]/40 transition-all duration-300`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div
                    className={`absolute top-4 right-4 ${c.difficultyColor} backdrop-blur px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest`}
                  >
                    {c.difficulty}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#2d3449] px-3 py-1 rounded-full text-[#4cd7f6] text-[10px] font-bold uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{c.title}</h3>
                  <p className="text-[#c7c4d7] text-sm mb-6">{c.description}</p>
                  <Link
                    href={`/challenges/${c.id}`}
                    className="bg-[#2d3449] px-6 py-2 rounded text-xs font-bold uppercase tracking-widest text-[#dae2fd] hover:bg-[#c0c1ff] hover:text-[#1000a9] transition-colors inline-block"
                  >
                    Start Building
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 border-t border-[#464554]/10">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-bold tracking-tight text-[#dae2fd] mb-4">How it Works</h2>
            <p className="text-[#c7c4d7]">
              Master the full-stack through a proven iterative cycle of design, implementation, and critique.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { step: "01", icon: "🎨", title: "Pick a Challenge", desc: "Choose from our curated library of Figma designs and technical specs across all skill levels." },
              { step: "02", icon: "💻", title: "Code it Out", desc: "Implement the design using your preferred stack. Every challenge includes real assets and data APIs." },
              { step: "03", icon: "☁️", title: "Submit Work", desc: "Deploy your application and submit the live URL and repository to the community dashboard." },
              { step: "04", icon: "💬", title: "Get Feedback", desc: "Receive code reviews and performance optimizations from senior engineers and peers." },
            ].map((s) => (
              <div key={s.step} className="group">
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-5xl font-black text-[#464554]/20 group-hover:text-[#c0c1ff] transition-colors">
                    {s.step}
                  </span>
                  <span className="text-3xl">{s.icon}</span>
                </div>
                <h4 className="text-xl font-bold mb-3">{s.title}</h4>
                <p className="text-[#c7c4d7] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-screen-xl mx-auto bg-[rgba(49,57,77,0.8)] backdrop-blur-xl p-12 md:p-20 rounded-xl border border-[#464554]/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#c0c1ff]/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">Ready to commit?</h2>
            <p className="text-[#c7c4d7] text-lg max-w-xl mx-auto mb-10">
              Join 50,000+ developers building their career portfolios with production-quality code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {session ? (
                <Link
                  href="/challenges"
                  className="bg-[#c0c1ff] px-10 py-4 rounded-lg font-bold text-[#1000a9] shadow-lg hover:scale-[1.02] transition-transform"
                >
                  Start Your First Challenge
                </Link>
              ) : (
                <button
                  onClick={() => signIn("github")}
                  className="bg-[#c0c1ff] px-10 py-4 rounded-lg font-bold text-[#1000a9] shadow-lg hover:scale-[1.02] transition-transform"
                >
                  Sign in with GitHub to Start
                </button>
              )}
              <Link
                href="/pro"
                className="bg-[#171f33] px-10 py-4 rounded-lg font-bold border border-[#464554]/30 hover:bg-[#222a3d] transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b1326] border-t border-[#464554]/15">
        <div className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center max-w-screen-2xl mx-auto">
          <div className="mb-8 md:mb-0">
            <span className="text-lg font-black text-[#c0c1ff]">DevChallenge Pro</span>
            <p className="text-[#464554] text-sm mt-2 max-w-xs">© 2025 DevChallenge Pro. Engineered for performance.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Refund Policy", href: "/refunds" },
              { label: "Shipping Policy", href: "/shipping" },
              { label: "Contact Us", href: "/contact" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="text-[#464554] hover:text-[#c0c1ff] transition-colors text-sm">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
