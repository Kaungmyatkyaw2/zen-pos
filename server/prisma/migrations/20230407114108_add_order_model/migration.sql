-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "companyId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderlines" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT,
    "orderId" INTEGER NOT NULL,
    "menu_itemsId" INTEGER NOT NULL,

    CONSTRAINT "orderlines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_choicesToorderlines" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_choicesToorderlines_AB_unique" ON "_choicesToorderlines"("A", "B");

-- CreateIndex
CREATE INDEX "_choicesToorderlines_B_index" ON "_choicesToorderlines"("B");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderlines" ADD CONSTRAINT "orderlines_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderlines" ADD CONSTRAINT "orderlines_menu_itemsId_fkey" FOREIGN KEY ("menu_itemsId") REFERENCES "menu_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_choicesToorderlines" ADD CONSTRAINT "_choicesToorderlines_A_fkey" FOREIGN KEY ("A") REFERENCES "choices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_choicesToorderlines" ADD CONSTRAINT "_choicesToorderlines_B_fkey" FOREIGN KEY ("B") REFERENCES "orderlines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
