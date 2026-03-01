'use client';

import { ComponentType, memo } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Calendar, Home, MessageSquare, User } from 'lucide-react';

const NAV_LINKS = [
  { Label: 'خانه', href: '/', icon: Home },
  { Label: 'گفتوگو', href: '/chat', icon: MessageSquare },
  { Label: 'تقویم', href: '/calendar', icon: Calendar },
  { Label: 'پروفایل', href: '/profile', icon: User },
];

function BottomNavigation() {
  const pathname = usePathname();

  const isLinkActive = (href: string) =>
    pathname === href ||
    (href !== '/' && pathname.startsWith(href + '/')) ||
    (href === '/' && pathname === '/');
  return (
    <nav className='w-full h-20 px-4 py-2 flex justify-between gap-2 items-center border-border border-t bg-background fixed bottom-0 left-0 z-20'>
      {NAV_LINKS.map((l) => (
        <Link
          prefetch
          href={l.href}
          key={l.href}
          className={cn(
            'size-16 flex justify-center transition-colors duration-300 items-center gap-1 text-muted-foreground flex-col rounded-2xl',
            isLinkActive(l.href) && 'bg-linear-to-br from-purple-500/20 to-indigo-400/20',
          )}
        >
          <NavLinkIcon icon={l.icon} isActive={isLinkActive(l.href)} />
          <span
            className={cn(
              'text-xs font-bold',
              isLinkActive(l.href) && 'dark:text-purple-300 text-purple-500',
            )}
          >
            {l.Label}
          </span>
        </Link>
      ))}
    </nav>
  );
}

type NavLinkIconProps = {
  icon: ComponentType<{ className?: string }>;
  isActive: boolean;
};

function NavLinkIcon({ icon: Icon, isActive }: NavLinkIconProps) {
  return (
    <Icon
      className={cn(
        'size-5 transition-colors',
        isActive ? 'text-purple-600 dark:text-purple-300' : 'text-muted-foreground',
      )}
    />
  );
}

export default memo(BottomNavigation);
