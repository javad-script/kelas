'use client';
import { useActionState, useEffect, useState } from 'react';

import { saveAttendanceAction } from '@/feature/attendance/actions';
import AttendanceCard from '@/feature/attendance/components/AttendanceCard';
import { AttendanceStatus, StudentStatus } from '@/feature/attendance/types';
import { User } from '@/types/user';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface Props {
  students: User[];
  classId: string;
}

export default function AttendanceClient({ students, classId }: Props) {
  const [statuses, setStatuses] = useState(
    students.map((s) => ({
      studentId: s.id,
      status: 'PRESENT' as AttendanceStatus,
      lateMinutes: undefined as number | undefined,
    })),
  );
  const [state, formAction] = useActionState(saveAttendanceAction, {
    success: false,
    message: '',
  });

  const handleChange = (
    studentId: string,
    status: StudentStatus['status'],
    lateMinutes?: number,
  ) => {
    setStatuses((prev) =>
      prev.map((s) =>
        s.studentId === studentId
          ? { ...s, status, lateMinutes: status === 'LATE' ? lateMinutes : undefined }
          : s,
      ),
    );
  };

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state.message, state.success]);

  return (
    <form action={formAction} className='space-y-4'>
      <input type='hidden' name='classId' value={classId} />
      <input type='hidden' name='attendances_json' value={JSON.stringify(statuses)} />
      {statuses.map((s) => {
        const current = students.find((st) => st.id === s.studentId) as User;
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
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type='submit' variant={'default'} className='mt-4 w-full py-6'>
      {pending ? (
        <span className='items-center inline-flex gap-1'>
          در حال ثبت <Spinner />
        </span>
      ) : (
        'ثبت حضور و غیاب'
      )}
    </Button>
  );
}
