import Link from 'next/link';

import { getCurrentUser } from '@/lib/auth/session';
import { ClassRoom, Lesson } from '@/lib/generated/prisma/client';
import { prisma } from '@/lib/prisma';

import TopNavigator from '@/components/common/TopNavigator';
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

export default async function Page() {
  const user = await getCurrentUser();
  const lessons = await prisma.lessonClass.findMany({
    where: { teacherId: user?.id },
    include: { teacher: true, lesson: true, class: true },
  });
  return (
    <div className='pt-12'>
      <TopNavigator></TopNavigator>
      {lessons.map((l) => (
        <LessonCard key={l.id} lesson={l.lesson} classData={l.class} />
      ))}
    </div>
  );
}

type LessonCardProps = {
  lesson: Lesson;
  classData: ClassRoom;
};

function LessonCard({ lesson, classData }: LessonCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          زنگ اول : {lesson.name} <sup>({classData.grade})</sup>
        </CardTitle>
        <CardDescription>
          <Badge variant={'destructive'}>بدون حضور غیاب</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>{classData.name}</CardContent>
      <CardFooter>
        <Link
          href={{
            pathname: './attendance/new/',
            query: {
              lessonClassId: lesson.id,
              date: new Date().toLocaleDateString(),
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
