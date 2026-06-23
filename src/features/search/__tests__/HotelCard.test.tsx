import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi, beforeEach } from "vitest";
import HotelCard from "../components/HotelCard";
import type { HotelSearchItem } from "../types/types";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => {
      if (key === "search.offPercent") return `${options?.value}% off`;
      if (key === "search.starHotel") return `${options?.count} star hotel`;
      if (key === "search.perNight") return "per night";
      if (key === "search.adults") return `${options?.count} adults`;
      if (key === "search.children") return `${options?.count} children`;
      if (key === "search.rooms") return `${options?.count} rooms`;
      return key;
    },
    i18n: {
      language: "en",
    },
  }),
}));

vi.mock("@shared/utils/localize", () => ({
  localizeField: (
    value: string | Record<string, string> | undefined,
    language: string
  ) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value[language] ?? value.en ?? Object.values(value)[0] ?? "";
  },
}));

const hotelMock: HotelSearchItem = {
  hotelId: 7,
  hotelName: "Royal Hotel",
  starRating: 5,
  latitude: 0,
  longitude: 0,
  roomPrice: 180,
  roomType: "Deluxe",
  cityName: "Jenin",
  roomPhotoUrl: "/hotel.jpg",
  discount: 20,
  amenities: [{ id: 1, name: "WiFi", description: "Fast WiFi" }],
  numberOfChildren: 1,
  numberOfAdults: 2,
  numberOfRooms: 1,
  checkInDate: "2026-04-22",
  checkOutDate: "2026-04-25",
};

function renderWithRouter(route = "/search") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <HotelCard hotel={hotelMock} />
    </MemoryRouter>
  );
}

describe("HotelCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders hotel main information", () => {
    renderWithRouter();

    expect(screen.getByText("Royal Hotel")).toBeInTheDocument();
    expect(screen.getByText("$180 per night")).toBeInTheDocument();
    expect(screen.getByText("Deluxe • Jenin")).toBeInTheDocument();
    expect(screen.getByText("5 star hotel")).toBeInTheDocument();
  });

  it("renders hotel image with alt text", () => {
    renderWithRouter();

    expect(screen.getByAltText("Royal Hotel")).toBeInTheDocument();
  });

  it("renders discount chip when discount is greater than zero", () => {
    renderWithRouter();

    expect(screen.getByText("20% off")).toBeInTheDocument();
  });

  it("does not render discount chip when discount is zero", () => {
    const hotelWithoutDiscount = {
      ...hotelMock,
      discount: 0,
    };

    render(
      <MemoryRouter initialEntries={["/search"]}>
        <HotelCard hotel={hotelWithoutDiscount} />
      </MemoryRouter>
    );

    expect(screen.queryByText("20% off")).not.toBeInTheDocument();
  });

  it("renders default guests and rooms when search params are missing", () => {
    renderWithRouter();

    expect(screen.getByText("2 adults")).toBeInTheDocument();
    expect(screen.getByText("1 rooms")).toBeInTheDocument();
  });

  it("renders guests, children, rooms, and date range from search params", () => {
    renderWithRouter(
      "/search?checkInDate=2026-04-22&checkOutDate=2026-04-25&adults=3&children=2&numberOfRooms=2"
    );

    expect(screen.getByText("2026-04-22 → 2026-04-25")).toBeInTheDocument();
    expect(screen.getByText("3 adults • 2 children")).toBeInTheDocument();
    expect(screen.getByText("2 rooms")).toBeInTheDocument();
  });

  it("does not render children text when children count is zero", () => {
    renderWithRouter(
      "/search?checkInDate=2026-04-22&checkOutDate=2026-04-25&adults=3&children=0&numberOfRooms=2"
    );

    expect(screen.getByText("3 adults")).toBeInTheDocument();
    expect(screen.queryByText(/children/i)).not.toBeInTheDocument();
  });

  it("navigates to hotel details with current search params when card is clicked", () => {
    renderWithRouter(
      "/search?city=Jenin&checkInDate=2026-04-22&checkOutDate=2026-04-25"
    );

    fireEvent.click(screen.getByRole("button"));

    expect(mockNavigate).toHaveBeenCalledWith(
      "/hotels/7?city=Jenin&checkInDate=2026-04-22&checkOutDate=2026-04-25"
    );
  });
});
