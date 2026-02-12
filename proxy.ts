import { NextURL } from 'next/dist/server/web/next-url';
import { NextRequest, NextResponse } from 'next/server';

import { getSession } from '@/lib/auth/session';

const protectedRoutes = ['/app'];

export default async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const session = await getSession();

  const isProtected = protectedRoutes.some((prefix) => pathname.startsWith(prefix));

  if (isProtected && !session?.userId) {
    return NextResponse.redirect(new NextURL('/login', req.url));
  }

  if (pathname === '/login' && session?.userId) {
    return NextResponse.redirect(new NextURL('/app', req.url));
  }

  return NextResponse.next();
}
