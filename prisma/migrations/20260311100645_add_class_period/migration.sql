/*
  Warnings:

  - A unique constraint covering the columns `[classId,date,lessonClassId,schoolPeriod]` on the table `attendance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[schoolPeriod,weekDay,classId]` on the table `lesson_class` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `schoolPeriod` to the `attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `lesson_class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolPeriod` to the `lesson_class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `lesson_class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekDay` to the `lesson_class` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WeekDays" AS ENUM ('SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY');

-- DropIndex
DROP INDEX "lesson_class_classId_lessonId_key";

-- AlterTable
ALTER TABLE "attendance" ADD COLUMN     "schoolPeriod" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "lesson_class" ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "schoolPeriod" INTEGER NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weekDay" "WeekDays" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "attendance_classId_date_lessonClassId_schoolPeriod_key" ON "attendance"("classId", "date", "lessonClassId", "schoolPeriod");

-- CreateIndex
CREATE UNIQUE INDEX "lesson_class_schoolPeriod_weekDay_classId_key" ON "lesson_class"("schoolPeriod", "weekDay", "classId");
