// دانش‌آموز
export type Student = {
  id: string;
  firstName: string;
  lastName?: string; // اختیاری
};

// وضعیت حضور غیاب یک دانش‌آموز
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';

// وضعیت دانش‌آموز برای Attendance
export type StudentStatus = {
  studentId: string;
  status: AttendanceStatus;
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
