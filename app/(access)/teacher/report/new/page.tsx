import ReportPage from '@/app/(access)/teacher/report/new/ClientPage';
import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

export default async function Layout() {
  const teacher = await getCurrentUser();
  const lessons = await prisma.lessonClass.findMany({
    where: { teacherId: teacher?.id },
    include: { class: { include: { studentClass: true } } },
  });

  const students = (
    await prisma.studentClass.findMany({
      where: { classId: lessons[1].classId },
      include: {
        student: { select: { firstName: true, lastName: true, profileImage: true, id: true } },
      },
    })
  ).map((s) => s.student);
  console.log(lessons);
  console.log(students);
  return <ReportPage students={[]} />;
}
