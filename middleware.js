// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  if (pathname === '/experience') {
    return NextResponse.redirect(new URL('/experience/music', request.url));
  }

  return NextResponse.next();
}

// Specify the paths that should run the middleware
export const config = {
  matcher: ['/experience'],
};