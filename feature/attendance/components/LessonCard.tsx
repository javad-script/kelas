import Link from 'next/link';

import { ClassRoom, Lesson } from '@/lib/generated/prisma/client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type LessonCardProps = {
  lesson: Pick<Lesson, 'id' | 'name'>;
  classData: Pick<ClassRoom, 'grade' | 'name'>;
  isAttendance: boolean;
  schoolPeriod: number;
  targetDate: Date;
};

export default async function LessonCard({
  lesson,
  classData,
  isAttendance,
  targetDate,
  schoolPeriod,
}: LessonCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {schoolPeriod} : {lesson.name} <sup>({classData.grade})</sup>
        </CardTitle>
        <CardDescription>
          <Badge className={isAttendance ? 'bg-green-500' : 'bg-destructive'}>
            {isAttendance ? 'ثبت شده' : 'بدون حضور غیاب'}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>{classData.name}</CardContent>
      <CardFooter>
        <Link
          href={{
            pathname: './attendance/new/',
            query: {
              lessonClassId: lesson.id,
              schoolPeriod: schoolPeriod,
              date: targetDate.toLocaleString(),
            },
          }}
          className='w-full'
        >
          <Button variant={'outline'} className='w-full bg-transparent py-5'>
            ورود به دفتر
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
