"use client";
import Link from "next/link";

export default function MobileNav() {
  return (
    <div className="fixed bottom-8 right-8 z-50 md:hidden">
      <Link href="/write">
        <button className="h-16 w-16 bg-black text-white rounded-full shadow-2xl flex items-center justify-center text-4xl font-light active:scale-95 transition-transform">
          +
        </button>
      </Link>
    </div>
  );
}