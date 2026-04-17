import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-black italic tracking-tighter text-slate-900">
          SIMLOG<span className="text-blue-600">.</span>
        </Link>
        
        <div className="flex items-center space-x-8 text-sm font-bold uppercase tracking-widest text-slate-400">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <Link href="/log" className="hover:text-black transition-colors">게시판</Link>
          <Link href="/notice" className="hover:text-black transition-colors">공지</Link>
          <Link href="/account" className="hover:text-black transition-colors">내 계정</Link>
        </div>
      </div>
    </nav>
  );
}