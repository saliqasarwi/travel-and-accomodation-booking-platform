import type {
  GuestInfo,
  PaymentInfo,
  SpecialRequests,
} from "@features/checkout/types/checkout.types";
import type { CartItem } from "@features/cart/types/cart.types";

export type BookingRequestPayload = {
  guestInfo: GuestInfo;
  paymentInfo: PaymentInfo;
  specialRequests: SpecialRequests;
  items: CartItem[];
};

export type BookingApiResponse = {
  bookingId: number;
  confirmationNumber: string;
  bookingStatus: string;
  createdAt: string;
  request: BookingRequestPayload;
};
