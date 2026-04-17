"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async () => {
    if (!title || !description) return alert("제목과 내용은 꼭 입력해주세요!");
    setLoading(true);

    try {
      let finalImageUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"; 

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('posts')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('posts')
          .getPublicUrl(fileName);
        
        finalImageUrl = publicUrl; 
      }

      const { error: dbError } = await supabase
        .from("posts")
        .insert([{ 
          title, 
          description, 
          image_url: finalImageUrl, 
          category: "MOMENT", 
          date: new Date().toISOString().split('T')[0] 
        }]);

      if (dbError) throw dbError;

      alert("모먼트 캡처 성공! ✨");
      router.push("/");
      router.refresh();
    } catch (err: any) {
      alert(`실패: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8 py-10 px-6">
      <h2 className="text-3xl font-black tracking-tighter text-center italic">CAPTURE MOMENT</h2>
      
      <div className="space-y-4">
        <label className="block w-full h-40 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-black transition">
          {file ? (
            <span className="font-bold text-blue-500">📸 {file.name} 선택됨</span>
          ) : (
            <span className="text-slate-400 font-bold">여기를 눌러 사진 선택 (선택 안하면 기본 이미지)</span>
          )}
          <input type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </label>

        <input type="text" placeholder="제목 (필수)" className="w-full p-4 border-2 border-slate-100 rounded-2xl focus:border-black outline-none font-bold" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="내용을 입력하세요... (필수)" rows={6} className="w-full p-4 border-2 border-slate-100 rounded-2xl focus:border-black outline-none font-medium" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <button onClick={handleUpload} disabled={loading} className="w-full bg-black text-white py-5 rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all disabled:bg-slate-300">
        {loading ? "기록 중..." : "기록하기 🚀"}
      </button>
    </div>
  );
}