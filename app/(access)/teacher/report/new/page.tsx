'use client';

import { useActionState, useEffect, useState } from 'react';

import saveReport from '@/feature/report/actions';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

type Reason = {
  value: string;
  label: string;
};

type ReasonMap = {
  [category: string]: Reason[];
};

const REASONS: ReasonMap = {
  DISCIPLINE: [{ value: 'توحین-به-معلم', label: 'توحین به معلم' }],
  REWARD: [{ value: 'خوب', label: 'خوب' }],
};

export default function Page() {
  const [state, formAction, pending] = useActionState(saveReport, { ok: false, message: '' });
  const [category, setCategory] = useState<'REWARD' | 'DISCIPLINE'>('REWARD');
  const [reason, setReason] = useState<string>();
  const [note, setNote] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  useEffect(() => {
    console.log(state.data);
    if (state.ok) {
      toast.success(state.message);
    } else if (!state.ok && state.message.length > 0) {
      toast.error(state.message);
    }
  }, [state.message, state.ok]);

  return (
    <>
      <form action={formAction}>
        <select
          name='category'
          defaultValue={category}
          onChange={(e) => setCategory(e.target.value as 'REWARD' | 'DISCIPLINE')}
        >
          <option value={'REWARD'}>تشویقی</option>
          <option value={'DISCIPLINE'}>انضباطی</option>
        </select>
        <select
          name='reason'
          defaultValue={reason}
          onChange={(e) => setReason(e.target.value as string)}
        >
          {REASONS[category].map((r) => (
            <option value={r.value}>{r.label}</option>
          ))}
        </select>
        <input
          type='date'
          name='date'
          defaultValue={date.toLocaleString()}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
        <textarea value={note} onChange={(e) => setNote(e.target.value)} name='note'></textarea>
        <Button disabled={pending} type='submit'>
          {pending ? <Spinner /> : 'ذخیره'}
        </Button>
      </form>
    </>
  );
}
