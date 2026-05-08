import { UserAttendanceStatus } from '@/lib/generated/prisma/enums';
import { User } from '@/types/user';

// دانش‌آموز
export type Student = {
  id: string;
  firstName: string;
  lastName?: string; // اختیاری
};

// وضعیت حضور غیاب یک دانش‌آموز

// وضعیت دانش‌آموز برای Attendance
export type StudentStatus = {
  student: User;
  userStatus: UserAttendanceStatus;
  lateMinutes?: number;
  note?: string;
};

// داده‌های ورودی Server Action
export type SaveAttendanceInput = {
  classId: string;
  teacherId: string;
  studentStatuses: StudentStatus[];
};

// مدل Attendance که Server Action می‌سازه (optional)
export type AttendanceWithStudents = {
  id: string;
  date: Date;
  classId: string;
  classTeacherId: string;
  students: StudentStatus[];
};
