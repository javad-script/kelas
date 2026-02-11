import { NextURL } from 'next/dist/server/web/next-url';
import { NextRequest, NextResponse } from 'next/server';

import { getSession } from '@/lib/auth/session';

const protectedRoutes = ['/app'];

export default async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isProtected = protectedRoutes.some(
    (prefix) => pathname.startsWith(prefix) || pathname === prefix,
  );

  const session = await getSession();

  if (isProtected && !session?.userId) {
    return NextResponse.redirect(new NextURL('/login', req.url));
  }

  if (pathname.includes('/login') && session?.userId) {
    return NextResponse.redirect(new NextURL('/app', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request pathnames except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - public files (public/)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
    // Or more specific if you want less overhead:
    '/login',
  ],
};
