import { SITE_CONFIG } from "@/constants/siteConfig";

export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 space-y-8">
      {/* 프로필 섹션 */}
      <div className="space-y-4">
        <div className="h-16 w-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl font-black">
          {SITE_CONFIG.author[0]}
        </div>
        <div>
          <h2 className="text-xl font-black tracking-tighter">{SITE_CONFIG.author}</h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed mt-1">
            {SITE_CONFIG.description}
          </p>
        </div>
      </div>

      {/* 카테고리/링크 섹션 */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Links</h3>
        <ul className="space-y-2 text-sm font-bold">
          <li>
            <a href={SITE_CONFIG.links.github} className="text-slate-600 hover:text-black transition">
              Github
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}