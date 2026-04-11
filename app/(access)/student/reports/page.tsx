import { getCurrentUser } from '@/lib/auth/session';
import { AttendanceStatus } from '@/lib/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';

import { Header, HeaderBackButton, HeaderLeftSection } from '@/components/common/Header';
import { Badge } from '@/components/ui/badge';

export default async function Page() {
  const student = await getCurrentUser();
  const reports = await prisma.attendanceStudent.findMany({
    where: { studentId: student?.id, userStatus: { not: 'PRESENT' } },
    include: {
      attendance: {
        select: {
          teacher: { select: { lastName: true, firstName: true } },
          date: true,
          createdAt: true,
          schoolPeriod: true,
          lessonClass: { select: { lesson: { select: { name: true } } } },
        },
        // include: { teacher: { select: { lastName: true, firstName: true } } },
      },
    },
  });
  const mappedReports = reports.map((r) => ({
    id: r.id,
    teacher: `${r.attendance.teacher.firstName} ${r.attendance.teacher.lastName}`,
    status: r.status,
    note: r.note,
    lateMinutes: r.lateMinutes,
    date: r.attendance.date,
    schoolPeriod: r.attendance.schoolPeriod,
    lessonName: r.attendance.lessonClass.lesson.name,
  }));
  return (
    <>
      <Header>
        <HeaderLeftSection>
          <HeaderBackButton />
        </HeaderLeftSection>
      </Header>
      <div className='space-y-8 mt-8'>
        {mappedReports.length > 0 ? (
          mappedReports.map((r) => <ReportCard key={r.id} {...r} />)
        ) : (
          <span className='w-full inline-block text-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
            هیچ مورد انظباطی وجود ندارد
          </span>
        )}
      </div>
    </>
  );
}
type ReportCardProps = {
  id: string;
  teacher: string;
  status: AttendanceStatus;
  note: string | null;
  lateMinutes: number | null;
  date: Date;
  schoolPeriod: number;
  lessonName: string;
};

function ReportCard(props: ReportCardProps) {
  const formattedDate = formatDate(props.date, 'fa-IR', {
    monthType: 'long',
    weekType: 'long',
    yearType: 'numeric',
  });
  return (
    <div className='w-full bg-card rounded-2xl flex flex-col p-4 gap-4'>
      <div className='w-full flex justify-between gap-4'>
        <span className='text-muted-foreground'>غیبت کلاسی</span>
        <Badge>{props.status === 'MOVAJAH' ? 'موجه' : 'غیر موجه'}</Badge>
      </div>
      <div className='w-full flex justify-between gap-4'>
        <span className='text-muted-foreground'>تاریخ</span>
        <p className='text-foreground/70'>
          {formattedDate.week} {formattedDate.day} {formattedDate.month}
        </p>
      </div>
      <div className='w-full flex justify-between gap-4'>
        <span className='text-muted-foreground'>ثبت کننده</span>
        <p className='text-foreground/70'>{props.teacher}</p>
      </div>
      <div className='w-full flex justify-between gap-4'>
        <span className='text-muted-foreground'>درس</span>
        <p className='text-foreground/70'>{props.lessonName}</p>
      </div>
    </div>
  );
}
