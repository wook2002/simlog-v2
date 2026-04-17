import Link from "next/link";

export default function LandingPage() {
  return (
    // 화면 중앙에 떡하니 배치되도록 min-h-[80vh] 적용
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center space-y-12">
      
      <div className="space-y-4 cursor-default">
        {/* 거대한 타이틀 */}
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter italic uppercase text-slate-900 drop-shadow-sm transition-all hover:scale-105 duration-500">
          SIMLOG<span className="text-blue-500">.</span>
        </h1>
        {/* 서브 타이틀 */}
        <p className="text-sm md:text-base font-black uppercase tracking-[0.4em] text-slate-400">
          AI-Native Archive of Moments
        </p>
      </div>

      {/* 안방(게시판)으로 들어가는 힙한 버튼 */}
      <Link 
        href="/log" 
        className="group flex items-center space-x-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-2xl"
      >
        <span>ENTER THE LOG</span>
        <span className="group-hover:translate-x-1.5 transition-transform duration-300">
          ➔
        </span>
      </Link>

    </div>
  );
}