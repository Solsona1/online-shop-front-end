import { Category } from "./Category.type";

export type Product = {
  id: number;
  denomination: string;
  brand: string;
  model: string;
  price: number;
  availableStock: number;
  description: string;
  category: Category;
  image?: string;
};
