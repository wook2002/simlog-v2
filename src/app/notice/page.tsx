export default function NoticePage() {
  // 나중에 Supabase에서 'type=notice'인 것만 가져올 예정
  const notices = [
    { id: 1, title: "SIMLOG V3 업데이트 안내", date: "2026.04.17" },
    { id: 2, title: "시스템 점검 공지", date: "2026.04.15" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h2 className="text-2xl font-black mb-10 border-b-4 border-black pb-4">NOTICE</h2>
      
      <div className="divide-y divide-slate-100 border-t border-slate-100">
        {notices.map((n) => (
          <div key={n.id} className="py-4 flex justify-between items-center group cursor-pointer">
            <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
              {n.title}
            </span>
            <span className="text-xs font-bold text-slate-400 tabular-nums">{n.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}