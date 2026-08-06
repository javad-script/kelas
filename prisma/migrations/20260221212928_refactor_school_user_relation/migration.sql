/*
  Warnings:

  - You are about to drop the column `bannerImage` on the `schools` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_schoolId_fkey";

-- DropIndex
DROP INDEX "users_schoolId_idx";

-- AlterTable
ALTER TABLE "schools" DROP COLUMN "bannerImage";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "schoolId";

-- CreateTable
CREATE TABLE "school_users" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "school_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "school_users_userId_schoolId_key" ON "school_users"("userId", "schoolId");

-- AddForeignKey
ALTER TABLE "school_users" ADD CONSTRAINT "school_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school_users" ADD CONSTRAINT "school_users_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
