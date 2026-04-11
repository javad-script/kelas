import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { Filter, MoreVertical, Plus, Search } from 'lucide-react';

import {
  Header,
  HeaderBackButton,
  HeaderCenterSection,
  HeaderLeftSection,
  HeaderRightSection,
} from '@/components/common/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default async function Page() {
  const user = await getCurrentUser();
  if (!user?.id) redirect('/');
  const reports = await prisma.report.findMany({
    where: { teacherId: user?.id },
    include: { reportedStudents: { select: { student: { select: { lastName: true } } } } },
    orderBy: { createdAt: 'desc' },
  });
  return (
    <>
      <Header>
        <HeaderLeftSection>
          <HeaderBackButton />
        </HeaderLeftSection>
        <HeaderCenterSection>
          <span className='inline-block w-full my-auto text-center'>موارد انضباطی</span>
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
            <Filter />
            <Search />
          </div>
        </HeaderRightSection>
      </Header>

      <div className='space-y-8 mt-18'>
        {reports.map((r) => {
          const formattedDate = formatDate(r.date, 'fa-IR', {
            monthType: 'long',
            weekType: 'long',
            yearType: 'numeric',
          });
          return (
            <div key={r.id} className='w-full bg-card rounded-2xl flex flex-col p-4 gap-4'>
              <div className='w-full flex justify-between gap-4'>
                <span className='text-muted-foreground'>{r.reason}</span>
                <Badge>{r.category === 'DISCIPLINE' ? 'انضباطی' : 'تشویقی'}</Badge>
              </div>
              <div className='w-full flex justify-between gap-4'>
                <span className='text-muted-foreground'>تاریخ</span>
                <p className='text-foreground/70'>
                  {formattedDate.week} {formattedDate.day} {formattedDate.month}
                </p>
              </div>
              <div className='w-full flex justify-between gap-4'>
                <span className='text-muted-foreground'>دانش آموزان</span>
                <p className='text-foreground/70'>{r.reportedStudents.join(',')}</p>
              </div>
              <div className='w-full flex justify-between gap-4'>
                <span className='text-muted-foreground'>توضیحات</span>
                <p className='text-foreground/70'>{r.note}</p>
              </div>
            </div>
          );
        })}

        <Link href={'report/new'}>
          <Button
            className='size-14 rounded-2xl flex items-center bg-rose-500 fixed z-40 bottom-5 right-5'
            variant={'ghost'}
          >
            <Plus className='size-5 text-white font-bold' />
          </Button>
        </Link>
      </div>
    </>
  );
}
