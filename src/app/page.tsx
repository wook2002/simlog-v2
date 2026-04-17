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
    // 배경에 아주 연한 slate-50를 깔아 여백을 '공간'으로 만듭니다.
    <div className="min-h-screen bg-slate-50/50 antialiased">
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-12 pb-24">
        
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-12 lg:gap-20">
          
          {/* [왼쪽 영역] 게시물 목록 */}
          <div className="lg:col-span-3 pt-2 lg:pt-0">
            
            <div className="mb-12 pb-4 border-b border-slate-200 flex justify-between items-end">
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
              <div className="space-y-28"> 
                {posts.map((post) => (
                  <article key={post.id} className="group relative">
                    <div className="space-y-6">
                      {/* 메타 정보 */}
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
                        <p className="text-slate-600 font-medium whitespace-pre-wrap leading-relaxed max-w-2xl text-[17px]">
                          {post.description}
                        </p>
                      </div>

                      {/* 이미지: 배경색과 대비되도록 흰색 보더와 그림자 적용 */}
                      {post.image_url && (
                        <div className="w-full mt-8 rounded-[32px] overflow-hidden bg-white border border-slate-100 shadow-xl shadow-slate-200/50">
                          <img 
                            src={post.image_url} 
                            alt={post.title} 
                            className="w-full h-auto object-cover max-h-[700px] group-hover:scale-[1.02] transition-transform duration-1000 ease-in-out" 
                          />
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* [오른쪽 영역] 프로필 (모바일 하단 배치) */}
          <aside className="lg:col-span-1 border-t border-slate-200 lg:border-t-0 pt-12 lg:pt-0 mt-12 lg:mt-0">
            <div className="sticky top-16 space-y-10">
              <div className="space-y-6">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shadow-slate-900/20">
                  재
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">재욱</h3>
                  <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">AI-Native Creator</p>
                </div>
              </div>
              
              <div className="space-y-4 pt-8 border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-300 tracking-[0.3em] uppercase">Archive Links</p>
                <div className="flex flex-col space-y-3">
                  <a href="#" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors inline-flex items-center">
                    Github <span className="ml-1 text-[10px]">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>

      <Link href="/write" className="fixed bottom-10 right-10 w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center text-3xl font-light shadow-2xl hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all z-50">
        +
      </Link>
    </div>
  );
}