/*
  Warnings:

  - You are about to drop the column `isPaid` on the `orderlines` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `orderlines` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orderlines" DROP COLUMN "isPaid",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
