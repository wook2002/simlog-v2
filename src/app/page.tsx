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
    <div className="max-w-md mx-auto py-10 px-6 pb-24 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tighter italic uppercase">SIMLOG 2.0</h1>
        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest leading-relaxed">
          Archive of Moments
        </p>
      </header>

      {loading ? (
        <div className="text-center py-20 font-bold text-slate-400 animate-pulse">
          모먼트를 불러오는 중입니다... ⏳
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 font-bold text-slate-400">
          아직 기록된 모먼트가 없습니다. <br />첫 기록을 남겨보세요! 🍃
        </div>
      ) : (
        <div className="space-y-10">
          {posts.map((post) => (
            <article key={post.id} className="bg-white border-2 border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {post.image_url && (
                <div className="w-full h-72 bg-slate-100">
                  <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-blue-500 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                    {post.category || "MOMENT"}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {post.date}
                  </span>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900">{post.title}</h2>
                <p className="text-slate-600 font-medium whitespace-pre-wrap leading-relaxed">
                  {post.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      <Link href="/write" className="fixed bottom-8 right-8 md:right-[calc(50%-13rem)] w-14 h-14 bg-black text-white rounded-full flex items-center justify-center text-3xl font-light shadow-2xl hover:scale-105 active:scale-95 transition-all z-50">
        +
      </Link>
    </div>
  );
}