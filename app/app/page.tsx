import { logout } from '@/actions/auth';
import { getCurrentUser } from '@/lib/auth/session';
import { formatPersianDate } from '@/lib/helpers';
import { Bell, CalendarDays, ClipboardX, GraduationCap, NotebookPen } from 'lucide-react';

import { FeatureCard, FeatureCardProps } from '@/components/features/FeatureCard';
import { Notification, NotificationProps } from '@/components/features/Notification';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const FEATURE_CARDS: FeatureCardProps[] = [
  {
    label: 'تکالیف',
    icon: NotebookPen,
    color: 'bg-sky-500',
    gradient: 'from-sky-900/15',
    href: '/homeworks',
  },
  {
    label: 'موارد انضباطی',
    icon: ClipboardX,
    color: 'bg-orange-500',
    gradient: 'from-orange-900/15',
    href: '/xs',
  },
  {
    label: 'برنامه کلاسی',
    icon: CalendarDays,
    color: 'bg-pink-500',
    gradient: 'from-pink-900/15',
    href: '/classcal',
  },
  {
    label: 'نمرات',
    icon: GraduationCap,
    color: 'bg-teal-500',
    gradient: 'from-teal-900/15',
    href: '/scores',
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
    <div className='px-4 py-6 space-y-8'>
      <div className='w-full mt-safe-top p-6 rounded-2xl bg-card dark:bg-[radial-gradient(ellipse_at_top,rgba(75,29,143,0.15),transparent)] dark:backdrop-blur-lg border border-white/5 shadow-[0_4px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Avatar className='size-12'>
              {/* TODO: put user.profileImage blow */}
              <AvatarImage className='object-cover' src={'/profile.jpeg'} />
              <AvatarFallback className='text-xl font-bold flex items-center justify-center align-baseline'>
                {user?.firstName[0]}
              </AvatarFallback>
            </Avatar>
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
          {FEATURE_CARDS.map((c) => (
            <FeatureCard key={c.href} {...c} />
          ))}
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
      <button
        onClick={async () => {
          'use server';
          await logout();
        }}
      >
        logout
      </button>
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
