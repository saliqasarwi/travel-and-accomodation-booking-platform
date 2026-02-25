import type { CartItem } from "@features/cart/types/cart.types";
import { nightsBetween } from "./formatters";

export function calculateBookingTotals(items: CartItem[]) {
  const calculations = items.map((item) => {
    const nights = nightsBetween(item.checkInDate, item.checkOutDate);
    const roomsCount = item.numberOfRooms || 1;
    const itemPrice = item.pricePerNight * roomsCount * nights;
    const discountPercentage = item.discount ?? 0;
    const discountAmount = itemPrice * (discountPercentage / 100);

    return {
      subtotal: itemPrice,
      discount: discountAmount,
    };
  });

  const subtotal = calculations.reduce((sum, calc) => sum + calc.subtotal, 0);
  const discounts = calculations.reduce((sum, calc) => sum + calc.discount, 0);
  const total = Math.max(0, subtotal - discounts);

  return { subtotal, discounts, total };
}
