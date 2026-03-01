'use server';

import { revalidatePath } from 'next/cache';

import { StudentStatus } from '@/feature/attendance/types';
import { getCurrentUser } from '@/lib/auth/session';
import { delay } from '@/lib/helpers';
import { prisma } from '@/lib/prisma';

type ActionResponse = {
  success: boolean;
  message: string;
};

export async function saveAttendanceAction(
  prevState: any,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const json = formData.get('attendances_json') as string | null;
    const lessonClassId = formData.get('lessonClassId');
    const user = await getCurrentUser();

    if (!json) return { success: false, message: 'داده‌ای ارسال نشده' };

    if (typeof lessonClassId !== 'string' || !lessonClassId) {
      return { success: false, message: 'شناسه درس معتبر نیست' };
    }

    const attendances = JSON.parse(json) as StudentStatus[];

    if (attendances.length === 0) return { success: false, message: 'هیچ دانش‌آموزی نیست' };

    if (!user || user.role !== 'TEACHER') return { success: false, message: 'شما معلم نیستید' };
    const teacherId = user.id;
    const lessonClass = await prisma.lessonClass.findUnique({
      where: { id: Number(lessonClassId) },
      include: { class: true, teacher: true },
    });
    // is this user is teacher of this lesson
    if (teacherId !== lessonClass?.teacherId)
      return { success: false, message: 'شما معلم این درس نیستید' };

    // create attendance
    const attendance = await prisma.attendance.create({
      data: {
        date: new Date(),
        classId: lessonClass.classId,
        lessonClassId: Number(lessonClassId),
      },
    });

    // create attendance for each student
    await prisma.attendanceStudent.createMany({
      data: attendances.map((item) => ({
        attendanceId: attendance.id,
        studentId: item.studentId,
        status: item.status,
        lateMinutes: item.lateMinutes ?? null,
      })),
    });

    // TODO : remove line blow
    delay(1000);

    revalidatePath('/teacher/attendance');

    return { success: true, message: 'عملیات موفق بود' };
  } catch (err) {
    console.error(err);
    return { success: false, message: 'خطا در انجام عملیات' };
  }
}
