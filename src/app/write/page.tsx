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
    if (!title || !description || !file) return alert("제목, 내용, 사진을 모두 등록해주세요!");
    setLoading(true);

    try {
      // 1. 이미지 창고(Storage)에 파일 업로드
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('posts')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. 업로드된 이미지의 공개 URL 가져오기
      const { data: { publicUrl } } = supabase.storage
        .from('posts')
        .getPublicUrl(fileName);

      // 3. DB(posts 테이블)에 글 정보와 이미지 주소 저장
      const { error: dbError } = await supabase
        .from("posts")
        .insert([{ 
          title, 
          description, 
          image_url: publicUrl, // 이미지 주소 저장!
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
        {/* 사진 선택 구역 */}
        <label className="block w-full h-40 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-black transition">
          {file ? (
            <span className="font-bold text-blue-500">📸 {file.name} 선택됨</span>
          ) : (
            <span className="text-slate-400 font-bold">여기를 눌러 사진 선택</span>
          )}
          <input type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </label>

        <input type="text" placeholder="제목" className="w-full p-4 border-2 border-slate-100 rounded-2xl focus:border-black outline-none font-bold" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="내용을 입력하세요..." rows={6} className="w-full p-4 border-2 border-slate-100 rounded-2xl focus:border-black outline-none font-medium" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <button onClick={handleUpload} disabled={loading} className="w-full bg-black text-white py-5 rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all disabled:bg-slate-300">
        {loading ? "창고로 쏘는 중..." : "기록하기 🚀"}
      </button>
    </div>
  );
}