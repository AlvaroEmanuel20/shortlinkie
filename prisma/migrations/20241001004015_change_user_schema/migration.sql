/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_avatarUrl_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatarUrl";
