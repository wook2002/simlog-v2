"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LandingPage() {
  const [latestPost, setLatestPost] = useState<any>(null);

  useEffect(() => {
    // 가장 최신 글 딱 하나만 가져오기
    const fetchLatest = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      if (data) setLatestPost(data);
    };
    fetchLatest();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-24">
      
      {/* Section 1: Hero (압도적인 타이틀과 소개) */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter italic leading-none text-slate-900">
            SIMLOG<span className="text-blue-600">.</span>
          </h1>
          <p className="text-lg md:text-2xl font-bold text-slate-400 max-w-lg leading-tight uppercase tracking-tighter">
            Archive of my moments, <br/>captured with AI.
          </p>
        </div>
        
        {/* 이동 버튼을 더 힙하게 변경 */}
        <Link 
          href="/log" 
          className="inline-flex items-center space-x-4 group"
        >
          <div className="bg-black text-white px-8 py-4 rounded-full font-black text-xl group-hover:bg-blue-600 transition-all shadow-xl">
            ENTER THE LOG ➔
          </div>
        </Link>
      </section>

      {/* Section 2: Featured (최신 글 맛보기) */}
      {latestPost && (
        <section className="space-y-6 pt-10 border-t-4 border-slate-900">
          <div className="flex justify-between items-end">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Featured Moment</h2>
            <Link href="/log" className="text-xs font-black uppercase border-b-2 border-black pb-1">View All</Link>
          </div>
          
          <Link href="/log" className="group block space-y-6">
            <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-100 shadow-2xl">
              <img 
                src={latestPost.image_url} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Latest"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none group-hover:text-blue-600 transition-colors">
                {latestPost.title}
              </h3>
              <p className="text-xl text-slate-500 font-medium line-clamp-2 max-w-2xl">
                {latestPost.description}
              </p>
            </div>
          </Link>
        </section>
      )}

      {/* Section 3: Simple Footer */}
      <footer className="pt-20 text-xs font-bold text-slate-300 uppercase tracking-widest text-center">
        © 2026 Simlog. Built with Passion.
      </footer>
    </div>
  );
}