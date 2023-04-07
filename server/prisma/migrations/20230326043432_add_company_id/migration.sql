/*
  Warnings:

  - Added the required column `companyId` to the `options` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "options" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
