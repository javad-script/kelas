// import ChangeSchoolButton from '@/app/(dashboard)/profile/school/_components/ChangeSchoolButton';
import { getUserSchools } from '@/feature/user/actions';

import TopNavigator from '@/components/common/TopNavigator';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default async function Page() {
  const schools = await getUserSchools();
  const school = schools[0].school;
  return (
    <div className='space-y-8 pt-8'>
      <TopNavigator>{/* <ChangeSchoolButton /> */}</TopNavigator>
      <section className=''>
        <div className='flex flex-col items-center justify-center w-full pb-2'>
          <div className='relative bg-transparent rounded-full'>
            <label htmlFor='profileInput'>
              <div className='relative bg-transparent rounded-full'>
                <UserAvatar src={school.logo || undefined} fallback={school.name[0]} />
              </div>
            </label>
          </div>

          <p className='font-bold text-lg mt-4 mb-1'>{school.name}</p>

          <p className='text-muted-foreground text-sm rtl flex items-center'>
            <span>سال تاسیس :</span>
            <span className='ltr inline-block align-text-bottom mx-1 mt-1'>
              {school.establishedYear}
            </span>
          </p>
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
