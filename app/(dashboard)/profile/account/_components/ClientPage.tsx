'use client';
import { FormEvent, ReactNode, useRef } from 'react';

import { editUserData, uploadProfileImage } from '@/feature/user/actions';
import { User } from '@/lib/generated/prisma/client';
import { Camera, Check } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

import {
  Header,
  HeaderBackButton,
  HeaderCenterSection,
  HeaderLeftSection,
  HeaderRightSection,
  HeaderTitle,
} from '@/components/common/Header';
import UserAvatar from '@/components/common/UserAvatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

export default function ClientPage({ user }: { user: Omit<User, 'password'> }) {
  const profileForm = useRef<HTMLFormElement>(null);
  const userSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const result = await editUserData(formData);
      if (!result.ok) return toast.error(result.message);
      toast.success(result.message);
    } catch {
      toast.error('خطا');
    }
  };

  const profileSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await uploadProfileImage(new FormData(e.currentTarget));
      if (!result.ok) return toast.error(result.message);
      toast.success(result.message);
    } catch (error) {
      throw new Error(String(error));
    }
  };

  return (
    <>
      {/* profile section */}
      <section className='mt-15'>
        <div className='flex flex-col items-center justify-center w-full pb-2'>
          <div className='relative bg-transparent rounded-full'>
            <form ref={profileForm} onSubmit={profileSubmitHandler} method='POST' className='mt-10'>
              <label htmlFor='profileInput'>
                <div className='relative ring-1 ring-offset-4 bg-transparent rounded-full ring-offset-background ring-rose-500/50'>
                  <UserAvatar src={user.profileImage ?? ''} fallback={user.firstName[0]} />
                  <div className='absolute bottom-0 right-0 size-8 flex items-center justify-center bg-rose-500 shadow-sm rounded-full overflow-auto!'>
                    <Camera className='text-white size-5' />
                  </div>
                </div>
              </label>
              <input
                id='profileInput'
                type='file'
                name='profileImage'
                accept='image/*'
                className='hidden'
                onChange={() => profileForm.current?.requestSubmit()}
              />
            </form>
          </div>

          <p className='font-bold text-lg mt-4 mb-1'>
            {user?.firstName} {user?.lastName}
          </p>

          <span className='text-muted-foreground text-sm'>انلاین</span>
        </div>
      </section>

      <form onSubmit={userSubmitHandler} method='post'>
        <Header>
          <HeaderLeftSection>
            <HeaderBackButton />
          </HeaderLeftSection>
          <HeaderCenterSection>
            <HeaderTitle>حساب شما</HeaderTitle>
          </HeaderCenterSection>
          <HeaderRightSection>
            <SubmitButton />
          </HeaderRightSection>
        </Header>
        <section className='space-y-4'>
          <CustomAccordion title={'اطلاعات فردی'} open>
            <Label htmlFor='firstName'>نام</Label>
            <Input type='text' id='firstName' name='firstName' defaultValue={user?.firstName} />
            <Label htmlFor='lastName'>نام خانوادگی</Label>
            <Input type='text' id='lastName' name='lastName' defaultValue={user?.lastName} />
            {/* <Label htmlFor='me'>تاریخ تولد</Label> */}
            {/* < */}
            <Label htmlFor='nationalCode'>کد ملی</Label>
            <Input
              type='text'
              id='nationalCode'
              name='nationalCode'
              defaultValue={user?.nationalCode ?? undefined}
            />
            <Label htmlFor='housePhone'>تلفن منزل</Label>
            <Input
              type='text'
              id='housePhone'
              name='housePhone'
              defaultValue={user?.housePhone ?? undefined}
            />
            <Label htmlFor='address'>ادرس منزل</Label>
            <Input
              type='text'
              id='address'
              name='address'
              defaultValue={user?.address ?? undefined}
            />
            <Label htmlFor='phone'>موبایل</Label>
            <Input type='text' id='phone' name='phone' defaultValue={user?.phone ?? undefined} />
            <Label htmlFor='email'>ایمیل</Label>
            <Input type='text' id='email' name='email' defaultValue={user?.email ?? undefined} />
            <Label htmlFor='emergencyPhone'>شماره تماس اظطراری</Label>
            <Input
              type='text'
              id='emergencyPhone'
              name='emergencyPhone'
              defaultValue={user?.emergencyPhone ?? undefined}
            />
          </CustomAccordion>
          <CustomAccordion title='اطلاعات پدر'>
            <Label htmlFor='fatherPhone'>تلفن همراه پدر</Label>
            <Input
              type='text'
              id='fatherPhone'
              name='fatherPhone'
              defaultValue={user?.fatherPhone ?? ''}
            />

            <Label htmlFor='fatherEmail'>ایمیل پدر</Label>
            <Input
              type='text'
              id='fatherEmail'
              name='fatherEmail'
              defaultValue={user?.fatherEmail ?? ''}
            />

            <Label htmlFor='fatherJob'>شغل پدر</Label>
            <Input
              type='text'
              id='fatherJob'
              name='fatherJob'
              defaultValue={user?.fatherJob ?? ''}
            />

            <Label htmlFor='fatherJobAddress'>آدرس محل کار پدر</Label>
            <Input
              type='text'
              id='fatherJobAddress'
              name='fatherJobAddress'
              defaultValue={user?.fatherJobAddress ?? ''}
            />

            <Label htmlFor='fatherJobPhone'>شماره تلفن محل کار پدر</Label>
            <Input
              type='text'
              id='fatherJobPhone'
              name='fatherJobPhone'
              defaultValue={user?.fatherJobPhone ?? ''}
            />
          </CustomAccordion>
          <CustomAccordion title='اطلاعات مادر'>
            <Label htmlFor='motherPhone'>تلفن همراه مادر</Label>
            <Input
              type='text'
              id='motherPhone'
              name='motherPhone'
              defaultValue={user?.motherPhone ?? ''}
            />

            <Label htmlFor='motherEmail'>ایمیل مادر</Label>
            <Input
              type='text'
              id='motherEmail'
              name='motherEmail'
              defaultValue={user?.motherEmail ?? ''}
            />

            <Label htmlFor='motherJob'>شغل مادر</Label>
            <Input
              type='text'
              id='motherJob'
              name='motherJob'
              defaultValue={user?.motherJob ?? ''}
            />

            <Label htmlFor='motherJobAddress'>آدرس محل کار مادر</Label>
            <Input
              type='text'
              id='motherJobAddress'
              name='motherJobAddress'
              defaultValue={user?.motherJobAddress ?? ''}
            />

            <Label htmlFor='motherJobPhone'>شماره تلفن محل کار مادر</Label>
            <Input
              type='text'
              id='motherJobPhone'
              name='motherJobPhone'
              defaultValue={user?.motherJobPhone ?? ''}
            />
          </CustomAccordion>
        </section>
      </form>
    </>
  );
}

function CustomAccordion({
  children,
  title,
  open,
}: {
  children: ReactNode[];
  title: string;
  open?: boolean;
}) {
  return (
    <Card className='p-0'>
      <CardContent>
        <Accordion defaultValue={open ? 'i' : ''} type='single' collapsible>
          <AccordionItem value='i'>
            <AccordionTrigger className='text-base items-center'>{title}</AccordionTrigger>
            <AccordionContent className='space-y-3 py-6 [&>input]:mb-5'>
              {children}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className='bg-transparent' variant={'ghost'}>
      {pending ? <Spinner className='size-5' /> : <Check className='size-5' />}
    </Button>
  );
}
