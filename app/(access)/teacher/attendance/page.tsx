import Link from 'next/link';

import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

export default async function Page() {
  const user = await getCurrentUser();
  const result = await prisma.classTeacher.findMany({
    where: { teacherId: user?.id },
    include: { classRoom: true },
  });
  const clases = result.map((c) => c.classRoom);
  const date = new Date();
  return (
    <div>
      {clases.map((c) => (
        <div key={c.id}>
          <Link
            href={{
              pathname: './attendance/new/',
              query: { classId: c.id, date: date.toLocaleDateString() },
            }}
          >
            {c.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
