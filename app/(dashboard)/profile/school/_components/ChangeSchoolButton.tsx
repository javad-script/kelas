'use client';
import React from 'react';

import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export default function ChangeSchoolButton() {
  const { pending } = useFormStatus();
  return (
    <Button type='button' disabled={pending}>
      {pending ? <Spinner /> : 'تغییر مدرسه'}
    </Button>
  );
}
