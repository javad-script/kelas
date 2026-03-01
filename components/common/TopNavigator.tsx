'use client';
import React, { ReactNode, useEffect, useState } from 'react';

// import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

type TopNavigatorProps = {
  backLinkHref?: string;
  children?: ReactNode;
};

export default function TopNavigator({ backLinkHref, children }: TopNavigatorProps) {
  const router = useRouter();
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        'w-full fixed px-4 py-3 z-50 top-0 left-0 flex items-center transition-colors duration-300',
        scrollPos > 0 && 'bg-[#FFFFFF] border-b border-border dark:border-none dark:bg-[#242426]',
        children ? 'justify-between' : 'justify-end',
      )}
    >
      {children}
      <Button
        type='button'
        variant={'ghost'}
        onClick={() => (!backLinkHref ? router.back() : router.push(backLinkHref))}
      >
        <ArrowLeft className='size-5' />
      </Button>
    </div>
  );
}
