/*
  Warnings:

  - You are about to drop the `table` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SELLER', 'CONSUMER');

-- DropForeignKey
ALTER TABLE "table" DROP CONSTRAINT "table_company_id_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "address" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "phoneNumber" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'SELLER';

-- DropTable
DROP TABLE "table";
