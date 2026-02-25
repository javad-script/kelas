import { NextRequest, NextResponse } from 'next/server';

import { getSession } from '@/lib/auth/session';

export default async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const session = await getSession();

  if (pathname === '/login' && session?.userId) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
