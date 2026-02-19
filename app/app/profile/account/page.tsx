import ClientPage from '@/app/app/profile/account/ClientPage';
import { getCurrentUser } from '@/lib/auth/session';

export default async function Layout() {
  const user = await getCurrentUser();
  if (!user) return null;
  return <ClientPage user={user} />;
}
