import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 일반적인 상황(글 보기, 사진 보기)에서 쓰는 '안전한' 매니저
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 나중에 글을 강제로 지우거나 특별한 권한이 필요할 때만 쓸 '비밀' 매니저
// (이건 절대 'use client' 파일에서 부르면 안 됩니다!)
export const getServiceSupabase = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, serviceKey)
}