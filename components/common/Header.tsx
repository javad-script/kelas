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
        'w-full fixed px-4 py-3 z-20 top-0 left-0 grid grid-cols-3 grid-rows-1 justify-items-center transition-colors duration-300',
        scrollPos > 0 && 'bg-[#FFFFFF] border-b border-border dark:border-none dark:bg-[#242426]',
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

function Header({ children }: { children: ReactNode }) {
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
        'w-full fixed px-4 py-3 z-20 top-0 left-0 grid grid-cols-3 grid-rows-1 justify-items-center transition-colors duration-150',
        scrollPos > 0 && 'bg-[#FFFFFF] border-b border-border dark:border-none dark:bg-[#242426]',
      )}
    >
      {children}
    </div>
  );
}

function HeaderLeftSection({ children }: { children: ReactNode }) {
  return (
    <div className='w-full col-start-3 col-end-4 row-start-1 flex items-center justify-end'>
      {children}
    </div>
  );
}

function HeaderCenterSection({ children }: { children: ReactNode }) {
  return (
    <div className='w-full col-start-2 col-end-3 row-start-1 flex items-center justify-center'>
      {children}
    </div>
  );
}

function HeaderRightSection({ children }: { children: ReactNode }) {
  return (
    <div className='w-full col-start-1 col-end-2 row-start-1 flex items-center justify-start'>
      {children}
    </div>
  );
}

function HeaderBackButton({ href }: { href?: string }) {
  const router = useRouter();

  const handleClick = () => {
    if (!href) {
      router.back();
    } else {
      router.push(href);
    }
  };

  return (
    <Button type='button' variant={'ghost'} onClick={handleClick}>
      <ArrowLeft className='size-5' />
    </Button>
  );
}

function HeaderTitle({ children }: { children: string }) {
  return <span className='text-base flex items-center justify-center'>{children}</span>;
}

export {
  Header,
  HeaderLeftSection,
  HeaderCenterSection,
  HeaderRightSection,
  HeaderBackButton,
  HeaderTitle,
};
