import { describe, expect, it, vi } from "vitest";
import { getBookingDetails } from "../api/confirmation.api";
import { httpClient } from "@shared/api/httpClient";

vi.mock("@shared/api/httpClient", () => ({
  httpClient: {
    get: vi.fn(),
  },
}));

describe("getBookingDetails", () => {
  it("fetches booking details by booking id", async () => {
    const booking = {
      bookingId: 123,
      confirmationNumber: "CONF-123",
      bookingStatus: "Confirmed",
      createdAt: "2026-06-01T10:00:00Z",
      request: {
        guestInfo: {
          firstName: "Sali",
          lastName: "Qasarwi",
          email: "sali@test.com",
          phone: "0599999999",
        },
        paymentInfo: {},
        specialRequests: { notes: "Near elevator" },
        items: [],
      },
    };

    vi.mocked(httpClient.get).mockResolvedValueOnce({ data: booking });

    const result = await getBookingDetails(123);

    expect(httpClient.get).toHaveBeenCalledWith("/bookings/123");
    expect(result).toEqual(booking);
  });
});
