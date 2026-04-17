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
    <div className="max-w-7xl mx-auto py-10 px-6 md:px-12 pb-24">
      
      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-12 lg:gap-20">
        
        {/* ==========================================
            [왼쪽 영역] 게시물 목록 
            💡 핵심: 코드를 맨 위로 올려서 모바일에서 무조건 "글"부터 보이게 고정!
            ========================================== */}
        <div className="lg:col-span-3 pt-2 lg:pt-0">
          
          <div className="mb-10 pb-4 border-b-2 border-slate-100 flex justify-between items-end">
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
              아직 기록된 모먼트가 없습니다. <br />첫 기록을 남겨보세요! 🍃
            </div>
          ) : (
            <div className="space-y-20">
              {posts.map((post) => (
                <article key={post.id} className="space-y-4 group">
                  <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <span className="text-blue-500">{post.category || "MOMENT"}</span>
                    <span>·</span>
                    <span className="text-slate-400 tabular-nums">{post.date}</span>
                  </div>
                  
                  <h2 className="text-3xl font-extrabold tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-600 font-medium whitespace-pre-wrap leading-relaxed max-w-3xl">
                    {post.description}
                  </p>

                  <div className="flex space-x-2 pt-1 pb-4">
                    <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded">#{post.category || "Moment"}</span>
                  </div>
                  
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

        {/* ==========================================
            [오른쪽 영역] 프로필 (PC에선 우측)
            💡 핵심: 코드를 아래로 내려서 모바일에선 글 다 읽은 후 맨 밑(푸터)에 보이도록!
            ========================================== */}
        <aside className="lg:col-span-1 border-t-2 lg:border-t-0 border-slate-100 pt-10 lg:pt-0 mt-10 lg:mt-0">
          <div className="sticky top-10 space-y-8">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-3xl flex items-center justify-center text-3xl font-black shadow-lg">
              재
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">재욱</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">AI-Native 블로그</p>
            </div>
            
            <div className="space-y-3 pt-6 mt-6 border-t-2 border-slate-50">
              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">Links</p>
              <a href="#" className="block text-sm font-bold text-slate-600 hover:text-black transition-colors">Github ↗</a>
            </div>
          </div>
        </aside>

      </div>

      {/* 오른쪽 하단 고정 글쓰기 [+] 버튼 */}
      <Link href="/write" className="fixed bottom-8 right-8 md:right-12 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center text-3xl font-light shadow-2xl hover:scale-105 active:scale-95 transition-all z-50">
        +
      </Link>
    </div>
  );
}