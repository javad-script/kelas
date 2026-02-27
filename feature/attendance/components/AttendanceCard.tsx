import { useState } from 'react';

import Image from 'next/image';

import { StudentStatus } from '@/feature/attendance/types';
import { useVerticalSwipe } from '@/hooks/useSwipe';
import { AttendanceStatus } from '@/lib/generated/prisma/enums';
import { cn } from '@/lib/utils';
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

type AttendanceCardProps = {
  student: User;
  status: AttendanceStatus;
  lateMinutes: number | undefined;
  handleChange: (studentId: string, status: StudentStatus['status'], lateMinutes?: number) => void;
};

export default function AttendanceCard({
  student,
  status,
  lateMinutes,
  handleChange,
}: AttendanceCardProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const statusSwitch = () => (status === 'PRESENT' ? 'ABSENT' : 'PRESENT');

  useVerticalSwipe(['bottom', 'top'], () => setDialogOpen(false), { enabled: isDialogOpen });

  return (
    <div className='flex items-center justify-between p-4 bg-card rounded-2xl shadow-md w-full max-w-md mx-auto gap-4 flex-col'>
      {/* Profile */}
      <div className='flex items-center gap-4 w-full'>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
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
          <DialogContent
            showCloseButton={false}
            className='bg-transparent max-w-svw shadow-none p-0 w-full border-transparent'
          >
            <DialogHeader>
              <DialogTitle className='hidden'></DialogTitle>
              <DialogDescription className='hidden'></DialogDescription>
            </DialogHeader>
            <div className='w-full aspect-square overflow-hidden bg-transparent'>
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
          type='button'
          onClick={() => {
            if (status === 'LATE') {
              handleChange(student.id, 'PRESENT'); // lateMinutes رو هم پاک کن تو parent
            } else {
              handleChange(student.id, statusSwitch());
            }
          }}
          className={cn(
            'flex-1 h-10 font-medium',
            status === 'PRESENT' && 'bg-green-600 hover:bg-green-700 text-white',
            status === 'ABSENT' && 'bg-red-600/80 hover:bg-red-700 text-white',
            status === 'LATE' && 'bg-yellow-500 hover:bg-yellow-600 text-white',
          )}
        >
          {status === 'PRESENT'
            ? 'حاضر'
            : status === 'ABSENT'
              ? 'غایب'
              : `تأخیر ${lateMinutes ?? '?'} دقیقه`}
        </Button>

        {/* Late Time Button */}
        <Dialog>
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
