import Link from 'next/link';

import LessonCard from '@/feature/attendance/components/LessonCard';
import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { formatDate, getWeekDay } from '@/lib/utils';
import { MoreVertical, Search } from 'lucide-react';

import {
  Header,
  HeaderBackButton,
  HeaderCenterSection,
  HeaderLeftSection,
  HeaderRightSection,
} from '@/components/common/Header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Props = {
  searchParams: Promise<{ targetDate: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { targetDate } = await searchParams;
  const user = await getCurrentUser();
  const date = targetDate ? new Date(targetDate) : new Date();
  const today = getWeekDay(date.getDay());
  const [year, month, day] = [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()];
  const dateUTC = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
  const lessons = await prisma.lessonClass.findMany({
    where: { teacherId: user?.id, weekDay: today },
    include: {
      lesson: { select: { id: true, name: true } },
      class: { select: { name: true, grade: true } },
    },
  });
  const attendance = await prisma.attendance.findMany({
    select: { id: true, schoolPeriod: true },
    where: {
      date: dateUTC,
    },
  });

  const todayDate = formatDate(date, 'fa-IR', {
    monthType: 'long',
    weekType: 'long',
    yearType: 'numeric',
  });

  return (
    <div className='pt-12'>
      <Header>
        <HeaderLeftSection>
          <HeaderBackButton href='../' />
        </HeaderLeftSection>
        <HeaderCenterSection>
          <span className='inline-block w-full my-auto text-center'>
            {date.getDate() === new Date().getDate()
              ? 'امروز'
              : `${todayDate.week}, ${todayDate.day} ${todayDate.month}`}
          </span>
        </HeaderCenterSection>
        <HeaderRightSection>
          <div className='inline-flex gap-4 w-full items-center'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={{ query: { targetDate: '2026-03-12' } }} replace>
                    انتخواب تاریخ
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Search />
          </div>
        </HeaderRightSection>
      </Header>
      <div className='flex flex-col gap-4'>
        {lessons.map((l) => (
          <LessonCard
            key={l.id}
            isAttendance={attendance.find((a) => a.schoolPeriod === l.schoolPeriod) ? true : false}
            lesson={l.lesson}
            schoolPeriod={l.schoolPeriod}
            classData={l.class}
            targetDate={date}
          />
        ))}
      </div>
      {lessons.length < 1 && (
        <div className='w-full flex justify-center item-center'>
          <span className=''>امروز کلاسی ندارید</span>
        </div>
      )}
    </div>
  );
}
