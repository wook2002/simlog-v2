"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function HomeDashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // 💡 진짜 DB 데이터 가져오기: 게시판 글 최근 3개만
      const { data: boardData } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      // 💡 나중에 공지사항 테이블 생기면 여기서 fetch할 예정. 지금은 임시 데이터.
      const mockNotices = [
        { id: 1, title: "SIMLOG V3 가동 시작 및 업데이트 안내", date: "2026.04.17" },
        { id: 2, title: "개인 아카이브 목적 변경 공지", date: "2026.04.10" },
      ];

      setPosts(boardData || []);
      setNotices(mockNotices); 
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 antialiased">
      {/* 💡 핵심: max-w-3xl로 너비를 제한하여 완벽한 1단 가운데 정렬 */}
      <div className="max-w-3xl mx-auto py-20 px-6 pb-32">
        
        {/* ==========================================
            [상단 웰컴 헤더 영역]
            💡 디테일: 나중에 문구를 바꿔도 예쁘도록 정갈한 타이포 처리
            ========================================== */}
        <header className="mb-24">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-5 leading-tight">
            Welcome to <br />
            SIMLOG Archive<span className="text-blue-600">.</span>
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed max-w-2xl text-[17px]">
            {/* 재욱님이 나중에 이 부분을 쿨한 문구로 덮어써주시면 됩니다! */}
            재욱의 일상과 기술적 시도들을 기록하는 공간입니다. <br />
            지극히 개인적이고도 실험적인 아카이브를 즐겨보세요.
          </p>
        </header>

        <div className="space-y-28">
          {/* ==========================================
              [중앙 1: 공지사항 섹션] (고전적 텍스트 리스트)
              ========================================== */}
          <section>
            <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-slate-900">
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-950">
                Notice
              </h2>
              <Link href="/notice" className="text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tabular-nums">
                View All {notices.length} ➔
              </Link>
            </div>
            
            <div className="divide-y divide-slate-100">
              {notices.map((n) => (
                <Link href="/notice" key={n.id} className="py-5 flex justify-between items-center group cursor-pointer">
                  <span className="font-bold text-[15px] text-slate-700 group-hover:text-blue-600 transition-colors">
                    {n.title}
                  </span>
                  <span className="text-xs font-bold text-slate-300 tabular-nums">
                    {n.date}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* ==========================================
              [중앙 2: 최근 게시물 섹션] (비주얼 스타일)
              ========================================== */}
          <section>
            <div className="flex items-center justify-between mb-10 pb-3 border-b-2 border-slate-900">
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-950">
                Recent Moments
              </h2>
              <Link href="/log" className="text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tabular-nums">
                View All {posts.length} ➔
              </Link>
            </div>
            
            <div className="space-y-24">
              {posts.map((post) => (
                <article key={post.id} className="group relative">
                  <div className="space-y-5">
                    {/* 메타 정보 */}
                    <div className="flex items-center space-x-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      <span className="text-blue-600">{post.category || "MOMENT"}</span>
                      <span>·</span>
                      <span className="tabular-nums">{post.date}</span>
                    </div>
                    
                    {/* 제목 */}
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>

                    {/* 이미지 */}
                    {post.image_url && (
                      <div className="rounded-[32px] overflow-hidden bg-white border border-slate-100 shadow-2xl shadow-slate-200/40 mt-8">
                        <img 
                          src={post.image_url} 
                          alt="" 
                          className="w-full h-auto object-cover max-h-[600px] group-hover:scale-[1.02] transition-transform duration-1000 ease-in-out" 
                        />
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* ==========================================
            [하단 푸터 영역] 
            💡 핵심: 글을 다 읽은 후 마지막에 나타나는 정갈한 명함 스타일
            ========================================== */}
        <footer className="mt-48 pt-24 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-10 text-center sm:text-left">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-[20px] flex items-center justify-center text-2xl font-black shadow-xl shadow-slate-900/20">
                재
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">재욱</h3>
                <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
                  AI-Native Creator / Archive Curator
                </p>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4">
              <p className="text-[10px] font-black text-slate-300 tracking-[0.3em] uppercase">Connect</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center sm:justify-start">
                <a href="#" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors inline-flex items-center">
                  Github <span className="ml-1 text-[10px]">↗</span>
                </a>
                <a href="#" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors inline-flex items-center">
                  Instagram <span className="ml-1 text-[10px]">↗</span>
                </a>
              </div>
            </div>
          </div>
          <p className="mt-20 text-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">
            © 2026 SIMLOG Archive. All Rights Reserved.
          </p>
        </footer>

      </div>

      {/* 우측 하단 고정 글쓰기 버튼 (+) */}
      <Link href="/write" className="fixed bottom-10 right-10 w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center text-3xl font-light shadow-2xl hover:bg-blue-600 hover:scale-110 active:scale-95 transition-all z-50">
        +
      </Link>
    </div>
  );
}