import { WeekDays } from '@/lib/generated/prisma/enums';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

type Options = {
  weekType: 'long' | 'narrow' | 'short';
  yearType: 'numeric' | '2-digit';
  monthType: 'long' | '2-digit' | 'narrow' | 'numeric' | 'short';
};
type Response = {
  year: string;
  month: string | number;
  week: string | number;
  day: number | string;
};
function formatDate(
  date: Date,
  locals: string = 'en-US',
  { weekType = 'short', yearType = 'numeric', monthType = 'numeric' }: Options,
): Response {
  const day = new Intl.DateTimeFormat(`${locals}-u-nu-latn`, {
    day: 'numeric',
  }).format(date);

  const year = new Intl.DateTimeFormat(`${locals}-u-nu-latn`, {
    year: yearType,
  }).format(date);

  const week = new Intl.DateTimeFormat(`${locals}-u-nu-latn`, {
    weekday: weekType,
  }).format(date);

  const month = new Intl.DateTimeFormat(`${locals}-u-nu-latn`, {
    month: monthType,
  }).format(date);

  return { year, week, month, day };
}
export { getWeekDay, cn, formatDate, delay, getRemainingTime };
