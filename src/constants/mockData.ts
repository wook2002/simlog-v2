import { Post } from "../types";

export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "심로그 2.0: AI-Native 블로그의 탄생",
    date: "2026-04-16",
    description: "왜 기존 블로그를 버리고 Next.js와 Cloudflare로 다시 시작했는가에 대한 기록입니다.",
    category: "Devlog",
    tags: ["Next.js", "AI", "Cloudflare"],
  },
  {
    id: "2",
    title: "폭포수 모델로 개발하는 이유",
    date: "2026-04-15",
    description: "인공지능과 협업할 때 가장 효율적인 개발 프로세스는 무엇일까요? 구조가 중요한 이유를 설명합니다.",
    category: "Thought",
    tags: ["Development", "AI-native"],
  },
];