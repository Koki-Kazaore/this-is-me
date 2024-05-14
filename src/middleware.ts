import { NextRequest, NextResponse } from 'next/server'

// Define middleware functions; receive NextRequest objects
export function middleware(req: NextRequest) {
    // Get authorization from request header
    const basicAuth = req.headers.get('authorization')
    
    if (basicAuth) {
        // Decode Basic Authentication value to get username and password
        const authValue = basicAuth.split(' ')[1]
        const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':')

        // If it matches the value of the environment variable, the request proceeds to the next process
        if (user === process.env.BASIC_AUTH_USER && pwd === process.env.BASIC_AUTH_PASS) {
            return NextResponse.next()
        }
  }

  // If authentication fails, returns 401 status code and then redirects to home page
  const url = req.nextUrl.clone()
  url.pathname = '/api/auth-failure'
  return NextResponse.rewrite(url)
}

// Middleware configuration;
// apply this middleware in the blog root ('/blog')
export const config = {
  matcher: ['/blog/:path*'],
}
