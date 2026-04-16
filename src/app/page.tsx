import { MOCK_POSTS } from "@/constants/mockData";
import PostCard from "@/components/PostCard";

export default function Home() {
  return (
    <section className="max-w-2xl mx-auto">
      <div className="flex flex-col">
        {MOCK_POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* 나중에 글이 많아지면 보여줄 빈 공간 */}
      <div className="mt-20 py-10 border-t border-slate-50 text-center">
        <p className="text-sm text-slate-300 font-bold tracking-widest uppercase">
          End of Line
        </p>
      </div>
    </section>
  );
}