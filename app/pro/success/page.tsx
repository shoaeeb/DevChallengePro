"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ProSuccessPage() {
  const { data: session } = useSession();
  const expiresAt = (session?.user as { proExpiresAt?: string })?.proExpiresAt;

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#dae2fd] mb-4">
          Welcome to Pro
        </h1>
        <p className="text-[#c7c4d7] mb-2">
          Your subscription is active. You now have access to all premium challenges, the solutions gallery, starter code, and video walkthroughs.
        </p>
        {expiresAt && (
          <p className="text-[#908fa0] text-sm mb-8">
            Renews on{" "}
            <span className="text-[#c0c1ff]">
              {new Date(expiresAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </p>
        )}
        <Link
          href="/challenges"
          className="bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] text-[#1000a9] px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:brightness-110 transition-all inline-block"
        >
          Start Building →
        </Link>
      </div>
    </main>
  );
}
