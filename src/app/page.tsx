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
    // 1. 너비를 max-w-7xl(약 1280px)로 확 늘리고, 양옆 여백을 헤더와 맞춤
    <div className="max-w-7xl mx-auto py-10 px-6 md:px-12 pb-24">
      
      {/* 2. PC(lg 기준)에서 4칸으로 나누고 간격을 시원하게 벌림 */}
      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-12 lg:gap-20">
        
        {/* ==========================================
            [오른쪽 영역] 프로필 (1칸 차지)
            ========================================== */}
        <aside className="lg:col-span-1 order-1 lg:order-2">
          <div className="sticky top-10">
            <div className="flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-6 border-b-2 border-slate-50 lg:border-none pb-6 lg:pb-0">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-xl lg:text-2xl font-black shadow-md shrink-0">
                재
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-black text-slate-900">재욱</h3>
                <p className="text-xs lg:text-sm font-medium text-slate-500 mt-0.5">AI-Native 블로그</p>
                <div className="lg:hidden mt-1">
                  <a href="#" className="text-xs font-bold text-slate-400 hover:text-black">Github ↗</a>
                </div>
              </div>
            </div>

            <div className="hidden lg:block space-y-2 pt-6 mt-6 border-t-2 border-slate-50">
              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">Links</p>
              <a href="#" className="block text-sm font-bold text-slate-600 hover:text-black transition-colors">Github ↗</a>
            </div>
          </div>
        </aside>

        {/* ==========================================
            [왼쪽 영역] 게시물 목록 (3칸 차지 - 압도적 넓이!)
            ========================================== */}
        <div className="lg:col-span-3 order-2 lg:order-1 pt-2 lg:pt-0">
          
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
             <div className="space-y-20"> {/* 글 사이 간격도 더 시원하게 */}
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
                  
                  <p className="text-slate-600 font-medium whitespace-pre-wrap leading-relaxed max-w-4xl">
                    {post.description}
                  </p>
                  
                  {post.image_url && (
                    <div className="w-full mt-6 rounded-3xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm">
                      <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="w-full h-auto object-cover max-h-[600px] hover:scale-105 transition-transform duration-700" 
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