import { OrderDetail } from "./OrderDetail.type";
import { ShortUser } from "./User.type";

export type Order = {
  id: Number;
  date: Date;
  details: OrderDetail[];
  user: ShortUser;
};
