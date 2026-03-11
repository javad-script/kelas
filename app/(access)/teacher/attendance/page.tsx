import Link from 'next/link';

import LessonCard from '@/feature/attendance/components/LessonCard';
import { getCurrentUser } from '@/lib/auth/session';
import { formatPersianDate, getWeekDay } from '@/lib/helpers';
import { prisma } from '@/lib/prisma';
import { MoreVertical } from 'lucide-react';

import TopNavigator from '@/components/common/TopNavigator';
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

  const todayDate = formatPersianDate(new Date());

  return (
    <div className='pt-12'>
      <TopNavigator>
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
        <span>
          {date.getDate() === new Date().getDate()
            ? 'امروز'
            : `${todayDate.week}, ${todayDate.day} ${todayDate.month}`}
        </span>
      </TopNavigator>
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
