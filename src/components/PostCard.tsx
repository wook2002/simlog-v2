import { Post } from "@/types";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group cursor-pointer py-8 border-b border-slate-100 last:border-0">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <span>{post.category}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>
        
        <h3 className="text-2xl font-black tracking-tighter group-hover:text-blue-600 transition">
          {post.title}
        </h3>
        
        <p className="text-slate-500 leading-relaxed font-medium">
          {post.description}
        </p>

        <div className="flex gap-2 pt-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}