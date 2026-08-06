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

type Reason = { value: number; label: string };
type ReasonMap = { [category: string]: Reason[] };

const REASONS: ReasonMap = {
  DISCIPLINE: [
    { value: 100, label: 'توهین به معلم' },
    { value: 101, label: 'دیر آمدن به کلاس' },
    { value: 102, label: 'ناتمام گذاشتن تکالیف' },
    { value: 103, label: 'اختلال در نظم کلاس' },
    { value: 104, label: 'استفاده از گوشی در کلاس' },
    { value: 105, label: 'دعوا با همکلاسی‌ها' },
    { value: 106, label: 'غیبت بدون دلیل' },
    { value: 107, label: 'خوردن خوراکی در کلاس' },
    { value: 108, label: 'خوابیدن در کلاس' },
    { value: 109, label: 'نقاشی روی میز یا دیوار' },
    { value: 110, label: 'پرت کردن حواس دیگران' },
    { value: 111, label: 'عدم رعایت پوشش مناسب' },
    { value: 112, label: 'ورود بدون اجازه به دفتر' },
    { value: 113, label: 'دزدی از وسایل دیگران' },
    { value: 114, label: 'تخریب اموال مدرسه' },
    { value: 115, label: 'زبان نامناسب و فحاشی' },
    { value: 116, label: 'قلدری و آزار همکلاسی' },
    { value: 117, label: 'عدم شرکت در مراسمات مدرسه' },
    { value: 118, label: 'فرار از کلاس' },
    { value: 119, label: 'جعل امضا یا مدارک' },
  ],
  REWARD: [
    { value: 200, label: 'عملکرد خوب' },
    { value: 201, label: 'عملکرد عالی' },
    { value: 202, label: 'پیشرفت چشمگیر' },
    { value: 203, label: 'کمک به دوستان' },
    { value: 204, label: 'خلاقیت در پروژه' },
    { value: 205, label: 'حضور فعال در بحث‌ها' },
    { value: 206, label: 'نمره کامل در امتحان' },
    { value: 207, label: 'تمیزی و نظم شخصی' },
    { value: 208, label: 'مشارکت در فعالیت‌های فوق برنامه' },
    { value: 209, label: 'احترام به قوانین مدرسه' },
    { value: 210, label: 'حل مسئله به صورت گروهی' },
    { value: 211, label: 'نوشتن مقاله یا تحقیق برتر' },
    { value: 212, label: 'مهربانی و همدلی با دیگران' },
    { value: 213, label: 'رشد مهارت‌های هنری یا ورزشی' },
    { value: 214, label: 'رهبری و مدیریت تیم' },
    { value: 215, label: 'صداقت و راستگویی' },
    { value: 216, label: 'صرفه‌جویی در مصرف منابع' },
    { value: 217, label: 'یادگیری سریع مطالب جدید' },
    { value: 218, label: 'ایفای نقش مثبت در کلاس' },
    { value: 219, label: 'تشویق دیگران به تلاش بیشتر' },
  ],
};

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
          const students = r.reportedStudents.map((s) => s.student.lastName);
          return (
            <div key={r.id} className='w-full bg-card rounded-2xl flex flex-col p-4 gap-4'>
              <div className='w-full flex justify-between gap-4'>
                <span className='text-muted-foreground'>
                  {REASONS[r.category].find((i) => i.value === Number(r.reason))?.label}
                </span>
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
                <p className='text-foreground/70'>{students.join(',')}</p>
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
