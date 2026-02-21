export type GuestInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type PaymentMethod = "credit_card" | "pay_at_hotel";

export type PaymentInfo = {
  method: PaymentMethod;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  cardholderName?: string;
};

export type SpecialRequests = {
  notes: string;
};

export type CheckoutFormState = {
  guest: GuestInfo;
  payment: PaymentInfo;
  specialRequests: SpecialRequests;
};
