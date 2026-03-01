import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth/session';

import BottomNavigation from '@/components/common/BottomNavigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) redirect('/login');
  return (
    <main className='pb-20 pt-6'>
      {children}
      <BottomNavigation />
    </main>
  );
}
