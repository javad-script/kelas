/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `schools` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `schools` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[website]` on the table `schools` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNumber` to the `schools` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SchoolType" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('ELEMENTARY', 'MIDDLE', 'HIGH');

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_schoolId_fkey";

-- AlterTable
ALTER TABLE "schools" ADD COLUMN     "about" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "bannerImage" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "establishedYear" INTEGER,
ADD COLUMN     "gradeLevel" "Grade",
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "totalClasses" INTEGER,
ADD COLUMN     "type" "SchoolType",
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "schoolId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "schools_phoneNumber_key" ON "schools"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "schools_email_key" ON "schools"("email");

-- CreateIndex
CREATE UNIQUE INDEX "schools_website_key" ON "schools"("website");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;
