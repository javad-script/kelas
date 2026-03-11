import { WeekDays } from '@/lib/generated/prisma/enums';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRemainingTime(from: Date, to: Date) {
  const diffMs = Math.max(to.getTime() - from.getTime(), 0);

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const totalHours = Math.floor(totalMinutes / 60);

  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  return { days, hours };
}

function formatPersianDate(date: Date) {
  const week = new Intl.DateTimeFormat('fa-IR-u-nu-latn', { weekday: 'long' }).format(date);
  const day = new Intl.DateTimeFormat('fa-IR-u-nu-latn', { day: '2-digit' }).format(date);
  const year = new Intl.DateTimeFormat('fa-IR-u-nu-latn', { year: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('fa-IR-u-nu-latn', { month: 'long' }).format(date);
  return { week, day, year, month };
}

const WEEKDAYS: WeekDays[] = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];
const getWeekDay = (day: number) => WEEKDAYS[day];

export { getWeekDay, formatPersianDate, delay, getRemainingTime };
