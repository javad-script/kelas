/*
  Warnings:

  - The primary key for the `attendance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `attendance_student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `class_rooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `schools` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_StudentClasses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StudentClasses" DROP CONSTRAINT "_StudentClasses_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudentClasses" DROP CONSTRAINT "_StudentClasses_B_fkey";

-- DropForeignKey
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_classId_fkey";

-- DropForeignKey
ALTER TABLE "attendance_student" DROP CONSTRAINT "attendance_student_attendanceId_fkey";

-- DropForeignKey
ALTER TABLE "attendance_student" DROP CONSTRAINT "attendance_student_studentId_fkey";

-- DropForeignKey
ALTER TABLE "class_rooms" DROP CONSTRAINT "class_rooms_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "class_teachers" DROP CONSTRAINT "class_teachers_classId_fkey";

-- DropForeignKey
ALTER TABLE "class_teachers" DROP CONSTRAINT "class_teachers_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "school_users" DROP CONSTRAINT "school_users_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "school_users" DROP CONSTRAINT "school_users_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_parentId_fkey";

-- AlterTable
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "classId" SET DATA TYPE TEXT,
ADD CONSTRAINT "attendance_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "attendance_id_seq";

-- AlterTable
ALTER TABLE "attendance_student" DROP CONSTRAINT "attendance_student_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "attendanceId" SET DATA TYPE TEXT,
ALTER COLUMN "studentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "attendance_student_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "attendance_student_id_seq";

-- AlterTable
ALTER TABLE "class_rooms" DROP CONSTRAINT "class_rooms_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "schoolId" SET DATA TYPE TEXT,
ADD CONSTRAINT "class_rooms_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "class_rooms_id_seq";

-- AlterTable
ALTER TABLE "class_teachers" ALTER COLUMN "teacherId" SET DATA TYPE TEXT,
ALTER COLUMN "classId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "school_users" ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "schoolId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "schools" DROP CONSTRAINT "schools_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "schools_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "schools_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "parentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- DropTable
DROP TABLE "_StudentClasses";

-- CreateTable
CREATE TABLE "student_classes" (
    "id" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,

    CONSTRAINT "student_classes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_classes_studentId_classId_key" ON "student_classes"("studentId", "classId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school_users" ADD CONSTRAINT "school_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school_users" ADD CONSTRAINT "school_users_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_classes" ADD CONSTRAINT "student_classes_classId_fkey" FOREIGN KEY ("classId") REFERENCES "class_rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_rooms" ADD CONSTRAINT "class_rooms_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_teachers" ADD CONSTRAINT "class_teachers_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_teachers" ADD CONSTRAINT "class_teachers_classId_fkey" FOREIGN KEY ("classId") REFERENCES "class_rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_classId_fkey" FOREIGN KEY ("classId") REFERENCES "class_rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_student" ADD CONSTRAINT "attendance_student_attendanceId_fkey" FOREIGN KEY ("attendanceId") REFERENCES "attendance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_student" ADD CONSTRAINT "attendance_student_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
