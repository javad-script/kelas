import { cache } from 'react';

import { cookies } from 'next/headers';

import environment from '@/lib/environment';
import { prisma } from '@/lib/prisma';
import { SignJWT, jwtVerify as VerifyJWT } from 'jose';
import 'server-only';

const secretKey = new TextEncoder().encode(environment.SECRET_KEY);

const ALGORITHM = 'HS256';
const EXPIRATION = 10;

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(EXPIRATION + 'd')
    .sign(secretKey);
}

export async function decrypt(token: string | undefined): Promise<SessionPayload | undefined> {
  if (!token) return;
  try {
    const { payload } = await VerifyJWT<SessionPayload>(token, secretKey, {
      algorithms: [ALGORITHM],
    });

    return payload;
  } catch {
    return;
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + EXPIRATION * 24 * 60 * 60 * 1000);
  const token = await encrypt({ userId, expiresAt });

  if (!token) return { success: false };

  (await cookies()).set('user_session', token, {
    secure: environment.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });

  return { success: true };
}

export async function deleteSession() {
  (await cookies()).delete('user_session');
}

export async function getSession() {
  const token = (await cookies()).get('user_session')?.value;
  if (!token) return;
  return await decrypt(token);
}

export const getCurrentUser = cache(async () => {
  const payload = await getSession();
  if (!payload?.userId) return;
  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) {
    await deleteSession();
    return;
  }
  const { password: _, ...u } = user;
  return u;
});
