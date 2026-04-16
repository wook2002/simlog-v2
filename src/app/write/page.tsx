"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async () => {
    if (!title || !description) return alert("제목과 내용을 모두 입력해주세요!");
    setLoading(true);

    // Supabase 'posts' 테이블에 데이터 저장 시도
    const { error } = await supabase
      .from("posts")
      .insert([
        { 
          title, 
          description, 
          category: "MOMENT", 
          date: new Date().toISOString().split('T')[0] 
        }
      ]);

    if (error) {
      console.error(error);
      alert("전송 실패! (아직 창고에 'posts' 상자를 안 만들어서 그럴 거예요)");
    } else {
      alert("성공적으로 기록되었습니다! ✨");
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto space-y-8 py-10">
      <h2 className="text-3xl font-black tracking-tighter text-center">CAPTURE MOMENT</h2>
      
      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="제목 (예: 오늘 본 좋은 글귀)" 
          className="w-full p-4 border-2 border-slate-100 rounded-2xl focus:border-black outline-none transition font-bold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          placeholder="나누고 싶은 내용을 적어주세요..." 
          rows={8}
          className="w-full p-4 border-2 border-slate-100 rounded-2xl focus:border-black outline-none transition font-medium"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button 
        onClick={handleUpload}
        disabled={loading}
        className="w-full bg-black text-white py-5 rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all disabled:bg-slate-300"
      >
        {loading ? "보내는 중..." : "기록하기 🚀"}
      </button>
    </div>
  );
}