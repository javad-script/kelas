'use server';

import { revalidatePath } from 'next/cache';

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
    if (!json) return { success: false, message: 'داده‌ای ارسال نشده' };

    await delay(1000);
    const attendances = JSON.parse(json) as {
      studentId: string;
      status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
      lateMinutes?: number;
    }[];

    if (attendances.length === 0) return { success: false, message: 'هیچ دانش‌آموزی نیست' };

    const classId = formData.get('classId');

    if (typeof classId !== 'string' || !classId) {
      return { success: false, message: 'شناسه کلاس معتبر نیست' };
    }

    const user = await getCurrentUser();
    if (!user || user.role !== 'TEACHER') return { success: false, message: 'شما معلم نیستید' };
    const teacherId = user.id;

    // is this user is teacher of this class
    const classTeacher = await prisma.classTeacher.findUnique({
      where: { teacherId_classId: { teacherId, classId } },
      select: { id: true },
    });

    if (!classTeacher) return { success: false, message: 'شما معلم این کلاس نیستید' };

    // create attendance
    const attendance = await prisma.attendance.create({
      data: {
        date: new Date(),
        classId,
        classTeacherId: classTeacher.id,
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

    revalidatePath('/teacher/attendance');

    return { success: true, message: 'عملیات موفق بود' };
  } catch (err) {
    console.error(err);
    return { success: false, message: 'خطا در انجام عملیات' };
  }
}
