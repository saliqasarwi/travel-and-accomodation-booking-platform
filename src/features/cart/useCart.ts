import React from "react";
import { CartContext } from "./CartContext";

export function useCart() {
  const ctx = React.useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }

  return ctx;
}
