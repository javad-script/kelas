'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { Switch } from '@/components/ui/switch';

export default function ThemeSwitchComponent() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null; // یا <Switch disabled /> یا یه placeholder کوچیک

  return (
    <Switch
      dir='ltr'
      checked={theme === 'dark'}
      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
    />
  );
}
