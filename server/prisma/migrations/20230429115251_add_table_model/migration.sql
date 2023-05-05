-- CreateTable
CREATE TABLE "table" (
    "id" SERIAL NOT NULL,
    "company_id" TEXT NOT NULL,
    "table_number" TEXT NOT NULL,
    "qr" TEXT NOT NULL,

    CONSTRAINT "table_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
