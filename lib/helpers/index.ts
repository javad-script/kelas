export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getRemainingTime(from: Date, to: Date) {
  const diffMs = Math.max(to.getTime() - from.getTime(), 0);

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const totalHours = Math.floor(totalMinutes / 60);

  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  return { days, hours };
}

type PersianDate = {
  day?: 'numeric';
  month: 'numeric' | 'narrow' | 'long';
  year: '2-digit' | 'numeric' | false;
};

export function formatPersianDate(date: Date, { day = 'numeric', month, year }: PersianDate) {
  return new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
    weekday: 'long',
    day,
    month,
    ...(year && { year }),
  }).format(date);
}
