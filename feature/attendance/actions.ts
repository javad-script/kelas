'use server';

import { revalidatePath } from 'next/cache';

import { StudentStatus } from '@/feature/attendance/types';
import { getCurrentUser } from '@/lib/auth/session';
import { Attendance } from '@/lib/generated/prisma/client';
import { prisma } from '@/lib/prisma';

type ActionResponse = {
  success: boolean;
  message: string;
};

export async function saveAttendanceAction(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'TEACHER') return { success: false, message: 'شما معلم نیستید' };

    const json = formData.get('attendances_json') as string | null;
    const lessonClassId = formData.get('lessonClassId') as string | null;
    const period = formData.get('period') as string | null;
    const dateString = formData.get('date') as string | null;

    if (!json) return fail('داده‌ای ارسال نشده');
    if (!lessonClassId) return fail('شناسه درس معتبر نیست');
    if (!period) return fail('شماره زنگ معتبر نیست');
    if (!dateString) return fail('تاریخ معتبر نیست');

    const date = new Date(dateString);
    const attendances: StudentStatus[] = JSON.parse(json);
    if (attendances.length === 0) return fail('هیچ دانش‌آموزی نیست');

    const lessonClass = await prisma.lessonClass.findUnique({
      where: { id: Number(lessonClassId) },
      include: { class: true, teacher: true },
    });

    if (!lessonClass || lessonClass.teacherId !== user.id) return fail('شما معلم این درس نیستید');

    const attendance = await prisma.attendance.findFirst({
      where: {
        date,
        classId: lessonClass.classId,
        lessonClassId: Number(lessonClassId),
        schoolPeriod: Number(period),
      },
    });

    if (!attendance) {
      const newAttendance = await createAttendance({
        date,
        lessonClassId: Number(lessonClassId),
        classId: lessonClass.classId,
        teacherId: user.id,
        schoolPeriod: Number(period),
      });
      await createStudentAttendances(attendances, newAttendance.id);
      revalidatePath('/teacher/attendance');
      return ok('دفتر حضور و غیاب ثبت شد');
    }

    await updateStudentAttendances(attendances, attendance);
    revalidatePath('/teacher/attendance');
    return ok('دفتر حضور و غیاب به روزرسانی شد');
  } catch (error) {
    console.error('[saveAttendanceAction]', error);
    return fail('خطا در انجام عملیات');
  }
}

// ── Helpers ──────────────────────────────────────────────
function fail(message: string): ActionResponse {
  return { success: false, message };
}
function ok(message: string): ActionResponse {
  return { success: true, message };
}

// ── DB functions ─────────────────────────────────────────
async function createStudentAttendances(attendances: StudentStatus[], attendanceId: string) {
  await prisma.attendanceStudent.createMany({
    data: attendances.map(({ student, userStatus, lateMinutes }) => ({
      attendanceId,
      studentId: student.id,
      status: 'QERMOVAJAH', // maybe derive dynamically later
      userStatus,
      lateMinutes: lateMinutes ?? null,
    })),
  });
}

async function updateStudentAttendances(attendances: StudentStatus[], attendance: Attendance) {
  const attendanceMap = Object.fromEntries(attendances.map((a) => [a.student.id, a.userStatus]));

  const prevStatuses = await prisma.attendanceStudent.findMany({
    where: { attendanceId: attendance.id },
  });

  const changed = prevStatuses.filter(
    (s) => attendanceMap[s.studentId] && attendanceMap[s.studentId] !== s.userStatus,
  );

  await Promise.all(
    changed.map((s) =>
      prisma.attendanceStudent.update({
        where: { attendanceId_studentId: { attendanceId: attendance.id, studentId: s.studentId } },
        data: { userStatus: attendanceMap[s.studentId] },
      }),
    ),
  );
}

async function createAttendance({
  date,
  lessonClassId,
  teacherId,
  schoolPeriod,
  classId,
}: {
  date: Date;
  lessonClassId: number;
  teacherId: string;
  schoolPeriod: number;
  classId: string;
}) {
  return prisma.attendance.create({
    data: { date, classId, teacherId, lessonClassId, schoolPeriod },
  });
}
