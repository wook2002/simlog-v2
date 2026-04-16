import { createBrowserClient } from '@supabase/ssr'

// createClient 대신 createBrowserClient를 써야 
// 로그인을 했을 때 '쿠키'가 자동으로 구워져서 문지기가 알아봅니다.
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)