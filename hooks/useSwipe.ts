import { useEffect, useRef } from 'react';

type Direction = 'top' | 'bottom';

export function useVerticalSwipe(
  from: Direction[],
  callback: (dir: Direction) => void,
  options?: { threshold?: number; enabled?: boolean },
) {
  const threshold = options?.threshold ?? 80;
  const enabled = options?.enabled ?? true;

  const startY = useRef<number | null>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const onTouchStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY;
      triggered.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (startY.current === null || triggered.current) return;

      const currentY = e.touches[0].clientY;
      const delta = currentY - startY.current;

      if (from.includes('top') && delta > threshold) {
        triggered.current = true;
        callback('top');
      }

      if (from.includes('bottom') && delta < -threshold) {
        triggered.current = true;
        callback('bottom');
      }
    };

    const onTouchEnd = () => {
      startY.current = null;
      triggered.current = false;
    };

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [from, callback, threshold, enabled]);
}
