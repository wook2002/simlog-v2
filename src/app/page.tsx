"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MinimalLandingPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5); // 최근 글 5개만 깔끔하게 노출
      if (data) setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    // max-w-2xl로 폭을 좁혀서 시선을 텍스트에 완전히 집중시킵니다.
    <div className="max-w-2xl mx-auto px-6 py-24 sm:py-32 antialiased">
      
      {/* 초-심플 헤더 */}
      <header className="mb-16 space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          재욱 (Jaeuk)
        </h1>
        <p className="text-slate-600 leading-relaxed">
          AI-Native 블로그 <span className="font-semibold text-slate-900">SIMLOG</span>를 만들고 있습니다. <br/>
          순간의 생각과 이미지들을 이곳에 단순하게 기록합니다.
        </p>
        
        <div className="pt-4 flex space-x-4 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-slate-900 transition-colors">Github</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Twitter</a>
        </div>
      </header>

      {/* 초-심플 최근 글 리스트 */}
      <main>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-semibold text-slate-900">Recent logs</h2>
          <Link href="/log" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
            View all ➔
          </Link>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.id} href="/log" className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              {/* 제목 */}
              <h3 className="text-slate-900 font-medium group-hover:underline underline-offset-4 decoration-slate-300">
                {post.title}
              </h3>
              {/* 날짜 (흐릿하게) */}
              <time className="text-sm text-slate-400 shrink-0 tabular-nums">
                {post.date}
              </time>
            </Link>
          ))}
          {posts.length === 0 && (
            <p className="text-sm text-slate-400">아직 작성된 로그가 없습니다.</p>
          )}
        </div>
      </main>

    </div>
  );
}