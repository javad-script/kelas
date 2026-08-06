'use client';
import { useState } from 'react';

import Image from 'next/image';

import { useVerticalSwipe } from '@/hooks/useSwipe';
import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function UserAvatar({
  src,
  fallback,
  className,
  dialog = false,
}: {
  src: string | undefined;
  fallback: string | undefined;
  className?: string;
  dialog?: boolean;
}) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  useVerticalSwipe(['bottom', 'top'], () => setDialogOpen(false));
  return (
    <Dialog
      open={dialog && typeof src === 'string' ? isDialogOpen : false}
      onOpenChange={setDialogOpen}
    >
      <DialogOverlay className='bg-foreground/10 backdrop-blur-2xl z-50'></DialogOverlay>
      <DialogTrigger asChild disabled={typeof src === 'string' ? false : true}>
        <Avatar className={cn('size-26', className)}>
          {src && <AvatarImage className='object-cover' src={src} />}
          <AvatarFallback className='pb-3'>{fallback}</AvatarFallback>
        </Avatar>
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
          <Image src={src ?? ''} alt={src ?? ''} fill className='object-cover' />
        </div>
      </DialogContent>
    </Dialog>
  );
}
