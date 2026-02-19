'use server';

import { revalidatePath } from 'next/cache';

import { getCurrentUser } from '@/lib/auth/session';
import { delay } from '@/lib/helpers';
import { prisma } from '@/lib/prisma';

export default async function editUserData(formData: FormData) {
  const user = await getCurrentUser();
  if (!user?.id) return { ok: false, message: 'درخواست با مشکل مواجه شد' };

  await delay(2000);
  const data = Object.fromEntries(formData.entries());
  await prisma.user.update({
    where: { id: user.id },
    data: {
      firstName: data.firstName as string,
      lastName: data.lastName as string,
      nationalCode: data.nationalCode as string,
      housePhone: data.housePhone as string,
      email: data.email as string,
      phone: data.phone as string,
      emergencyPhone: data.emergencyPhone as string,
      birthDate: data.birthDate as string,
      address: data.address as string,

      fatherEmail: data.fatherEmail as string,
      fatherJob: data.fatherJob as string,
      fatherJobAddress: data.fatherJobAddress as string,
      fatherJobPhone: data.fatherJobPhone as string,
      fatherPhone: data.fatherPhone as string,

      motherEmail: data.motherEmail as string,
      motherJob: data.motherJob as string,
      motherJobAddress: data.motherJobAddress as string,
      motherJobPhone: data.motherJobPhone as string,
      motherPhone: data.motherPhone as string,
    },
  });
  revalidatePath('/');
  return { ok: true, message: 'اطلاعات شما با موففقییت به روزرسانی شد' };
}
