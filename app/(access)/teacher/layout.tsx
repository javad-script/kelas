import { getCurrentUser } from '@/lib/auth/session';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (user?.role !== 'TEACHER') throw new Error('unauthorized');
  return <>{children}</>;
}
