import { cache } from 'react';

import { cookies } from 'next/headers';

import { prisma } from '@/lib/prisma';
import { SignJWT, jwtVerify as VerifyJWT } from 'jose';
import 'server-only';

if (!process.env.SECRET) throw new Error('SECRET is not set in environment variables');

const secretKey = new TextEncoder().encode(process.env.SECRET);

const ALGORITHM = 'HS256';
const EXPIRATION = '10d';

export type SessionPayload = {
  userId: number;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(EXPIRATION)
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
  if (!user) return;
  const { password: _, ...u } = user;
  return u;
});
