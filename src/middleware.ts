import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: config } = await supabase.from('site_config').select('value').eq('key', 'is_private').single()
  const { data: { user } } = await supabase.auth.getUser()

  // 로그인 안 된 사람이 보호된 페이지(글쓰기 등)나 잠긴 홈에 가려고 할 때
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/write')
  const isSiteLocked = config?.value === true

  if (!user && (isProtectedRoute || (isSiteLocked && request.nextUrl.pathname !== '/login'))) {
    // [핵심] 가려던 주소를 'next'라는 이름으로 들고 로그인 페이지로 갑니다.
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set('next', request.nextUrl.pathname) 
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}