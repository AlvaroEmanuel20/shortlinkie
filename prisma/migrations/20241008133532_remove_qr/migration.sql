/*
  Warnings:

  - You are about to drop the `QrCodeConfig` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QrCodeConfig" DROP CONSTRAINT "QrCodeConfig_userId_fkey";

-- DropTable
DROP TABLE "QrCodeConfig";
