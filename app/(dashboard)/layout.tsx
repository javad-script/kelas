import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth/session';

import BottomNavigation from '@/components/common/BottomNavigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) redirect('/login');
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  );
}
