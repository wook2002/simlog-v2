import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 💡 방금 만든 네비게이션 부품을 불러옵니다!
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIMLOG V3",
  description: "Archive of my moments, captured with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      {/* 배경색을 여기서 전체적으로 깔아줍니다 */}
      <body className={`${inter.className} bg-slate-50/50 antialiased`}>
        
        {/* 🚀 바로 여기에 네비바를 고정합니다. 이제 어느 방을 가든 이게 맨 위에 뜹니다! */}
        <Navbar />

        {/* 이 {children} 자리에 page.tsx 내용들이 쏙쏙 들어옵니다 */}
        <main>
          {children}
        </main>

      </body>
    </html>
  );
}