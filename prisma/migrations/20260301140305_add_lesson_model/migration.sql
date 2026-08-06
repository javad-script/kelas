/*
  Warnings:

  - You are about to drop the column `classTeacherId` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the `class_teachers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lessonClassId` to the `attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_classId_fkey";

-- DropForeignKey
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_classTeacherId_fkey";

-- DropForeignKey
ALTER TABLE "attendance_student" DROP CONSTRAINT "attendance_student_attendanceId_fkey";

-- DropForeignKey
ALTER TABLE "attendance_student" DROP CONSTRAINT "attendance_student_studentId_fkey";

-- DropForeignKey
ALTER TABLE "class_teachers" DROP CONSTRAINT "class_teachers_classId_fkey";

-- DropForeignKey
ALTER TABLE "class_teachers" DROP CONSTRAINT "class_teachers_teacherId_fkey";

-- DropIndex
DROP INDEX "attendance_classId_idx";

-- AlterTable
ALTER TABLE "attendance" DROP COLUMN "classTeacherId",
ADD COLUMN     "lessonClassId" INTEGER NOT NULL,
ALTER COLUMN "date" SET DATA TYPE DATE;

-- DropTable
DROP TABLE "class_teachers";

-- CreateTable
CREATE TABLE "lesson" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_class" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "teacherId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lesson_class_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lesson_name_key" ON "lesson"("name");

-- CreateIndex
CREATE INDEX "lesson_name_idx" ON "lesson"("name");

-- CreateIndex
CREATE INDEX "lesson_class_lessonId_teacherId_classId_idx" ON "lesson_class"("lessonId", "teacherId", "classId");

-- CreateIndex
CREATE UNIQUE INDEX "lesson_class_classId_lessonId_key" ON "lesson_class"("classId", "lessonId");

-- CreateIndex
CREATE INDEX "attendance_classId_date_idx" ON "attendance"("classId", "date");

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_classId_fkey" FOREIGN KEY ("classId") REFERENCES "class_rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_lessonClassId_fkey" FOREIGN KEY ("lessonClassId") REFERENCES "lesson_class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_student" ADD CONSTRAINT "attendance_student_attendanceId_fkey" FOREIGN KEY ("attendanceId") REFERENCES "attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_student" ADD CONSTRAINT "attendance_student_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_class" ADD CONSTRAINT "lesson_class_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_class" ADD CONSTRAINT "lesson_class_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_class" ADD CONSTRAINT "lesson_class_classId_fkey" FOREIGN KEY ("classId") REFERENCES "class_rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
