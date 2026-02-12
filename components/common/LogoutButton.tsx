'use client';

import { useTransition } from 'react';

import { logout } from '@/actions/auth';

import { Button } from '@/components/ui/button';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const clickHandler = () => {
    startTransition(async () => {
      await logout();
      window.location.href = '/';
    });
  };

  return (
    <Button
      onClick={clickHandler}
      className='w-full p-4 text-center py-6 border-destructive border bg-destructive/15'
      variant='ghost'
      disabled={isPending}
    >
      {isPending ? 'در حال خروج...' : 'خروج از حساب'}
    </Button>
  );
}
