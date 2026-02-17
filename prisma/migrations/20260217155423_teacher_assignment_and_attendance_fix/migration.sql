/*
  Warnings:

  - You are about to drop the column `teacherId` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the `_TeacherClasses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TeacherClasses" DROP CONSTRAINT "_TeacherClasses_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeacherClasses" DROP CONSTRAINT "_TeacherClasses_B_fkey";

-- DropForeignKey
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_teacherId_fkey";

-- AlterTable
ALTER TABLE "attendance" DROP COLUMN "teacherId",
ADD COLUMN     "classTeacherId" INTEGER;

-- DropTable
DROP TABLE "_TeacherClasses";

-- CreateTable
CREATE TABLE "class_teachers" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,

    CONSTRAINT "class_teachers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "class_teachers_teacherId_classId_key" ON "class_teachers"("teacherId", "classId");

-- AddForeignKey
ALTER TABLE "class_teachers" ADD CONSTRAINT "class_teachers_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_teachers" ADD CONSTRAINT "class_teachers_classId_fkey" FOREIGN KEY ("classId") REFERENCES "class_rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_classTeacherId_fkey" FOREIGN KEY ("classTeacherId") REFERENCES "class_teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
