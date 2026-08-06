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
      distinct: ['classId'],
    });

    return NextResponse.json(classes);
  } catch (error) {
    console.error('Error fetching teacher classes:', error);
    throw error;
  }
}
