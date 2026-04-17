"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function HomePage() {
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
    <div className="max-w-4xl mx-auto py-10 px-6 pb-24">
      <div className="flex flex-col md:grid md:grid-cols-3 gap-10 md:gap-12">
        
        {/* ==========================================
            [오른쪽 영역] 프로필 (모바일에선 맨 위 가로형 카드)
            ========================================== */}
        <aside className="md:col-span-1 order-1 md:order-2">
          <div className="sticky top-10">
            {/* 프로필 박스: 모바일에선 연한 회색 배경의 가로 카드, PC에선 투명 배경의 세로형 */}
            <div className="flex flex-row md:flex-col items-center md:items-start gap-5 p-5 md:p-0 bg-slate-50 md:bg-transparent rounded-3xl md:rounded-none">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shrink-0">
                재
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-slate-900">재욱</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">AI-Native 블로그</p>
                {/* 모바일용 깃허브 링크 (PC에선 숨김) */}
                <div className="md:hidden mt-2">
                  <a href="#" className="text-xs font-bold text-slate-400 hover:text-black transition">Github ↗</a>
                </div>
              </div>
            </div>

            {/* PC 전용 깃허브 링크 (모바일에선 숨김) */}
            <div className="hidden md:block space-y-2 pt-6 mt-6 border-t-2 border-slate-50">
              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">Links</p>
              <a href="#" className="block text-sm font-bold text-slate-600 hover:text-black transition-colors">Github ↗</a>
            </div>
          </div>
        </aside>

        {/* ==========================================
            [왼쪽 영역] 게시물 목록 
            ========================================== */}
        <div className="md:col-span-2 order-2 md:order-1">
          
          {/* 게시판 헤더: 텍스트 굵게 하고 카운트 추가 */}
          <div className="mb-8 pb-4 border-b-2 border-slate-100 flex justify-between items-end">
            <h2 className="text-sm font-black text-slate-900 tracking-widest uppercase">
              Latest Moments
            </h2>
            <span className="text-xs font-bold text-slate-400">{posts.length} Posts</span>
          </div>

          {loading ? (
            <div className="py-10 font-bold text-slate-400 animate-pulse">
              모먼트를 불러오는 중입니다... ⏳
            </div>
          ) : posts.length === 0 ? (
            <div className="py-10 font-bold text-slate-400">
              아직 기록된 모먼트가 없습니다. 첫 기록을 남겨보세요! 🍃
            </div>
          ) : (
             <div className="space-y-16">
              {posts.map((post) => (
                <article key={post.id} className="space-y-4 group">
                  <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <span className="text-blue-500">{post.category || "MOMENT"}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-600 font-medium whitespace-pre-wrap leading-relaxed">
                    {post.description}
                  </p>
                  
                  {post.image_url && (
                    <div className="w-full mt-4 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                      <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="w-full h-auto object-cover max-h-[500px]" 
                      />
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>

      </div>

      <Link href="/write" className="fixed bottom-8 right-8 md:right-12 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center text-3xl font-light shadow-2xl hover:scale-105 active:scale-95 transition-all z-50">
        +
      </Link>
    </div>
  );
}