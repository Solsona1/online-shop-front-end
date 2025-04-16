import { Order } from "./Order.type";
import { Role } from "./Role.enum";

export type User = {
  id: number;
  email: string;
  password: string;
  role: Role;
  orders?: Order[];
};

export type ShortUser = {
  id: number;
};
