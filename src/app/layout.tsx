import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/constants/siteConfig";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white text-slate-900 antialiased font-sans overflow-x-hidden">
        <div className="mx-auto max-w-5xl px-6 min-h-screen flex flex-col">
          {/* 헤더 섹션 */}
          <header className="flex items-center justify-between py-10 border-b border-slate-100">
            <h1 className="text-2xl font-black tracking-tighter cursor-pointer">
              {SITE_CONFIG.title}
            </h1>
            <nav className="space-x-6 text-sm font-bold text-slate-500">
              <a href="/" className="hover:text-black transition uppercase tracking-widest">Home</a>
            </nav>
          </header>

          {/* 메인 콘텐츠 영역 */}
          <main className="flex-grow py-12 relative">
            {children}
          </main>

          {/* 푸터 섹션 */}
          <footer className="py-8 border-t border-slate-100 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} {SITE_CONFIG.author}. Built for our memories.
          </footer>

          {/* 모바일 전용 플로팅 버튼 */}
          <MobileNav />
        </div>
      </body>
    </html>
  );
}