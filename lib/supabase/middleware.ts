import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

const publicRoutes = ["/login"]

export default async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    "",
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const url = request.nextUrl.clone()
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname)

  // redirect to home if logged in and trying to access a public route
  if (user && isPublicRoute) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  // redirect to login if not logged in and trying to access a private route
  if (!user && !isPublicRoute) {
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
