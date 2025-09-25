/*
  Warnings:

  - You are about to drop the column `userId` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[projectId]` on the table `Membership` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Membership" DROP CONSTRAINT "Membership_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_assigneeId_fkey";

-- DropIndex
DROP INDEX "public"."Membership_projectId_userId_key";

-- AlterTable
ALTER TABLE "public"."Membership" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "ownerId";

-- DropTable
DROP TABLE "public"."User";

-- CreateIndex
CREATE UNIQUE INDEX "Membership_projectId_key" ON "public"."Membership"("projectId");
