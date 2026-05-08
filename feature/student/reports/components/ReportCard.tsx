import { AttendanceStatus } from '@/lib/generated/prisma/enums';
import { formatDate } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';

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

export default function ReportCard(props: ReportCardProps) {
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
