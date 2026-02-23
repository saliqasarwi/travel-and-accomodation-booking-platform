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
export type CreateBookingResponse = {
  bookingId: number;
  confirmationNumber: string;
};

export type CreateBookingPayload = {
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  paymentInfo: {
    method: "credit_card" | "pay_at_hotel";
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
    cardholderName?: string;
  };
  specialRequests: {
    notes: string;
  };
  items: Array<{
    id: string;
    hotelId: number;
    hotelName: string;
    cityName: string;
    starRating: number;
    roomType: string;
    roomPhotoUrl?: string;
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    children: number;
    numberOfRooms: number;
    pricePerNight: number;
    discount?: number;
  }>;
};
