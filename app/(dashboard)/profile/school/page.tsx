// import ChangeSchoolButton from '@/app/(dashboard)/profile/school/_components/ChangeSchoolButton';
import { getUserSchools } from '@/feature/user/actions';
import { MoreVertical } from 'lucide-react';

import {
  Header,
  HeaderBackButton,
  HeaderCenterSection,
  HeaderLeftSection,
  HeaderRightSection,
  HeaderTitle,
} from '@/components/common/Header';
import UserAvatar from '@/components/common/UserAvatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default async function Page() {
  const schools = await getUserSchools();
  const school = schools[0].school;
  return (
    <div className='space-y-8'>
      <Header>
        <HeaderLeftSection>
          <HeaderBackButton />
        </HeaderLeftSection>
        <HeaderCenterSection>
          <HeaderTitle>اطلاعات مدرسه</HeaderTitle>
        </HeaderCenterSection>
        <HeaderRightSection>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>تغییر مدرسه</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </HeaderRightSection>
      </Header>
      {/* profile section */}
      <section className='mt-15'>
        <div className='flex flex-col items-center justify-center w-full pb-2'>
          <div className='relative bg-transparent rounded-full mt-10'>
            <label htmlFor='profileInput'>
              <div className='relative ring-1 ring-offset-4 bg-transparent rounded-full ring-offset-background ring-rose-500/50'>
                <UserAvatar src={school.logo ?? ''} fallback={school.name[0]} />
              </div>
            </label>
          </div>

          <p className='font-bold text-lg mt-4 mb-1'>{school.name}</p>

          <span className='text-muted-foreground text-sm'>{school.establishedYear}</span>
        </div>
      </section>
      <section>
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات مدرسه</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2.5 [&>label]:mt-4'>
            <Label>شماره تماس</Label>
            <Input type='text' readOnly defaultValue={school.phoneNumber} />
            <Label>آدرس</Label>
            <Textarea readOnly defaultValue={school.address || ''} />
            <Label>نشانی ایمیل</Label>
            <Input type='text' readOnly defaultValue={school.email || ''} />
            <Label>نوع مدرسه</Label>
            <Input
              type='text'
              readOnly
              defaultValue={school.type === 'PUBLIC' ? 'دولتی' : 'غیر دولتی'}
            />
            <Label>درباره</Label>
            <Textarea readOnly defaultValue={school.about || ''} />
            <Label>نشانی وبسایت</Label>
            <Input type='text' readOnly defaultValue={school.website || ''} />
            <Label>تعداد کلاس ها</Label>
            <Input type='text' readOnly defaultValue={school.totalClasses || ''} />
          </CardContent>
        </Card>
      </section>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant='default' className='py-6 w-full text-lg'>
              تغییر مدرسه
            </Button>
          </DialogTrigger>
          <DialogContent showCloseButton={false} dir='rtl' className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>تغییر مدرسه</DialogTitle>
              <DialogDescription className='text-right px-2'>
                کد ورود ساخته شده توسط مدرسه مورد نظر را وارد کنید
              </DialogDescription>
            </DialogHeader>
            <div className='flex items-center gap-2'>
              <div className='grid flex-1 gap-2'>
                <Input id='code' placeholder='کد ورود' />
              </div>
            </div>
            <DialogFooter className='sm:justify-start'>
              <div className='space-x-3'>
                <Button className='inline-block'>تایید</Button>
                <DialogClose asChild>
                  <Button variant={'outline'} className='w-' type='button'>
                    صرف نظر
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
