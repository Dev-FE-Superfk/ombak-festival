import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // // Cek jika URL-nya adalah root (ombakfestival.com)
  // if (pathname === '/') {
  //   // Redirect ke /thankyou
  //   return NextResponse.redirect(new URL('/thankyou?tag=main_stage', req.url));
  // }

  // if(pathname !== '/thankyou'){
  //   return NextResponse.redirect(new URL('/thankyou?tag=main_stage', req.url));
  // }

  // Jika bukan root, lanjutkan request seperti biasa
  return NextResponse.next();
}

// Tentukan route mana yang harus menggunakan middleware
export const config = {
  matcher: ['/', '/stay', '/experience', '/contact-us', '/festival-map', '/get-tickets', '/golf', '/info', '/privacy-statement', '/schedule', '/sustainability', '/terms' ],
};
