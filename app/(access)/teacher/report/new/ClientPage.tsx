'use client';

import { useActionState, useEffect, useState } from 'react';

import saveReport from '@/feature/teacher/report/actions';
import { User } from '@/lib/generated/prisma/client';
import { toast } from 'sonner';

import { Header, HeaderBackButton, HeaderLeftSection } from '@/components/common/Header';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

// تعریف نوع‌ها
type Reason = { value: number; label: string };
type ReasonMap = { [category: string]: Reason[] };

const REASONS: ReasonMap = {
  DISCIPLINE: [
    { value: 100, label: 'توهین به معلم' },
    { value: 101, label: 'دیر آمدن به کلاس' },
    { value: 102, label: 'ناتمام گذاشتن تکالیف' },
    { value: 103, label: 'اختلال در نظم کلاس' },
    { value: 104, label: 'استفاده از گوشی در کلاس' },
    { value: 105, label: 'دعوا با همکلاسی‌ها' },
    { value: 106, label: 'غیبت بدون دلیل' },
    { value: 107, label: 'خوردن خوراکی در کلاس' },
    { value: 108, label: 'خوابیدن در کلاس' },
    { value: 109, label: 'نقاشی روی میز یا دیوار' },
    { value: 110, label: 'پرت کردن حواس دیگران' },
    { value: 111, label: 'عدم رعایت پوشش مناسب' },
    { value: 112, label: 'ورود بدون اجازه به دفتر' },
    { value: 113, label: 'دزدی از وسایل دیگران' },
    { value: 114, label: 'تخریب اموال مدرسه' },
    { value: 115, label: 'زبان نامناسب و فحاشی' },
    { value: 116, label: 'قلدری و آزار همکلاسی' },
    { value: 117, label: 'عدم شرکت در مراسمات مدرسه' },
    { value: 118, label: 'فرار از کلاس' },
    { value: 119, label: 'جعل امضا یا مدارک' },
  ],
  REWARD: [
    { value: 200, label: 'عملکرد خوب' },
    { value: 201, label: 'عملکرد عالی' },
    { value: 202, label: 'پیشرفت چشمگیر' },
    { value: 203, label: 'کمک به دوستان' },
    { value: 204, label: 'خلاقیت در پروژه' },
    { value: 205, label: 'حضور فعال در بحث‌ها' },
    { value: 206, label: 'نمره کامل در امتحان' },
    { value: 207, label: 'تمیزی و نظم شخصی' },
    { value: 208, label: 'مشارکت در فعالیت‌های فوق برنامه' },
    { value: 209, label: 'احترام به قوانین مدرسه' },
    { value: 210, label: 'حل مسئله به صورت گروهی' },
    { value: 211, label: 'نوشتن مقاله یا تحقیق برتر' },
    { value: 212, label: 'مهربانی و همدلی با دیگران' },
    { value: 213, label: 'رشد مهارت‌های هنری یا ورزشی' },
    { value: 214, label: 'رهبری و مدیریت تیم' },
    { value: 215, label: 'صداقت و راستگویی' },
    { value: 216, label: 'صرفه‌جویی در مصرف منابع' },
    { value: 217, label: 'یادگیری سریع مطالب جدید' },
    { value: 218, label: 'ایفای نقش مثبت در کلاس' },
    { value: 219, label: 'تشویق دیگران به تلاش بیشتر' },
  ],
};

export default function ReportPage() {
  const [state, formAction, pending] = useActionState(saveReport, { ok: false, message: '' });
  const [note, setNote] = useState('');
  const [date, setDate] = useState<string>('');
  const [category, setCategory] = useState<'DISCIPLINE' | 'REWARD'>('DISCIPLINE');
  const [classes, setClasses] = useState([]);

  // نمایش پیام‌های موفقیت یا خطا
  useEffect(() => {
    if (state.ok) {
      toast.success(state.message);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  // فرمت تاریخ برای اینپوت (YYYY-MM-DD)
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  useEffect(() => {
    const getStudents = async () => {
      await fetch('/api/teacher/students', { method: 'GET' }).then(async (data) => {
        setClasses(await data.json());
      });
    };

    getStudents();
  }, []);

  console.log(classes);

  return (
    <>
      <Header>
        <HeaderLeftSection>
          <HeaderBackButton />
        </HeaderLeftSection>
      </Header>

      <form action={formAction} className='space-y-4'>
        {/* انتخاب دسته */}
        <div>
          <label className='block text-sm font-medium mb-1'>نوع گزارش</label>
          <select
            name='category'
            className='w-full p-2 border rounded'
            defaultValue={category}
            onChange={(e) => setCategory(e.currentTarget.value as 'DISCIPLINE' | 'REWARD')}
          >
            <option value='REWARD'>تشویقی</option>
            <option value='DISCIPLINE'>انضباطی</option>
          </select>
        </div>

        {/* انتخاب دلیل (داینامیک بر اساس دسته) */}
        <div>
          <label className='block text-sm font-medium mb-1'>دلیل</label>
          <select
            name='reason'
            className='w-full p-2 border rounded'
            defaultValue={REASONS[category][0].value}
          >
            {REASONS[Object.keys(REASONS).find((k) => k === category) as keyof ReasonMap].map(
              (r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ),
            )}
          </select>
        </div>

        {/* تاریخ */}
        <div>
          <label className='block text-sm font-medium mb-1'>تاریخ</label>
          <input
            type='date'
            name='date'
            value={date || formatDate(new Date())}
            onChange={(e) => setDate(e.target.value)}
            className='w-full p-2 border rounded'
          />
        </div>

        {/* توضیحات */}
        <div>
          <label className='block text-sm font-medium mb-1'>توضیحات</label>
          <textarea
            name='note'
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className='w-full p-2 border rounded h-24'
            placeholder='توضیحات اضافی...'
          />
        </div>

        {classes.map((i) => (
          <div>
            <h1>{i.name}</h1>
            {i.students.map((j) => (
              <span>{j.fullName}</span>
            ))}
          </div>
        ))}

        {/* دکمه ارسال */}
        <Button type='submit' disabled={pending} className='w-full'>
          {pending ? <Spinner /> : 'ذخیره گزارش'}
        </Button>
      </form>
    </>
  );
}
