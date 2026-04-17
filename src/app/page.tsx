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
      // 게시판 글 최근 3개, 공지사항 최근 3개만 가져오기
      const { data: boardData } = await supabase.from("posts").select("*").order("created_at", { ascending: false }).limit(3);
      // 나중에 공지 테이블 생기면 여기서 fetch
      setPosts(boardData || []);
      setNotices([{ id: 1, title: "SIMLOG V3 가동 시작", date: "2026.04.17" }]); 
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 antialiased">
      <div className="max-w-3xl mx-auto py-20 px-6 pb-32">
        
        {/* 1. 인트로 세션 */}
        <header className="mb-24">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-4">
            Welcome to <br />
            SIMLOG Archive<span className="text-blue-600">.</span>
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            블로그 블로그 블로그 만듦 만듦<br />
            테스트 테스트 테스트 하는 중 중 
          </p>
        </header>

        <div className="space-y-24">
          {/* 2. 공지사항 섹션 (고전적 리스트 스타일) */}
          <section>
            <div className="flex items-center justify-between mb-8 pb-2 border-b-2 border-slate-900">
              <h2 className="text-sm font-black uppercase tracking-widest">Notice</h2>
              <Link href="/notice" className="text-[10px] font-bold text-slate-400 hover:text-black transition-colors uppercase">View All ➔</Link>
            </div>
            <div className="divide-y divide-slate-100">
              {notices.map((n) => (
                <Link href="/notice" key={n.id} className="py-4 flex justify-between items-center group">
                  <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{n.title}</span>
                  <span className="text-xs font-bold text-slate-300 tabular-nums">{n.date}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* 3. 최근 게시물 섹션 (비주얼 스타일) */}
          <section>
            <div className="flex items-center justify-between mb-10 pb-2 border-b-2 border-slate-900">
              <h2 className="text-sm font-black uppercase tracking-widest">Recent Moments</h2>
              <Link href="/log" className="text-[10px] font-bold text-slate-400 hover:text-black transition-colors uppercase">View All ➔</Link>
            </div>
            <div className="space-y-20">
              {posts.map((post) => (
                <article key={post.id} className="group">
                  <div className="space-y-4">
                    <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{post.category || "Moment"}</div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                    {post.image_url && (
                      <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50">
                        <img src={post.image_url} alt="" className="w-full h-auto object-cover max-h-96 group-hover:scale-105 transition-transform duration-700" />
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* 4. 명함형 푸터 */}
        <footer className="mt-40 pt-20 border-t border-slate-200 flex flex-col items-center text-center space-y-8">
          <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-black">재</div>
          <div>
            <h3 className="text-xl font-black text-slate-900">재욱</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Archive Curator</p>
          </div>
        </footer>
      </div>
    </div>
  );
}