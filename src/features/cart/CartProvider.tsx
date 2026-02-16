import React from "react";
import type { CartItem, CartState, AddItemInput } from "./types/cart.types";
import { loadCartState, saveCartState } from "./cart.storage";
import { CartContext } from "./CartContext";

function makeCartItemId(item: AddItemInput) {
  return [
    item.hotelId,
    item.roomType,
    item.checkInDate,
    item.checkOutDate,
    item.adults,
    item.children,
    item.numberOfRooms,
  ].join("|");
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CartState>(() => loadCartState());

  React.useEffect(() => {
    saveCartState(state);
  }, [state]);

  const addItem = React.useCallback((item: AddItemInput) => {
    const id = makeCartItemId(item);

    setState((prev: CartState): CartState => {
      const existing = prev.items.find((x) => x.id === id);

      if (existing) return prev;

      const newItem: CartItem = {
        ...item,
        id,
      };

      return { items: [...prev.items, newItem] };
    });
  }, []);

  const removeItem = React.useCallback((id: string) => {
    setState((prev: CartState) => ({
      items: prev.items.filter((x) => x.id !== id),
    }));
  }, []);

  const clearCart = React.useCallback(() => {
    setState({ items: [] });
  }, []);

  const totalItems = state.items.length;

  return (
    <CartContext.Provider
      value={{ state, totalItems, addItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
