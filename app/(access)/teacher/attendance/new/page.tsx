import { redirect } from 'next/navigation';

import AttendanceClient from '@/feature/teacher/attendance/components/AttendanceClient';
import { getCurrentUser } from '@/lib/auth/session';
import { User } from '@/lib/generated/prisma/client';
import { UserAttendanceStatus } from '@/lib/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { Pick } from '@prisma/client/runtime/client';

type Props = {
  searchParams: Promise<{ date: string; lessonClassId: string; schoolPeriod: string }>;
};
type AttendanceStatuses = {
  student: Pick<User, 'firstName' | 'lastName' | 'profileImage' | 'id'>;
  userStatus: UserAttendanceStatus;
  lateMinutes: number | null;
};

export default async function Page({ searchParams }: Props) {
  const { lessonClassId, date: stringDate, schoolPeriod } = await searchParams;
  const dateWithTime = new Date(stringDate);
  const period = Number(schoolPeriod);
  const teacher = await getCurrentUser();

  if (!teacher?.id || !lessonClassId) redirect('./');

  const lesson = await prisma.lessonClass.findUnique({ where: { id: Number(lessonClassId) } });

  if (!lesson || teacher.id !== lesson.teacherId) redirect('./');
  const [year, month, day] = [
    dateWithTime.getUTCFullYear(),
    dateWithTime.getUTCMonth(),
    dateWithTime.getUTCDate(),
  ];
  const date = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

  const attendance = await prisma.attendance.findFirst({
    where: {
      lessonClassId: lesson.id,
      classId: lesson.classId,
      date: date,
      schoolPeriod: period,
    },
    include: {
      students: {
        include: {
          student: { select: { firstName: true, lastName: true, profileImage: true, id: true } },
        },
      },
    },
  });

  let attendanceStudentsStatuses: AttendanceStatuses[] | undefined = attendance?.students;

  if (!attendanceStudentsStatuses) {
    const students = (
      await prisma.studentClass.findMany({
        where: { classId: lesson.classId },
        include: {
          student: { select: { firstName: true, lastName: true, profileImage: true, id: true } },
        },
      })
    ).map((s) => s.student);
    attendanceStudentsStatuses = students.map((s) => {
      return {
        student: s,
        lateMinutes: null,
        userStatus: 'PRESENT',
      };
    });
  }

  return (
    <AttendanceClient
      statuses={attendanceStudentsStatuses}
      period={period}
      lessonClassId={lessonClassId}
      date={date}
    />
  );
}
