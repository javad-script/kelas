import { redirect } from 'next/navigation';

import AttendanceClient from '@/feature/attendance/components/AttendanceClient';
import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

type Props = {
  searchParams: Promise<{ date?: string; lessonClassId: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { lessonClassId } = await searchParams;
  const teacher = await getCurrentUser();

  if (!teacher?.id || !lessonClassId) redirect('./');

  const lesson = await prisma.lessonClass.findUnique({ where: { id: Number(lessonClassId) } });

  if (!lesson || teacher.id !== lesson.teacherId) redirect('./');

  const students = (
    await prisma.studentClass.findMany({
      where: { classId: lesson.classId },
      include: {
        student: { omit: { password: false } },
      },
    })
  ).map((s) => s.student);

  //  const saveAttendance = async (statuses: StudentStatus[]) => {
  //   await saveAttendanceAction({ classId, teacherId: teacher.id, studentStatuses: statuses });
  //   alert('Attendance saved!');
  // };

  return <AttendanceClient students={students} lessonClassId={lessonClassId} />;
}
