-- DropForeignKey
ALTER TABLE "category_menu_items" DROP CONSTRAINT "category_menu_items_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "category_menu_items" DROP CONSTRAINT "category_menu_items_menu_itemsId_fkey";

-- AddForeignKey
ALTER TABLE "category_menu_items" ADD CONSTRAINT "category_menu_items_menu_itemsId_fkey" FOREIGN KEY ("menu_itemsId") REFERENCES "menu_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_menu_items" ADD CONSTRAINT "category_menu_items_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
