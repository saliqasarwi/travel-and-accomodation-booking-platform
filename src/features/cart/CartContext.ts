import React from "react";
import type { CartState, AddItemInput } from "./types/cart.types";

export type CartContextValue = {
  state: CartState;
  totalItems: number;
  addItem: (item: AddItemInput) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

export const CartContext = React.createContext<CartContextValue | null>(null);
