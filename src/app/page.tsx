"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function HomePageV3() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      console.error("데이터 불러오기 실패:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 배경은 눈이 편안한 Soft Zinc 톤 유지
    <div className="min-h-screen bg-slate-50/50 antialiased">
      {/* 💡 핵심: max-w-3xl(약 768px)로 너비를 제한하여 1단으로 구성. 
          어떤 화면에서도 가운데 정렬되어 시선이 분산되지 않습니다.
      */}
      <div className="max-w-3xl mx-auto py-16 px-6 pb-32">
        
        {/* ==========================================
            [상단 헤더 영역]
            ========================================== */}
        <div className="mb-16 pb-4 border-b border-slate-200 flex justify-between items-end">
          <h2 className="text-sm font-black text-slate-900 tracking-widest uppercase">
            Latest Moments
          </h2>
          <span className="text-xs font-bold text-slate-400">{posts.length} Posts</span>
        </div>

        {/* ==========================================
            [중앙 게시물 목록 영역]
            ========================================== */}
        <main>
          {loading ? (
            <div className="py-20 text-center font-bold text-slate-400 animate-pulse">
              모먼트를 불러오는 중입니다... ⏳
            </div>
          ) : posts.length === 0 ? (
            <div className="py-20 text-center font-bold text-slate-400">
              아직 기록된 모먼트가 없습니다. <br />첫 기록을 남겨보세요! 🍃
            </div>
          ) : (
            <div className="space-y-32"> 
              {posts.map((post) => (
                <article key={post.id} className="group relative">
                  <div className="space-y-6">
                    {/* 메타 정보 (카테고리 & 날짜) */}
                    <div className="flex items-center space-x-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      <span className="text-blue-600">{post.category || "MOMENT"}</span>
                      <span>·</span>
                      <span className="tabular-nums">{post.date}</span>
                    </div>
                    
                    {/* 제목 & 본문 */}
                    <div className="space-y-4">
                      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-slate-900 leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-slate-600 font-medium whitespace-pre-wrap leading-relaxed text-[17px]">
                        {post.description}
                      </p>
                    </div>

                    {/* 이미지 영역 */}
                    {post.image_url && (
                      <div className="w-full mt-8 rounded-[32px] overflow-hidden bg-white border border-slate-100 shadow-2xl shadow-slate-200/40">
                        <img 
                          src={post.image_url} 
                          alt={post.title} 
                          className="w-full h-auto object-cover max-h-[800px] group-hover:scale-[1.02] transition-transform duration-1000 ease-in-out" 
                        />
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>

        {/* ==========================================
            [하단 프로필 영역] 
            💡 핵심: 글을 다 읽은 후 마지막에 나타나는 명함 스타일
            ========================================== */}
        <footer className="mt-40 pt-20 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-[20px] flex items-center justify-center text-2xl font-black shadow-xl shadow-slate-900/20">
                재
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">재욱</h3>
                <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">AI-Native Creator</p>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <p className="text-[10px] font-black text-slate-300 tracking-[0.3em] uppercase">Connect</p>
              <a href="#" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors inline-flex items-center">
                Github <span className="ml-1 text-[10px]">↗</span>
              </a>
            </div>
          </div>
          <p className="mt-20 text-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">
            © 2026 SIMLOG Archive
          </p>
        </footer>

      </div>

      {/* 우측 하단 고정 글쓰기 버튼 */}
      <Link href="/write" className="fixed bottom-10 right-10 w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center text-3xl font-light shadow-2xl hover:bg-blue-600 hover:scale-110 active:scale-95 transition-all z-50">
        +
      </Link>
    </div>
  );
}