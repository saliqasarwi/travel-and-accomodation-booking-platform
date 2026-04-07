import type { CheckoutFormValues } from "../types/checkout.types";

export const checkoutInitialValues: CheckoutFormValues = {
  guestInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  paymentInfo: {
    method: "credit_card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardholderName: "",
  },
  specialRequests: {
    notes: "",
  },
};

export function getNestedErrors<T = Record<string, string>>(
  errors: Record<string, unknown>,
  section: string
) {
  return (errors[section] ?? {}) as T;
}

export function getNestedTouched<T = Record<string, boolean>>(
  touched: Record<string, unknown>,
  section: string
) {
  return (touched[section] ?? {}) as T;
}
