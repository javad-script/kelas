'use server';

import { revalidatePath } from 'next/cache';

import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import z from 'zod';

const ReportSchema = z.object({
  note: z.string().max(255),
  category: z.enum(['REWARD', 'DISCIPLINE']),
  reason: z.string(),
  date: z.preprocess((arg) => {
    // Added preprocessing for date
    if (typeof arg === 'string' || arg instanceof Date) {
      return new Date(arg);
    }
  }, z.date()),
});

export default async function saveReport(prevState: any, formData: FormData) {
  const teacher = await getCurrentUser();
  const note = formData.get('note');
  const category = formData.get('category');
  const reason = formData.get('reason');
  const date = formData.get('date');
  try {
    const validatedData = ReportSchema.parse({ note, category, reason, date });
    console.log(validatedData);
    const createdReport = await prisma.report.create({
      data: {
        teacherId: teacher?.id as string,
        note: validatedData.note,
        date: validatedData.date,
        category: validatedData.category,
        reason: validatedData.reason,
      },
    });
    revalidatePath('/');
    return { ok: true, message: 'created successfully', data: createdReport };
  } catch {
    return { ok: false, message: 'false' };
  }
}
