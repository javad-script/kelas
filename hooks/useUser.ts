import { useEffect, useState } from 'react';

import { User } from '@/types/user';

export default function useUser(): [User | undefined, boolean] {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      setPending(true);
      try {
        const res = await fetch('/api/v1/me', { cache: 'no-store' });
        if (!res.ok) throw new Error('خطا در گرفتن اطلاعات');

        const data = await res.json();
        setUser(data);
      } catch {
        setUser(undefined);
      } finally {
        setPending(false);
      }
    }

    fetchUser();
  }, []);

  return [user, pending];
}
