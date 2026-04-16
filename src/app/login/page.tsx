"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    if (isSignUp) {
      // 회원가입
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else alert("가입 신청 완료! 재욱님의 승인을 기다려주세요.");
    } else {
      // 로그인 시도
      const { data: { user } } = await supabase.auth.signInWithPassword({ email, password });
      if (!user) return alert("로그인 실패! 이메일/비번 확인.");

      // 승인 여부 확인
      const { data: profile } = await supabase.from('profiles').select('is_approved').eq('id', user.id).single();
      
      if (profile?.is_approved) {
        window.location.href = "/"; // 승인됐으면 홈으로!
      } else {
        await supabase.auth.signOut();
        alert("아직 재욱님의 승인이 떨어지지 않았습니다. ✋");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tighter italic">MEMBERS ONLY</h1>
        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Authorized Access Required</p>
      </div>

      <div className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none focus:border-black font-bold" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none focus:border-black font-bold" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button onClick={handleAuth} className="w-full bg-black text-white py-5 rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all">
        {isSignUp ? "가입 신청하기" : "비밀의 문 열기 🔑"}
      </button>

      <p onClick={() => setIsSignUp(!isSignUp)} className="text-center text-sm font-bold text-slate-400 cursor-pointer hover:text-black">
        {isSignUp ? "이미 회원이신가요? 로그인" : "처음이신가요? 가입 신청하기"}
      </p>
    </div>
  );
}