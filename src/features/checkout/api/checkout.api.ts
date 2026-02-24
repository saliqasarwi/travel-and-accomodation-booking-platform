import { httpClient } from "@shared/api/httpClient";
import type {
  CreateBookingPayload,
  CreateBookingResponse,
} from "../types/checkout.types";
export async function createBooking(payload: CreateBookingPayload) {
  const res = await httpClient.post<CreateBookingResponse>(
    "/bookings",
    payload
  );
  return res.data;
}
