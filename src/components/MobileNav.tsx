"use client";

export default function MobileNav() {
  return (
    <div className="fixed bottom-8 right-8 z-50 md:hidden">
      <button 
        onClick={() => alert('업로드 페이지 준비 중! Supabase 연결 후 바로 뚫어드릴게요.')}
        className="h-16 w-16 bg-black text-white rounded-full shadow-2xl flex items-center justify-center text-4xl font-light active:scale-95 transition-transform"
      >
        +
      </button>
    </div>
  );
}