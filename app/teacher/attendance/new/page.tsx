// import AttendanceClient from '@/app/teacher/attendance/new/AttendanceClient';
import AttendanceClient from '@/app/teacher/attendance/new/AttendanceClient';
import { prisma } from '@/lib/prisma';

export default async function Page() {
  const classId = 'cmlwvav5o0006dii6gavszri8';
  const teacherId = 'cmlwvav5c0004dii641rh0izc';

  // fetch students from class
  const students = (
    await prisma.studentClass.findMany({
      where: { classId },
      select: { student: { omit: { password: false } } },
    })
  ).map((s) => s.student);

  return <AttendanceClient classId={classId} teacherId={teacherId} students={students} />;
}
