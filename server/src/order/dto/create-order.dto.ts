import { category_menu_items, choices, menu_items } from '@prisma/client';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

interface Category_Menu_Items extends category_menu_items {
  menu_items: menu_items;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  company_id: string;

  @IsArray()
  @IsNotEmpty()
  orderline: {
    menu: Category_Menu_Items;
    quantity: number;
    description: string;
    choices: choices[];
  }[];
  @IsNumber()
  @IsNotEmpty()
  taxRate: number;

  @IsNumber()
  @IsNotEmpty()
  chargeRate: number;
  @IsString()
  @IsNotEmpty()
  customer_id: string;
}
