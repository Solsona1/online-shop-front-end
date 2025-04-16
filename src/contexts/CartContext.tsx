import { createContext, ReactNode, useState } from "react";
import { OrderDetail } from "../types";

interface CartContextType {
  cart: OrderDetail[];
  setCart: (details: OrderDetail[]) => void;
  addCartItem: (detail: OrderDetail) => void;
  removeCartItem: (detail: OrderDetail) => void;
  cleanCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  cleanCart: () => {},
});

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<OrderDetail[]>([]);

  const findItem = (targetItem: OrderDetail) =>
    cart.find(item => item.product.id === targetItem.product.id);

  const replaceItem = (newItem: OrderDetail) => {
    const auxCart = cart.map(detail => {
      if (detail.product.id === newItem.product.id) {
        return newItem;
      } else {
        return detail;
      }
    });

    setCart(auxCart);
  };

  const addItem = (newItem: OrderDetail) => {
    setCart([...cart, newItem]);
  };

  const addCartItem = (newDetail: OrderDetail) => {
    findItem(newDetail) ? replaceItem(newDetail) : addItem(newDetail);
  };

  const removeCartItem = (targetItem: OrderDetail) => {
    setCart(cart.filter(item => item.product.id !== targetItem.product.id));
  };

  const cleanCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addCartItem, removeCartItem, cleanCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
