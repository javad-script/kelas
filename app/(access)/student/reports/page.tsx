import ReportCard from '@/feature/student/reports/components/ReportCard';
import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

import { Header, HeaderBackButton, HeaderLeftSection } from '@/components/common/Header';

export default async function Page() {
  const reports = await getReports();
  return (
    <>
      <Header>
        <HeaderLeftSection>
          <HeaderBackButton />
        </HeaderLeftSection>
      </Header>

      <div className='space-y-8 mt-8'>
        {reports.length > 0 ? (
          reports.map((r) => <ReportCard key={r.id} {...r} />)
        ) : (
          <span className='w-full inline-block text-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
            هیچ موردی وجود ندارد
          </span>
        )}
      </div>
    </>
  );
}

async function getReports() {
  const student = await getCurrentUser();

  const reports = await prisma.attendanceStudent.findMany({
    where: {
      studentId: student?.id,
      userStatus: { not: 'PRESENT' },
    },
    include: {
      attendance: {
        select: {
          teacher: { select: { firstName: true, lastName: true } },
          date: true,
          createdAt: true,
          schoolPeriod: true,
          lessonClass: {
            select: {
              lesson: { select: { name: true } },
            },
          },
        },
      },
    },
  });

  return reports.map((r) => ({
    id: r.id,
    teacher: `${r.attendance.teacher.firstName} ${r.attendance.teacher.lastName}`,
    status: r.status,
    note: r.note,
    lateMinutes: r.lateMinutes,
    date: r.attendance.date,
    schoolPeriod: r.attendance.schoolPeriod,
    lessonName: "نام درس نامشخص",
  }));
}
