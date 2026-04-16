"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation"; // 1. 추가

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter(); // 2. 추가

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("가입 신청 완료! 재욱님의 승인을 기다려주세요.");
      } else {
        const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
        if (loginError) throw loginError;

        const { data: profile } = await supabase
          .from('profiles')
          .select('is_approved')
          .eq('id', data.user.id)
          .single();
        
        if (profile?.is_approved) {
          alert("로그인 성공! ✨");
          
          // [중요] 3. 티켓(쿠키)을 문지기에게 업데이트 시킵니다.
          router.refresh(); 
          
          // 0.5초 뒤에 홈으로 이동
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
        } else {
          await supabase.auth.signOut();
          alert("아직 승인이 안 되었습니다. ✋");
        }
      }
    } catch (error: any) {
      alert(`에러: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-6 space-y-8">
      <h1 className="text-4xl font-black text-center italic">MEMBERS ONLY</h1>
      <div className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-4 border-2 rounded-2xl font-bold" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-4 border-2 rounded-2xl font-bold" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleAuth} className="w-full bg-black text-white py-5 rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all">
        {isSignUp ? "가입 신청" : "비밀의 문 열기 🔑"}
      </button>
      <p onClick={() => setIsSignUp(!isSignUp)} className="text-center text-sm font-bold text-slate-400 cursor-pointer">
        {isSignUp ? "로그인하러 가기" : "가입 신청하기"}
      </p>
    </div>
  );
}