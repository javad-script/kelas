import { ComponentType } from 'react';

import Link from 'next/link';

import { getCurrentUser } from '@/lib/auth/session';
import { Bell, Camera, ChevronLeft, LucideBuilding2, Moon, User2 } from 'lucide-react';

import LogoutActionButton from '@/components/common/LogoutButton';
import ThemeToggleWrapper from '@/components/common/ThemeSwitchWrapper';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type MenuItem = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  type?: 'link' | 'theme';
};

type MenuSection = {
  label: string;
  items: MenuItem[];
};

const MENU_SECTIONS: MenuSection[] = [
  {
    label: 'تنظیمات',
    items: [
      {
        icon: Bell,
        label: 'اعلان ها',
        href: '#',
        type: 'link',
      },
      {
        icon: Moon,
        label: 'تم',
        type: 'theme',
      },
    ],
  },
  {
    label: 'حساب کاربری',
    items: [
      {
        icon: LucideBuilding2,
        label: 'اطلاعات مدرسه',
        href: 'school-info',
        type: 'link',
      },
      {
        icon: User2,
        label: 'اطلاعات شخصی',
        href: 'account-info',
        type: 'link',
      },
    ],
  },
];

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();

  return (
    <div className='px-4 py-6 space-y-8'>
      <section>
        <h1 className='text-xl font-bold mb-4'>پروفایل</h1>

        <div className='flex flex-col items-center c-gradient justify-center w-full p-6 rounded-2xl bg-card border border-white/5 shadow-[0_4px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]'>
          <div className='relative ring ring-offset-card ring-offset-3 bg-transparent rounded-full ring-rose-500/50'>
            <Avatar className='size-20'>
              <AvatarImage className='object-cover' src='/profile.jpeg' />
              <AvatarFallback />
            </Avatar>
            <div className='absolute bottom-0 right-0 size-8 flex items-center justify-center bg-rose-500 shadow-sm rounded-full overflow-auto!'>
              <Camera className='text-white size-5' />
            </div>
          </div>

          <p className='font-bold text-lg mt-2 mb-1.5'>
            {currentUser?.firstName} {currentUser?.lastName}
          </p>

          <span className='text-muted-foreground text-sm'>{currentUser?.email}</span>

          <span className='text-muted-foreground text-sm'>{currentUser?.nationalCode}</span>
        </div>
      </section>

      {MENU_SECTIONS.map((section) => (
        <SettingsGroup key={section.label} {...section} />
      ))}

      <LogoutActionButton />
    </div>
  );
}

function SettingsGroup({ label, items }: MenuSection) {
  return (
    <section className='space-y-3 '>
      <h2 className='font-medium'>{label}</h2>

      <div className='border w-full rounded-2xl shadow-[0_4px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)] bg-card border-border flex flex-col p-6 gap-6'>
        {items.map((entry) => {
          const RowContent = (
            <div className='flex items-center gap-4'>
              <div className='border-border border rounded-lg p-1.5 bg-white/5'>
                <entry.icon className='size-6' />
              </div>

              <span>{entry.label}</span>

              <div className='mr-auto flex items-center'>
                {entry.type === 'theme' ? (
                  <ThemeToggleWrapper />
                ) : (
                  <ChevronLeft className='opacity-50' />
                )}
              </div>
            </div>
          );

          return entry.href ? (
            <Link key={entry.label} href={entry.href}>
              {RowContent}
            </Link>
          ) : (
            <div key={entry.label}>{RowContent}</div>
          );
        })}
      </div>
    </section>
  );
}
