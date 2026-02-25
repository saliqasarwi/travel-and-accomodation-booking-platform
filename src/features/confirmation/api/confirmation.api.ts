import { httpClient } from "@shared/api/httpClient";
import type { BookingApiResponse } from "../types/confirmation.types";

export async function getBookingDetails(
  bookingId: number
): Promise<BookingApiResponse> {
  const res = await httpClient.get<BookingApiResponse>(
    `/bookings/${bookingId}`
  );

  return res.data;
}
