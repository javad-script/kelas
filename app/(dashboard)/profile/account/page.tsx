import ClientPage from '@/app/(dashboard)/profile/account/_components/ClientPage';
import { getCurrentUser } from '@/lib/auth/session';

export default async function Layout() {
  const user = await getCurrentUser();
  if (!user) return null;
  return <ClientPage user={user} />;
}
