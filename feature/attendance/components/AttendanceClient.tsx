'use client';
import { useActionState, useEffect, useRef, useState } from 'react';

import { saveAttendanceAction } from '@/feature/attendance/actions';
import AttendanceCard from '@/feature/attendance/components/AttendanceCard';
import { AttendanceStatus, StudentStatus } from '@/feature/attendance/types';
import { User } from '@/types/user';
import { MoreVertical, Save } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

import TopNavigator from '@/components/common/TopNavigator';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Props {
  statuses: { student: User; status: AttendanceStatus; lateMinutes: number | null }[];
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
    status: StudentStatus['status'],
    lateMinutes: number | null = null,
  ) => {
    setStatuses((prev) =>
      prev.map((s) =>
        s.student.id === studentId
          ? { ...s, status, lateMinutes: status === 'LATE' ? lateMinutes : null }
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

  return (
    <form action={formAction} ref={form} className='space-y-4 pt-12'>
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
            status={s.status}
          />
        );
      })}
      <TopNavigator>
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
      </TopNavigator>
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
