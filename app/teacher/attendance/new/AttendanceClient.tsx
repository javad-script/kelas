'use client';
import React, { useState } from 'react';

import Image from 'next/image';

import { saveAttendanceAction } from '@/feature/attendance/actions';
import { cn } from '@/lib/utils';
import { StudentStatus } from '@/types/attendance';
import { User } from '@/types/user';
import { Clock, EllipsisVertical } from 'lucide-react';

import UserAvatar from '@/components/common/UserAvatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

interface Props {
  classId: string;
  teacherId: string;
  students: User[];
}

export default function AttendanceClient({ classId, teacherId, students }: Props) {
  const [statuses, setStatuses] = useState<StudentStatus[]>(
    students?.map((s) => ({
      studentId: s.id,
      status: 'PRESENT',
    })) ?? [],
  );

  const handleChange = (
    studentId: string,
    status: StudentStatus['status'],
    lateMinutes?: number,
  ) => {
    setStatuses((prev) =>
      prev.map((s) => (s.studentId === studentId ? { ...s, status, lateMinutes } : s)),
    );
  };

  const handleSave = async () => {
    const unselected = statuses.filter((s) => !s.status);
    if (unselected.length > 0) {
      alert('برای همه دانش‌آموزان وضعیت انتخاب شود!');
      return;
    }

    await saveAttendanceAction({ classId, teacherId, studentStatuses: statuses });
    alert('Attendance saved!');
  };

  return (
    <div className='space-y-4'>
      {statuses.map((s) => {
        const student = students.find((st) => st.id === s.studentId);
        const changeStatus = () => (s.status === 'PRESENT' ? 'ABSENT' : 'PRESENT');
        return (
          <div
            key={s.studentId}
            className='flex items-center justify-between p-4 bg-card rounded-2xl shadow-md w-full max-w-md mx-auto gap-4 flex-col'
          >
            {/* Profile */}
            <div className='flex items-center gap-4 w-full'>
              <Dialog>
                <DialogOverlay className='bg-foreground/10 backdrop-blur-2xl'></DialogOverlay>
                <DialogTrigger
                  // asChild
                  disabled={typeof student?.profileImage === 'string' ? false : true}
                >
                  <UserAvatar
                    className='size-14 border border-border'
                    src={student?.profileImage || undefined}
                    fallback={student?.firstName[0]}
                  />
                </DialogTrigger>
                <DialogContent showCloseButton={false}>
                  <DialogHeader>
                    <DialogTitle className='hidden'></DialogTitle>
                    <DialogDescription className='hidden'></DialogDescription>
                  </DialogHeader>
                  <div className='w-full aspect-square overflow-hidden'>
                    <Image
                      src={student?.profileImage || ''}
                      alt={student?.firstName || 'failed'}
                      fill
                      className=''
                    />
                  </div>
                </DialogContent>
              </Dialog>

              {/* Name */}
              <div className='flex flex-col'>
                <span className='font-semibold text-foreground'>
                  {student?.firstName} {student?.lastName}
                </span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className='mr-auto'>
                  <EllipsisVertical className='size-5' />
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem>سوابق</DropdownMenuItem>
                  <DropdownMenuItem>مراجعه اولیا</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Controls */}
            <div className='flex items-center gap-4 flex-1 w-full'>
              {/* Attendance Toggle */}
              <Button
                id='attendance'
                onClick={() => handleChange(s.studentId, changeStatus())}
                className={cn(
                  'flex-1 h-10 font-medium transition-all',
                  s.status === 'PRESENT' && 'bg-green-600 text-white hover:bg-green-700',
                  s.status === 'ABSENT' && 'bg-gray-500/70 text-white hover:bg-gray-600',
                  s.status === 'LATE' && 'bg-yellow-500/70 text-white hover:bg-yellow-600',
                )}
              >
                {s.status === 'PRESENT'
                  ? 'حاضر'
                  : s.status === 'ABSENT'
                    ? 'غایب'
                    : `تاخیر ${s.lateMinutes} دقیقه`}
              </Button>

              {/* Late Time Button */}
              <Dialog>
                <DialogOverlay className='bg-foreground/10 backdrop-blur-2xl'></DialogOverlay>
                <DialogTrigger asChild>
                  <Button className='size-10' variant='outline' size='sm'>
                    <Clock className='size-5' />
                  </Button>
                </DialogTrigger>
                <DialogContent showCloseButton={false}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const lateTime = formData.get('lateTime');
                      handleChange(s.studentId, 'LATE', Number(lateTime) || 0);
                    }}
                  >
                    <Input
                      autoComplete='off'
                      name='lateTime'
                      type='text'
                      inputMode='decimal'
                      pattern='^\d*$'
                      placeholder='تاخیر به دقیفه'
                    ></Input>
                    <DialogFooter>
                      <div className='flex gap-4'>
                        <Button variant={'default'} type='submit'>
                          ثبت
                        </Button>
                        <DialogClose>
                          <Button type='button' variant={'outline'}>
                            خروج
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        );
      })}
      <Button onClick={handleSave} variant={'secondary'} className='mt-4 w-full py-6'>
        ثبت حضور و غیاب
      </Button>
    </div>
  );
}
