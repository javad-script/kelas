import { useState } from 'react';

import { User } from '@/lib/generated/prisma/client';
import { UserAttendanceStatus } from '@/lib/generated/prisma/enums';
import { cn } from '@/lib/utils';
import { Clock, EllipsisVertical } from 'lucide-react';

import UserAvatar from '@/components/common/UserAvatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogOverlay,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

type AttendanceCardProps = {
  student: Omit<User, 'password'>;
  userStatus: UserAttendanceStatus;
  lateMinutes: number | null;
  handleChange: (studentId: string, status: UserAttendanceStatus, lateMinutes?: number) => void;
};

export default function AttendanceCard({
  student,
  userStatus,
  lateMinutes,
  handleChange,
}: AttendanceCardProps) {
  const [isLateOpen, setLateOpen] = useState(false);
  const userStatusSwitch = () => (userStatus === 'PRESENT' ? 'ABSENT' : 'PRESENT');

  return (
    <div className='flex items-center justify-between p-4 bg-card rounded-2xl shadow-md w-full max-w-md mx-auto gap-4 flex-col'>
      {/* Profile */}
      <div className='flex items-center gap-4 w-full'>
        <UserAvatar
          src={student.profileImage ?? undefined}
          fallback={student.firstName[0]}
          dialog
          className='size-20'
        />

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
          type='button'
          onClick={() => {
            if (userStatus === 'LATE') {
              handleChange(student.id, 'PRESENT'); // lateMinutes رو هم پاک کن تو parent
            } else {
              handleChange(student.id, userStatusSwitch());
            }
          }}
          className={cn(
            'flex-1 h-10 font-medium',
            userStatus === 'PRESENT' && 'bg-green-600 hover:bg-green-700 text-white',
            userStatus === 'ABSENT' && 'bg-red-600/80 hover:bg-red-700 text-white',
            userStatus === 'LATE' && 'bg-yellow-500 hover:bg-yellow-600 text-white',
          )}
        >
          {userStatus === 'PRESENT'
            ? 'حاضر'
            : userStatus === 'ABSENT'
              ? 'غایب'
              : `تأخیر ${lateMinutes ?? '?'} دقیقه`}
        </Button>

        {/* Late Time Button */}
        <Dialog open={isLateOpen} onOpenChange={setLateOpen}>
          <DialogOverlay className='bg-foreground/10 backdrop-blur-2xl'></DialogOverlay>
          <DialogTrigger asChild>
            <Button type='button' className='size-10' variant='outline' size='sm'>
              <Clock className='size-5' />
            </Button>
          </DialogTrigger>
          <DialogContent showCloseButton={false}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const lateTime = formData.get('lateTime');
                handleChange(student.id, 'LATE', Number(lateTime) || 0);
                setLateOpen(false);
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
}
