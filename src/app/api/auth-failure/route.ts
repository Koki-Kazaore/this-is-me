import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.clone()
  url.pathname = '/'

  // Returns 401 status code and redirects to home page after a few seconds
  return new NextResponse('Access denied', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
      'Refresh': '1;url=' + url.toString(),
      'Pragma': 'no-cache',
    },
  })
}
