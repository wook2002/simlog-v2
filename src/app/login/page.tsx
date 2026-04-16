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
        if (!data.user) return alert("사용자를 찾을 수 없습니다.");

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_approved')
          .eq('id', data.user.id)
          .single();
        
        if (profileError) throw new Error("프로필 정보를 가져오지 못했습니다.");
        
        if (profile?.is_approved) {
          alert("로그인 성공! 이제 들어갑니다. ✨");
          
          // [중요] 3. 로그인 티켓(쿠키)을 브라우저와 서버에 강제로 동기화합니다.
          router.refresh(); 
          
          // 잠시(0.5초) 기다렸다가 홈으로 이동
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
        } else {
          await supabase.auth.signOut();
          alert("아직 재욱(관리자)님의 승인이 완료되지 않았습니다. ✋");
        }
      }
    } catch (error: any) {
      alert(`에러 발생: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tighter italic uppercase">Members Only</h1>
        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest leading-relaxed">
          {isSignUp ? "Join the secret archive" : "Authorized Access Required"}
        </p>
      </div>

      <div className="space-y-4">
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none focus:border-black font-bold transition" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none focus:border-black font-bold transition" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>

      <button onClick={handleAuth} className="w-full bg-black text-white py-5 rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all">
        {isSignUp ? "가입 신청하기" : "비밀의 문 열기 🔑"}
      </button>

      <p onClick={() => setIsSignUp(!isSignUp)} className="text-center text-sm font-bold text-slate-400 cursor-pointer hover:text-black transition">
        {isSignUp ? "이미 회원이신가요? 로그인" : "처음이신가요? 가입 신청하기"}
      </p>
    </div>
  );
}