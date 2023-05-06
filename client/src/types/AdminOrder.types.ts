import { Menu } from "./Menu.types";
import { Choice } from "./Option.types";
import { User } from "./User.types";

export interface Order {
  amount: number;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  isPaid: boolean;
  order_lines: OrderLine[];
  customer: User;
}

export interface OrderLine {
  description: string;
  menu_items: Menu;
  menu_itemsId: number;
  orderId: number;
  quantity: number;
  choices: Choice[];
  status: "PENDING" | "PREPARING" | "COMPLETE";
  id: number;
}
