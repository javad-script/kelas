'use server';

import { revalidatePath } from 'next/cache';

import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

export async function uploadProfileImage(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  const userProfile = await prisma.user.findUnique({
    where: { id: user.id },
    select: { profileImage: true },
  });

  if (userProfile?.profileImage) await fs.rm(`./public${userProfile.profileImage}`);

  const file = formData.get('profileImage') as File;

  if (!file || file.size === 0) {
    throw new Error('No file uploaded');
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), 'public/uploads', fileName);

  await fs.writeFile(filePath, buffer);

  const imageUrl = `/uploads/${fileName}`;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      profileImage: imageUrl,
    },
  });
  revalidatePath('/');
  return { ok: true, message: 'عکس پروفایل با موففقییت تغییر یافت' };
}
