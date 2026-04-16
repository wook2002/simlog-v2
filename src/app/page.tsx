import { MOCK_POSTS } from "@/constants/mockData";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-16">
      {/* 왼쪽: 글 목록 (폭포수가 흐르는 메인 영역) */}
      <section className="flex-grow space-y-2">
        <div className="divide-y divide-slate-100">
          {MOCK_POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* 오른쪽: 사이드바 (고정 정보) */}
      <Sidebar />
    </div>
  );
}