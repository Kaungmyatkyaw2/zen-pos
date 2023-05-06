import { Category_Menu_Items } from "./Category.types";
import { Option } from "./Option.types";

export interface Menu {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
  description: string | null;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
  image_public_id: string | null;
  category_menu_items: Category_Menu_Items[];
  options: Option[];
}
