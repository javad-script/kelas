import { ComponentType } from 'react';

import Link from 'next/link';

import { getCurrentUser } from '@/lib/auth/session';
import { Bell, ChevronLeft, LucideBuilding2, Moon, User2 } from 'lucide-react';

import LogoutActionButton from '@/components/common/LogoutButton';
import ThemeToggleWrapper from '@/components/common/ThemeSwitchWrapper';
import UserAvatar from '@/components/common/UserAvatar';

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
        href: 'profile/school',
        type: 'link',
      },
      {
        icon: User2,
        label: 'اطلاعات شخصی',
        href: 'profile/account',
        type: 'link',
      },
    ],
  },
];

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <div className='space-y-8'>
      <section>
        <h1 className='text-xl font-bold mb-4'>پروفایل</h1>

        <div className='flex flex-col items-center c-gradient justify-center w-full px-6 rounded-2xl bg-card border border-white/5 shadow-[0_4px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]'>
          <UserAvatar src={user?.profileImage || undefined} fallback={user?.firstName[0]} />

          <p className='font-bold text-lg mt-2 mb-1.5'>
            {user?.firstName} {user?.lastName}
          </p>

          <span className='text-muted-foreground text-sm'>{user?.email}</span>

          <span className='text-muted-foreground text-sm'>{user?.nationalCode}</span>
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
