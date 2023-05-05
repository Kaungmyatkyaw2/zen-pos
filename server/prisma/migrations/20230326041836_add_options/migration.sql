-- CreateTable
CREATE TABLE "options" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL,
    "min" INTEGER NOT NULL,
    "max" INTEGER NOT NULL,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "choices" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "options_id" INTEGER NOT NULL,

    CONSTRAINT "choices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_menu_itemsTooptions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_menu_itemsTooptions_AB_unique" ON "_menu_itemsTooptions"("A", "B");

-- CreateIndex
CREATE INDEX "_menu_itemsTooptions_B_index" ON "_menu_itemsTooptions"("B");

-- AddForeignKey
ALTER TABLE "choices" ADD CONSTRAINT "choices_options_id_fkey" FOREIGN KEY ("options_id") REFERENCES "options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_menu_itemsTooptions" ADD CONSTRAINT "_menu_itemsTooptions_A_fkey" FOREIGN KEY ("A") REFERENCES "menu_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_menu_itemsTooptions" ADD CONSTRAINT "_menu_itemsTooptions_B_fkey" FOREIGN KEY ("B") REFERENCES "options"("id") ON DELETE CASCADE ON UPDATE CASCADE;
