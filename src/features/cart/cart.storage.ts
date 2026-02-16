import type { CartState } from "./types/cart.types";

const CART_KEY = "travel_cart_v1";

export function loadCartState(): CartState {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return { items: [] };

    const parsed = JSON.parse(raw) as CartState;
    return parsed?.items ? parsed : { items: [] };
  } catch {
    return { items: [] };
  }
}

export function saveCartState(state: CartState) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}
