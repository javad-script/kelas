'use server';

import { redirect } from 'next/navigation';

import { createSession, deleteSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { delay } from '@/lib/utils';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

const loginSchema = z.object({
  username: z.string().min(3, 'نام کاربری حداقل ۳ کاراکتر').trim(),
  password: z
    .string()
    .min(8, 'رمز عبور حداقل ۸ کاراکتر')
    .max(32, 'رمز عبور حداکثر ۳۲ کاراکتر')
    .trim(),
  // .regex(/[A-Z]/, 'حداقل یک حرف بزرگ لاتین')
  // .regex(/[a-z]/, 'حداقل یک حرف کوچک لاتین')
  // .regex(/[0-9]/, 'حداقل یک عدد'),
  // .regex(/[\!\@\#\$\%\^\&\*]/),
});

interface LoginState {
  data?: object;
  success?: boolean;
  errors?: {
    username?: string[];
    password?: string[];
    _form?: string[];
  };
}

export async function login(ـ: unknown, formData: FormData): Promise<LoginState | undefined> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { username, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { username } });

  // TODO: remove line blow
  await delay(3000);

  if (!user) {
    return { errors: { _form: ['نام کاربری اشتباه است'] } };
  }

  const isPassValid = await bcrypt.compare(password, user.password);

  if (!isPassValid) {
    return { errors: { _form: ['رمز عبور اشتباه است'] } };
  }

  const session = await createSession(user.id);

  if (!session.success) {
    return { errors: { _form: ['عملیات ورود نا موفق بود'] } };
  }

  return { success: true };
}

export async function logout() {
  // TODO: remove line blow
  await delay(2000);
  await deleteSession();
  redirect('/login');
}
