import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b1326]">
      <div className="bg-[#131b2e] border-b border-[#464554]/20 px-6 py-3 flex items-center gap-6">
        <span className="text-sm font-bold text-[#c0c1ff] uppercase tracking-widest">Admin</span>
        <Link href="/admin/challenges" className="text-xs text-[#c7c4d7] hover:text-[#c0c1ff] transition-colors uppercase tracking-wider">
          Challenges
        </Link>
        <Link href="/" className="text-xs text-[#464554] hover:text-[#c0c1ff] transition-colors uppercase tracking-wider ml-auto">
          ← Back to site
        </Link>
      </div>
      <div className="max-w-screen-xl mx-auto px-6 py-10">{children}</div>
    </div>
  );
}
