-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'PREPARING', 'COMPLETE');

-- AlterTable
ALTER TABLE "orderlines" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
