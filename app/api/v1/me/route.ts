import { NextRequest, NextResponse } from 'next/server';

import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const payload = await getSession();
  if (!payload?.userId) return NextResponse.redirect(new URL('/login', request.url));

  const res = await prisma.user.findUnique({ where: { id: payload.userId } });

  if (!res) return;

  const { password: _, ...user } = res;

  return NextResponse.json(user);
}
