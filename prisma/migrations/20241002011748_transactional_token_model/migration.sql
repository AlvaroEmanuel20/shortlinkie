/*
  Warnings:

  - You are about to drop the `ResetPassToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TransactionalTokenType" AS ENUM ('VERIFICATION', 'RESET_PASS');

-- DropForeignKey
ALTER TABLE "ResetPassToken" DROP CONSTRAINT "ResetPassToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "VerificationToken" DROP CONSTRAINT "VerificationToken_userId_fkey";

-- DropTable
DROP TABLE "ResetPassToken";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "TransactionalToken" (
    "token" TEXT NOT NULL,
    "exp" TIMESTAMP(3) NOT NULL,
    "tokenType" "TransactionalTokenType" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TransactionalToken_pkey" PRIMARY KEY ("token")
);

-- AddForeignKey
ALTER TABLE "TransactionalToken" ADD CONSTRAINT "TransactionalToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
