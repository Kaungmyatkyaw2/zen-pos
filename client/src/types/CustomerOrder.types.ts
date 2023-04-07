import { Category_Menu_Items } from "./Category.types";
import { Choice } from "./Option.types";

export interface RTK_CusOrder {
  menu: Category_Menu_Items;
  quantity: number;
  description: string;
  choices: Choice[];
}
