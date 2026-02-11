import BottomNavigation from '@/components/common/BottomNavigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='pb-20'>
      {children}
      <BottomNavigation />
    </main>
  );
}
