import { httpClient } from "@shared/api/httpClient";

export type BookingItem = {
  bookingId: number;
  confirmationNumber: string;
  bookingStatus: string;
  createdAt: string;
  request: {
    guestInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    items: Array<{
      id: string;
      hotelName: string;
      roomType: string;
      cityName: string;
      checkInDate: string;
      checkOutDate: string;
      numberOfRooms: number;
      pricePerNight: number;
    }>;
  };
};

export async function getBookings() {
  const res = await httpClient.get<BookingItem[]>("/bookings");
  return res.data;
}
