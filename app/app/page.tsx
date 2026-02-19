import { getCurrentUser } from '@/lib/auth/session';
import { formatPersianDate } from '@/lib/helpers';
import {
  BarChart3,
  Bell,
  BookOpenCheck,
  Bookmark,
  CalendarCheck,
  CalendarClock,
  FileText,
  FileWarning,
  MessageSquare,
  NotebookText,
  ShieldAlert,
} from 'lucide-react';

import UserAvatar from '@/components/common/UserAvatar';
import { FeatureCard, FeatureCardProps } from '@/components/features/FeatureCard';
import { Notification, NotificationProps } from '@/components/features/Notification';
import { Button } from '@/components/ui/button';

const STUDENT_FEATURE_CARDS: FeatureCardProps[] = [
  {
    label: 'تکالیف',
    icon: NotebookText,
    color: 'bg-sky-500',
    gradient: 'from-sky-900/15',
    href: '/app/homeworks',
  },
  {
    label: 'موارد انضباطی',
    icon: ShieldAlert,
    color: 'bg-orange-500',
    gradient: 'from-orange-900/15',
    href: '/app/discipline',
  },
  {
    label: 'برنامه کلاسی',
    icon: CalendarClock,
    color: 'bg-pink-500',
    gradient: 'from-pink-900/15',
    href: '/app/schedule',
  },
  {
    label: 'نمرات',
    icon: BarChart3,
    color: 'bg-teal-500',
    gradient: 'from-teal-900/15',
    href: '/app/scores',
  },
  {
    label: 'گزارش',
    icon: FileText,
    color: 'bg-red-500',
    gradient: 'from-red-900/15',
    href: '/app/reports',
  },
  {
    label: 'پیام ها',
    icon: MessageSquare,
    color: 'bg-indigo-500',
    gradient: 'from-indigo-900/15',
    href: '/app/messages',
  },
  {
    label: 'برنامه امتحانی',
    icon: CalendarCheck,
    color: 'bg-fuchsia-500',
    gradient: 'from-fuchsia-900/15',
    href: '/app/exams',
  },
  {
    label: 'محتوای آموزشی',
    icon: BookOpenCheck,
    color: 'bg-lime-500',
    gradient: 'from-lime-900/15',
    href: '/app/learning-content',
  },
];

const TEACHER_FEATURE_CARDS: FeatureCardProps[] = [
  {
    label: 'تکالیف',
    icon: NotebookText,
    color: 'bg-sky-500',
    gradient: 'from-sky-900/15',
    href: '/app/teaching/homeworks',
  },
  {
    label: 'موارد انضباطی',
    icon: ShieldAlert,
    color: 'bg-orange-500',
    gradient: 'from-orange-900/15',
    href: '/app/teaching/discipline',
  },
  {
    label: 'برنامه کلاسی',
    icon: CalendarClock,
    color: 'bg-pink-500',
    gradient: 'from-pink-900/15',
    href: '/app/teaching/schedule',
  },
  {
    label: 'اعتراضات نمرات',
    icon: FileWarning,
    color: 'bg-teal-500',
    gradient: 'from-teal-900/15',
    href: '/app/teaching/score-objections',
  },
  {
    label: 'دفتر کلاسی',
    icon: Bookmark,
    color: 'bg-red-500',
    gradient: 'from-red-900/15',
    href: '/app/teaching/class-journal',
  },
  {
    label: 'پیام ها',
    icon: MessageSquare,
    color: 'bg-indigo-500',
    gradient: 'from-indigo-900/15',
    href: '/app/messages',
  },
  {
    label: 'برنامه امتحانی',
    icon: CalendarCheck,
    color: 'bg-fuchsia-500',
    gradient: 'from-fuchsia-900/15',
    href: '/app/teaching/exams',
  },
  {
    label: 'محتوای آموزشی',
    icon: BookOpenCheck,
    color: 'bg-lime-500',
    gradient: 'from-lime-900/15',
    href: '/app/teaching/learning-content',
  },
];

const NOTIFICATIONS: NotificationProps[] = [
  {
    iconName: 'Clock',
    title: 'امتحان نهایی ریاضی',
    // time: new Date('2026/2/12'),
    description: 'فردا ساعت ۹ صبح',
    reference: 'notifications/1',
    color: 'rose',
  },
  {
    iconName: 'TestTube2',
    title: 'امتحان نهایی ریاضی',
    time: new Date('2026/2/22'),
    description: 'فردا ساعت ۹ صبح',
    reference: 'notifications/2',
    color: 'teal',
  },
];

export default async function Page() {
  const user = await getCurrentUser();
  return (
    <div className='space-y-8'>
      <div className='w-full mt-safe-top p-6 rounded-2xl bg-card c-gradient dark:backdrop-blur-lg border border-white/5 shadow-[0_4px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <UserAvatar
              src={user?.profileImage || undefined}
              fallback={user?.firstName[0]}
              className='size-14'
            />
            <div>
              <p className='text-foreground text-base sm:text-lg font-medium leading-tight'>
                {getGreeting()} ، {user?.firstName.split(' ')[0]} 👋
              </p>
              <p className='text-foreground/60 text-sm'>
                {formatPersianDate(new Date(), { month: 'long', year: false })}
              </p>
            </div>
          </div>
          <Button
            variant={'secondary'}
            className='relative size-12 flex items-center justify-center rounded-xl  dark:bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
          >
            <Bell className='size-6 text-foreground/80' strokeWidth={2} />
            <span className='absolute -top-1 -right-1 size-5 bg-red-500/80 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm'>
              2
            </span>
          </Button>
        </div>
      </div>
      <section className=''>
        <p className='mb-4'>دسترسی سریع</p>
        <div className='grid grid-cols-3 gap-4 w-full '>
          {user?.role === 'TEACHER' &&
            TEACHER_FEATURE_CARDS.map((c) => <FeatureCard key={c.href} {...c} />)}
          {user?.role === 'STUDENT' &&
            STUDENT_FEATURE_CARDS.map((c) => <FeatureCard key={c.href} {...c} />)}
        </div>
      </section>
      <section className=''>
        <p className='mb-4'>اطلاعیه های مهم</p>
        <div className='flex flex-col w-full gap-4'>
          {NOTIFICATIONS.map((n) => (
            <Notification key={n.reference} {...n} />
          ))}
        </div>
      </section>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours(); // ساعت فعلی

  if (hour >= 5 && hour < 12) {
    return 'صبح بخیر';
  } else if (hour >= 12 && hour < 16) {
    return 'ظهر بخیر';
  } else if (hour >= 16 && hour < 20) {
    return 'عصر بخیر';
  } else {
    return 'شب بخیر';
  }
}
