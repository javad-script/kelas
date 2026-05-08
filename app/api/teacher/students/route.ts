import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const currentUser = await getCurrentUser();
  try {
    const classes = await prisma.lessonClass.findMany({
      where: {
        teacherId: currentUser?.id, // فیلتر بر اساس ID معلم
      },
      select: {
        class: { include: { studentClass: { select: { student: true } } } },
      },
      distinct: ['classId'],
    });
    const simplifiedData = classes.map((item) => {
      const classInfo = item.class;

      // استخراج لیست دانش‌آموزان و ساده‌سازی آن‌ها
      const students =
        classInfo.studentClass?.map((sc) => ({
          id: sc.student.id,
          fullName: `${sc.student.firstName} ${sc.student.lastName}`,
          username: sc.student.username,
          profileImage: sc.student.profileImage,
        })) || [];

      return {
        id: classInfo.id,
        name: classInfo.name,
        grade: classInfo.grade,
        schoolId: classInfo.schoolId,
        // تاریخ‌ها را حذف کردیم چون معمولاً در لیست نهایی نیاز نیستند
        students: students,
      };
    });

    console.log(simplifiedData);

    return NextResponse.json(simplifiedData);
  } catch (error) {
    console.error('Error fetching teacher classes:', error);
    throw error;
  }
}
