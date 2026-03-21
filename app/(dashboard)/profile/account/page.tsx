import ClientPage from '@/app/(dashboard)/profile/account/_components/ClientPage';
import { getCurrentUser } from '@/lib/auth/session';

export default async function Layout() {
  const user = await getCurrentUser();
  if (!user) return null;
  return <ClientPage user={user} />;
}

// TODO: this page use a client side Component as page . move form and client component to a server component
