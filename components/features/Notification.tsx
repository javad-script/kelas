'use client';

import { ComponentType, useEffect, useState } from 'react';

import Link from 'next/link';

import { getRemainingTime } from '@/lib/helpers';
import { cva } from 'class-variance-authority';
import { ChevronLeft, Clock, TestTube2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

// 🔹 آیکن‌ها فقط نامشون استفاده می‌شه
const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Clock,
  TestTube2,
};

export type NotificationProps = {
  iconName: keyof typeof ICONS;
  title: string;
  time?: Date;
  description: string;
  reference: string;
  color?: 'teal' | 'rose' | 'sky' | 'purple' | 'orange';
};

export function Notification({
  title,
  time,
  description,
  reference,
  iconName,
  color,
}: NotificationProps) {
  const IconComponent = ICONS[iconName];

  const [timeLeft, setTimeLeft] = useState(time ? getRemainingTime(new Date(), time) : null);

  useEffect(() => {
    if (!time) return; // 👈 اگر time نداریم، هیچ کاری نکن

    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime(new Date(), time));
    }, 60000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className={wrapperStyles({ color })}>
      <div className={iconStyles({ color })}>
        <IconComponent className='size-6 stroke-2 text-white' />
      </div>

      <div className='w-full space-y min-w-0'>
        <h3 className='truncate w-full'>{title}</h3>
        <p className={`text-sm text-muted-foreground truncate w-full ${timeLeft && 'mb-4'}`}>
          {description}
        </p>

        {/* 👇 فقط وقتی time وجود داره */}
        {timeLeft && (
          <Badge className={badgeStyles({ color })}>
            {timeLeft.days > 0
              ? `${timeLeft.days} روز باقی مانده`
              : `${timeLeft.hours} ساعت باقی مانده`}
          </Badge>
        )}
      </div>

      <Link className='size-12 shrink-0 flex items-center justify-center' href={reference}>
        <ChevronLeft className='size-5 stroke-2' />
      </Link>
    </div>
  );
}

// 🔹 cva styles
const wrapperStyles = cva('w-full border-2 rounded-2xl flex gap-4 p-4', {
  variants: {
    color: {
      teal: 'bg-teal-500/10 border-teal-500/10 dark:bg-[radial-gradient(ellipse_at_top,rgba(19,78,74,0.15),transparent)]',
      purple:
        'bg-purple-500/10 border-purple-500/10 dark:bg-[radial-gradient(ellipse_at_top,rgba(88,28,135,0.15),transparent)]',
      rose: 'bg-rose-500/10 border-rose-500/10 dark:bg-[radial-gradient(ellipse_at_top,rgba(136,19,55,0.15),transparent)]',
      sky: 'bg-sky-500/10 border-sky-500/10 dark:bg-[radial-gradient(ellipse_at_top,rgba(12,74,110,0.15),transparent)]',
      orange:
        'bg-orange-500/10 border-orange-500/10 dark:bg-[radial-gradient(ellipse_at_top,rgba(124,45,18,0.15),transparent)]',
    },
  },
  defaultVariants: { color: 'sky' },
});

const iconStyles = cva('border-2 shrink-0 size-12 flex items-center justify-center rounded-2xl', {
  variants: {
    color: {
      teal: 'bg-teal-500',
      purple: 'bg-purple-500',
      rose: 'bg-rose-500',
      sky: 'bg-sky-500',
      orange: 'bg-orange-500',
    },
  },
  defaultVariants: { color: 'sky' },
});

const badgeStyles = cva('p-1', {
  variants: {
    color: {
      teal: 'bg-teal-500/15 text-teal-600',
      purple: 'bg-purple-500/15 text-purple-600',
      rose: 'bg-rose-500/15 text-rose-600',
      sky: 'bg-sky-500/15 text-sky-600',
      orange: 'bg-orange-500/15 text-orange-600',
    },
  },
  defaultVariants: { color: 'sky' },
});
