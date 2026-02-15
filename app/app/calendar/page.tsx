'use client';

import { useState } from 'react';

import { Vazirmatn } from 'next/font/google';

import { formatPersianDate } from '@/lib/helpers';

import { Notification, NotificationProps } from '@/components/features/Notification';
import { Calendar } from '@/components/ui/calendar';

const vazirmatn = Vazirmatn({ subsets: ['arabic'] });

const NOTIFICATIONS: NotificationProps[] = [
  {
    iconName: 'Clock',
    title: 'امتحان نهایی ریاضی',
    description: 'فردا ساعت ۹ صبح',
    reference: 'notifications/1',
    color: 'rose',
  },
  {
    iconName: 'Clock',
    title: 'جلسه والدین',
    description: 'ساعت ۴:۰۰ عصر',
    reference: 'notifications/jalaseh',
    color: 'purple',
  },
  {
    iconName: 'Clock',
    title: 'مهلت تحویل فیزیک',
    description: 'تا پابان روز',
    reference: 'notifications/homework',
    color: 'orange',
  },
];

export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className='px-4 py-6 space-y-8'>
      <section className='space-y-4'>
        <h1 className='text-2xl'>تقویم</h1>
        <p className='text-muted-foreground '>
          {formatPersianDate(new Date(), { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        <div className={vazirmatn.className}>
          <Calendar
            mode='single'
            defaultMonth={date}
            selected={date}
            onSelect={setDate}
            className='rounded-lg border'
          />
        </div>
      </section>
      <section className='space-y-4'>
        <h2>رویداد ها</h2>
        <div className='gap-4 flex flex-col'>
          {NOTIFICATIONS.map((n) => (
            <Notification key={n.reference} {...n} />
          ))}
        </div>
      </section>
    </div>
  );
}
