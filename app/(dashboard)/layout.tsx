import BottomNavigation from '@/components/common/BottomNavigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  );
}
