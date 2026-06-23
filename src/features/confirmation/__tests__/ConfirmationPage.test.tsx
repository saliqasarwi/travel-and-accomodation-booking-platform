import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi, beforeEach } from "vitest";
import ConfirmationPage from "../pages/ConfirmationPage";
import { getBookingDetails } from "../api/confirmation.api";
import { printBookingDocument } from "../components/printBookingDocument";
import type { BookingApiResponse } from "../types/confirmation.types";

vi.mock("../api/confirmation.api", () => ({
  getBookingDetails: vi.fn(),
}));

vi.mock("../components/printBookingDocument", () => ({
  printBookingDocument: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      language: "en",
    },
    t: (key: string) => {
      const translations: Record<string, string> = {
        "common.loading": "Loading",
        "common.backToHome": "Back to Home",
        "common.printBooking": "Print Booking",
        "confirmation.title": "Booking Confirmation",
        "confirmation.subtitle": "Your booking has been confirmed.",
        "confirmation.bookingConfirmed": "Booking Confirmed",
        "confirmation.keepForRecords": "Keep this for your records",
        "confirmation.confirmationNumber": "Confirmation Number",
        "confirmation.created": "Created",
        "confirmation.night": "night",
        "confirmation.roomsLabel": "Rooms",
        "confirmation.nightsLabel": "nights",
        "confirmation.totalLabel": "Total",
        "confirmation.totals": "Totals",
        "confirmation.subtotal": "Subtotal",
        "confirmation.discounts": "Discounts",
        "confirmation.total": "Total",
        "confirmation.guestInformation": "Guest Information",
        "confirmation.name": "Name",
        "confirmation.email": "Email",
        "confirmation.phone": "Phone",
        "confirmation.specialRequests": "Special Requests",
        "confirmation.noSpecialRequests": "No special requests",
        "admin.adults": "Adults",
        "admin.children": "Children",
        "home.recentlyVisitedFallback": "Unknown date",
        "search.compareAndSort": "Compare and sort hotels",
      };
      return translations[key] ?? key;
    },
  }),
}));

vi.mock("@shared/utils/formatters", () => ({
  money: (value: number) => `$${value}`,
  formatDate: () => "June 1, 2026",
  formatVisitDate: (value: string) => value,
}));

vi.mock("@shared/utils/booking", () => ({
  nightsBetween: () => 3,
  calculateBookingTotals: () => ({
    subtotal: 360,
    discounts: 0,
    total: 360,
  }),
}));

const bookingMock: BookingApiResponse = {
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
    paymentInfo: {
      method: "credit_card",
      cardholderName: "Sali Qasarwi",
      cardNumber: "4242424242424242",
      cvv: "123",
    },
    specialRequests: {
      notes: "Near elevator",
    },
    items: [
      {
        id: "cart-1",
        hotelId: 1,
        hotelName: "Royal Hotel",
        cityName: "Nablus",
        starRating: 5,
        roomType: "Deluxe Room",
        roomPhotoUrl: "room.jpg",
        checkInDate: "2026-06-01",
        checkOutDate: "2026-06-04",
        adults: 2,
        children: 1,
        numberOfRooms: 1,
        pricePerNight: 120,
        discount: 0,
      },
    ],
  },
};

function renderPage(path = "/confirmation/123") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/confirmation/:bookingId" element={<ConfirmationPage />} />
        <Route path="/" element={<div>Home Page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ConfirmationPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state first", () => {
    vi.mocked(getBookingDetails).mockReturnValue(new Promise(() => {}));

    renderPage();

    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("fetches and renders booking confirmation details", async () => {
    vi.mocked(getBookingDetails).mockResolvedValueOnce(bookingMock);

    renderPage();

    await waitFor(() => {
      expect(getBookingDetails).toHaveBeenCalledWith(123);
    });

    expect(
      await screen.findByRole("heading", { name: /booking confirmation/i })
    ).toBeInTheDocument();

    expect(screen.getByText("CONF-123")).toBeInTheDocument();
    expect(screen.getByText("Confirmed")).toBeInTheDocument();

    expect(screen.getByText(/royal hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/deluxe room/i)).toBeInTheDocument();
    expect(screen.getByText(/nablus/i)).toBeInTheDocument();

    expect(screen.getByText(/sali qasarwi/i)).toBeInTheDocument();
    expect(screen.getByText(/sali@test.com/i)).toBeInTheDocument();
    expect(screen.getByText(/0599999999/i)).toBeInTheDocument();

    expect(screen.getByText("Near elevator")).toBeInTheDocument();

    expect(screen.getAllByText("$360").length).toBeGreaterThan(0);
  });

  it("prints booking when print button is clicked", async () => {
    const user = userEvent.setup();

    vi.mocked(getBookingDetails).mockResolvedValueOnce(bookingMock);

    renderPage();

    const printButton = await screen.findByRole("button", {
      name: /print booking/i,
    });

    await user.click(printButton);

    expect(printBookingDocument).toHaveBeenCalledWith(bookingMock);
  });

  it("shows error when booking id is invalid", async () => {
    renderPage("/confirmation/abc");

    expect(await screen.findByText("Invalid booking id")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /back to home/i })
    ).toBeInTheDocument();
  });

  it("shows error when api request fails", async () => {
    vi.mocked(getBookingDetails).mockRejectedValueOnce(
      new Error("Failed to load booking")
    );

    renderPage();

    expect(
      await screen.findByText("Failed to load booking")
    ).toBeInTheDocument();
  });

  it("navigates back to home when back button is clicked", async () => {
    const user = userEvent.setup();

    vi.mocked(getBookingDetails).mockResolvedValueOnce(bookingMock);

    renderPage();

    const backButton = await screen.findByRole("button", {
      name: /back to home/i,
    });

    await user.click(backButton);

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
