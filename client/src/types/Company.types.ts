import { Category } from "./Category.types";
import { Option } from "./Option.types";

export interface Company {
  id: string;
  name: string;
  currency: string;
  tax_rate: number;
  charge_rate: number;
  user_id: string;
  options: Option[];
  category: Category[];
  createdAt: Date;
  updatedAt: Date;
}
