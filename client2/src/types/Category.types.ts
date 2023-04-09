import { Menu } from "./Menu.types";

export interface Category {
  id: number;
  name: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  category_menu_items: Category_Menu_Items[];
}

export interface Category_Menu_Items {
  id: number;
  menu_itemsId: number;
  menu_items: Menu;
  categoryId: number | null;
  category: Category;
  isAvailable: boolean;
}
