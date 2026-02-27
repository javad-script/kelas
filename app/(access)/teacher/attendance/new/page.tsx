import { redirect } from 'next/navigation';

import AttendanceClient from '@/feature/attendance/components/AttendanceClient';
import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

type Props = {
  searchParams: Promise<{ classId?: string; date?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { classId } = await searchParams;
  const teacher = await getCurrentUser();

  if (!teacher?.id || !classId) redirect('./');

  const students = (
    await prisma.studentClass.findMany({
      where: { classId: classId },
      include: {
        student: { omit: { password: false } },
      },
    })
  ).map((s) => s.student);

  //  const saveAttendance = async (statuses: StudentStatus[]) => {
  //   await saveAttendanceAction({ classId, teacherId: teacher.id, studentStatuses: statuses });
  //   alert('Attendance saved!');
  // };

  return <AttendanceClient students={students} classId={classId} />;
}
