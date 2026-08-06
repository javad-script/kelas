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
  students: z.array(z.string()),
});

export default async function saveReport(prevState: any, formData: FormData) {
  const teacher = await getCurrentUser();
  const note = formData.get('note');
  const category = formData.get('category');
  const reason = formData.get('reason');
  const date = formData.get('date');
  const students = JSON.parse((formData.get('students') as string) ?? []);
  try {
    const validatedData = ReportSchema.parse({ note, category, reason, date, students });
    if (validatedData.students.length <= 1) {
      return { ok: false, message: 'باید حداقل یک دانش آموز را انتخواب کنید' };
    }
    const createdReport = await prisma.report.create({
      data: {
        teacherId: teacher?.id as string,
        note: validatedData.note,
        date: validatedData.date,
        category: validatedData.category,
        reason: validatedData.reason,
      },
    });
    validatedData.students.map(async (id) => {
      await prisma.reportStudent.create({
        data: { reportId: createdReport.id, studentId: id },
      });
    });
    revalidatePath('/');
    return { ok: true, message: 'با موفقییت ثبت شد', data: createdReport };
  } catch {
    return { ok: false, message: 'false' };
  }
}
