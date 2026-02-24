'use server';
import { prisma } from '@/lib/prisma';
import { SaveAttendanceInput } from '@/types/attendance';

export async function saveAttendanceAction({
  classId,
  teacherId,
  studentStatuses,
}: SaveAttendanceInput) {
  // پیدا کردن یا ساختن ClassTeacher
  const classTeacher = await prisma.classTeacher.findFirst({
    where: { teacherId, classId },
  });
  if (!classTeacher) throw new Error('you are not teacher of this class');

  // if (!classTeacher) {
  //   classTeacher = await prisma.classTeacher.create({
  //     data: { teacherId, classId },
  //   });
  // }

  // ایجاد Attendance
  await prisma.attendance.create({
    data: {
      date: new Date(),
      classId,
      classTeacherId: classTeacher.id,
      students: { create: studentStatuses },
    },
  });
}
