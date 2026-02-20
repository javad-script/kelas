'use client';

import { useActionState, useEffect } from 'react';

import { redirect } from 'next/navigation';

import { login } from '@/feature/auth/actions';
import { cn } from '@/lib/utils';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

import { Spinner } from '@/components/ui/spinner';

export default function Page() {
  const [state, loginAction] = useActionState(login, undefined);

  useEffect(() => {
    if (state?.errors?._form) {
      state.errors._form.forEach((e) =>
        toast.error('ورود با خطا مواجه شد', {
          description: e,
        }),
      );
    }
    if (state?.success) {
      toast.success('ورود با موفقیت انجام شد');
      setTimeout(() => redirect('/app'), 1000);
    }
  }, [state]);
  return (
    <form action={loginAction}>
      <input type='text' name='username' placeholder='username' />
      {state?.errors?.username && <p>{state.errors.username}</p>}
      <br />
      <input type='password' name='password' placeholder='password' />
      {state?.errors?.password && <p>{state.errors.password}</p>}

      <br />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className={cn('min-w-20 min-h-12 disabled:bg-blue-500 bg-blue-600')} disabled={pending}>
      <span className='h-8 flex items-center justify-center w-full '>
        {pending ? (
          <div className='flex items-center justify-center'>
            Logging in
            <Spinner />
          </div>
        ) : (
          'login'
        )}
      </span>
    </button>
  );
}
