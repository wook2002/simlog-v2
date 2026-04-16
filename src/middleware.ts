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

  const { pathname, searchParams } = request.nextUrl

  // [상황 3 대응] 이미 로그인했는데 로그인 페이지 가려고 하면?
  if (user && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url)) // 그냥 홈으로!
  }

  // [상황 1, 2 대응] 보호된 구역 접근 체크
  const isProtectedRoute = pathname.startsWith('/write') || pathname.startsWith('/admin') // 나중에 관리자 페이지 추가 대비
  const isSiteLocked = config?.value === true

  if (!user && (isProtectedRoute || (isSiteLocked && pathname !== '/login'))) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/login'
    // 가려던 곳이 어디든 'next'라는 이름으로 기억함!
    redirectUrl.searchParams.set('next', pathname + searchParams.toString()) 
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}