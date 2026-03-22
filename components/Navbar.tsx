"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navLink = (href: string, label: string) => {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    return (
      <Link
        href={href}
        className={`text-xs uppercase tracking-wider transition-colors ${
          active
            ? "text-[#c0c1ff] border-b-2 border-[#c0c1ff] pb-1"
            : "text-[#464554] hover:text-[#c0c1ff]"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="bg-[#0b1326] sticky top-0 z-50 border-b border-[#464554]/20">
      <div className="flex justify-between items-center w-full px-6 py-3 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tighter text-[#c0c1ff]">
            DevChallenge Pro
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            {navLink("/", "Browse")}
            {navLink("/solutions", "Solutions")}
            {navLink("/pro", "Pro")}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Image
                src={session.user?.image ?? "/default-avatar.png"}
                alt={session.user?.name ?? "User"}
                width={32}
                height={32}
                className="rounded-lg border border-[#464554]/30"
              />
              <button
                onClick={() => signOut()}
                className="text-xs text-[#464554] hover:text-[#c0c1ff] transition-colors uppercase tracking-wider"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("github")}
              className="flex items-center gap-2 bg-[#c0c1ff] text-[#1000a9] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Sign in with GitHub
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
