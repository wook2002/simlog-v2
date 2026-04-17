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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* 왼쪽: 게시물 목록 (2칸 차지) */}
        <div className="md:col-span-2 space-y-16">
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
                  {/* 카테고리 & 날짜 (기존 Devlog 감성) */}
                  <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <span className="text-blue-500">{post.category || "MOMENT"}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  
                  {/* 제목 */}
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  {/* 내용 */}
                  <p className="text-slate-600 font-medium whitespace-pre-wrap leading-relaxed">
                    {post.description}
                  </p>

                  {/* 태그 */}
                  <div className="flex space-x-2 pt-1 pb-4">
                    <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">#{post.category || "Moment"}</span>
                  </div>
                  
                  {/* 이미지 (있을 경우에만 크게 렌더링) */}
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

        {/* 오른쪽: 프로필 사이드바 (1칸 차지) */}
        <aside className="md:col-span-1">
          <div className="sticky top-10 space-y-6">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-black">
              재
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">재욱</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">AI-Native 블로그</p>
            </div>
            <div className="space-y-2 pt-4 border-t-2 border-slate-50">
              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">Links</p>
              <a href="#" className="block text-sm font-bold text-slate-600 hover:text-black transition-colors">Github</a>
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