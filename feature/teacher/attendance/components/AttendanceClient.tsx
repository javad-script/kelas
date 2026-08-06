'use client';
import { useActionState, useEffect, useRef, useState } from 'react';

import { saveAttendanceAction } from '@/feature/teacher/attendance/actions';
import AttendanceCard from '@/feature/teacher/attendance/components/AttendanceCard';
import { User } from '@/lib/generated/prisma/client';
import { UserAttendanceStatus } from '@/lib/generated/prisma/enums';
import { formatDate } from '@/lib/utils';
import { MoreVertical, Save } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

import {
  Header,
  HeaderBackButton,
  HeaderCenterSection,
  HeaderLeftSection,
  HeaderRightSection,
  HeaderTitle,
} from '@/components/common/Header';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Props {
  statuses: {
    student: Pick<User, 'firstName' | 'lastName' | 'profileImage' | 'id'>;
    userStatus: UserAttendanceStatus;
    lateMinutes: number | null;
  }[];
  lessonClassId: string;
  period: number;
  date: Date;
}

export default function AttendanceClient({
  statuses: serverStatuses,
  lessonClassId,
  period,
  date,
}: Props) {
  const [statuses, setStatuses] = useState(serverStatuses);
  const form = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(saveAttendanceAction, {
    success: false,
    message: '',
  });

  const handleChange = (
    studentId: string,
    userStatus: UserAttendanceStatus,
    lateMinutes: number | null = null,
  ) => {
    setStatuses((prev) =>
      prev.map((s) =>
        s.student.id === studentId
          ? { ...s, userStatus, lateMinutes: userStatus === 'LATE' ? lateMinutes : null }
          : s,
      ),
    );
  };

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (!state.success && state.message.length > 0) {
      toast.error(state.message);
    }
  }, [state.message, state.success]);

  const formattedDate = formatDate(date, 'fa-IR', {
    monthType: 'long',
    weekType: 'long',
    yearType: 'numeric',
  });
  return (
    <form action={formAction} ref={form} className='space-y-4 pt-12'>
      <Header>
        <HeaderLeftSection>
          <HeaderBackButton />
        </HeaderLeftSection>
        <HeaderCenterSection>
          <HeaderTitle>
            {`${formattedDate.week}, ${formattedDate.day} ${formattedDate.month}`}
          </HeaderTitle>
        </HeaderCenterSection>
        <HeaderRightSection>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <SubmitButton callback={() => form.current?.requestSubmit()} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </HeaderRightSection>
      </Header>
      <input type='hidden' name='date' value={date.toLocaleString()} />
      <input type='hidden' name='period' value={period} />
      <input type='hidden' name='lessonClassId' value={lessonClassId} />
      <input type='hidden' name='attendances_json' value={JSON.stringify(statuses)} />
      {statuses.map((s) => {
        const current = s.student as User;
        return (
          <AttendanceCard
            key={current?.id}
            handleChange={handleChange}
            student={current}
            lateMinutes={s.lateMinutes}
            userStatus={s.userStatus}
          />
        );
      })}
    </form>
  );
}

function SubmitButton({ callback }: { callback: () => void }) {
  const { pending } = useFormStatus();

  return (
    <Button
      onClick={callback}
      disabled={pending}
      type='submit'
      variant={'ghost'}
      className='bg-transparent!'
    >
      <span className='flex items-center justify-center gap-2'>
        <Save /> ثبت حضور و غیاب
      </span>
    </Button>
  );
}
