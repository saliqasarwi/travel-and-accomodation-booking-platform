import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HotelPage from "../pages/HotelPage";
import type { HotelDetails } from "../types/hotel.types";
import type { AvailableRoom } from "../types/room.types";
import type { HotelReview } from "../types/review.types";

const mockGetHotelDetails = vi.fn();
const mockGetHotelGallery = vi.fn();
const mockGetAvailableRooms = vi.fn();
const mockGetHotelReviews = vi.fn();
const mockAddItem = vi.fn();

let mockHotelId = "7";
let mockSearch = "";

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );

  return {
    ...actual,
    useParams: () => ({
      hotelId: mockHotelId,
    }),
    useSearchParams: () => [new URLSearchParams(mockSearch)],
  };
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === "hotel.notFound") return "Hotel not found";
      return key;
    },
  }),
}));

vi.mock("@features/cart/useCart", () => ({
  useCart: () => ({
    addItem: mockAddItem,
  }),
}));

vi.mock("../api/hotel.api", () => ({
  getHotelDetails: (...args: unknown[]) => mockGetHotelDetails(...args),
  getHotelGallery: (...args: unknown[]) => mockGetHotelGallery(...args),
  getAvailableRooms: (...args: unknown[]) => mockGetAvailableRooms(...args),
  getHotelReviews: (...args: unknown[]) => mockGetHotelReviews(...args),
}));

vi.mock("../components/HotelInformation", () => ({
  default: ({ hotel }: { hotel: HotelDetails }) => (
    <div>Hotel Information: {hotel.hotelName}</div>
  ),
}));

vi.mock("../components/HotelReviews", () => ({
  default: ({ reviews }: { reviews: HotelReview[] }) => (
    <div>Hotel Reviews: {reviews.length}</div>
  ),
}));

vi.mock("../components/HotelGallery", () => ({
  default: ({ items }: { items: { url: string }[] }) => (
    <div>Hotel Gallery: {items.length}</div>
  ),
}));

vi.mock("../components/HotelLocationMap", () => ({
  default: ({ hotel }: { hotel: HotelDetails }) => (
    <div>Hotel Map: {hotel.location}</div>
  ),
}));

vi.mock("../components/HotelRooms", () => ({
  default: ({
    rooms,
    onAddToCart,
  }: {
    rooms: AvailableRoom[];
    onAddToCart: (room: AvailableRoom) => void;
  }) => (
    <div>
      <div>Hotel Rooms: {rooms.length}</div>
      {rooms[0] && (
        <button onClick={() => onAddToCart(rooms[0])}>Add mocked room</button>
      )}
    </div>
  ),
}));

const hotelMock: HotelDetails = {
  hotelName: "Cinema Hotel",
  location: "Jenin",
  description: "Nice hotel.",
  amenities: [{ id: 1, name: "WiFi" }],
  starRating: 5,
  availableRooms: 2,
  imageUrl: "/hotel.jpg",
  latitude: 32.46,
  longitude: 35.3,
};

const roomMock: AvailableRoom = {
  hotelId: 7,
  roomId: 10,
  roomNumber: "101",
  roomPhotoUrl: "/room.jpg",
  roomType: "Deluxe Room",
  capacityOfAdults: 2,
  capacityOfChildren: 1,
  amenities: [{ id: 1, name: "WiFi", description: "Fast WiFi" }],
  price: 150,
  availability: true,
};

const reviewMock: HotelReview = {
  reviewId: 1,
  customerName: "Sali",
  rating: 5,
  description: "Great hotel.",
};

function renderPage() {
  return render(
    <MemoryRouter>
      <HotelPage />
    </MemoryRouter>
  );
}

describe("HotelPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockHotelId = "7";
    mockSearch =
      "checkInDate=2026-04-22&checkOutDate=2026-04-25&adults=3&children=1&numberOfRooms=2";

    mockGetHotelDetails.mockResolvedValue(hotelMock);
    mockGetHotelGallery.mockResolvedValue([
      { url: "/hotel-1.jpg" },
      { url: "/hotel-2.jpg" },
    ]);
    mockGetAvailableRooms.mockResolvedValue([roomMock]);
    mockGetHotelReviews.mockResolvedValue([reviewMock]);
  });

  it("renders loading state initially", () => {
    mockGetHotelDetails.mockReturnValue(new Promise(() => {}));
    mockGetHotelGallery.mockReturnValue(new Promise(() => {}));
    mockGetAvailableRooms.mockReturnValue(new Promise(() => {}));
    mockGetHotelReviews.mockReturnValue(new Promise(() => {}));

    renderPage();

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("loads hotel data using hotel id from route params", async () => {
    renderPage();

    await waitFor(() => {
      expect(mockGetHotelDetails).toHaveBeenCalledWith(7);
    });

    expect(mockGetHotelGallery).toHaveBeenCalledWith(7);
    expect(mockGetAvailableRooms).toHaveBeenCalledWith(7);
    expect(mockGetHotelReviews).toHaveBeenCalledWith(7);
  });

  it("renders hotel page sections after successful load", async () => {
    renderPage();

    expect(
      await screen.findByText("Hotel Information: Cinema Hotel")
    ).toBeInTheDocument();

    expect(screen.getByText("Hotel Reviews: 1")).toBeInTheDocument();
    expect(screen.getByText("Hotel Gallery: 2")).toBeInTheDocument();
    expect(screen.getByText("Hotel Rooms: 1")).toBeInTheDocument();
    expect(screen.getByText("Hotel Map: Jenin")).toBeInTheDocument();
  });

  it("renders not found message when hotel is missing", async () => {
    mockGetHotelDetails.mockResolvedValue(null);
    mockGetHotelGallery.mockResolvedValue([]);
    mockGetAvailableRooms.mockResolvedValue([]);
    mockGetHotelReviews.mockResolvedValue([]);

    renderPage();

    expect(await screen.findByText("Hotel not found")).toBeInTheDocument();
  });

  it("adds selected room to cart with search params", async () => {
    renderPage();

    await screen.findByText("Hotel Rooms: 1");

    fireEvent.click(screen.getByRole("button", { name: "Add mocked room" }));

    expect(mockAddItem).toHaveBeenCalledWith({
      hotelId: 7,
      hotelName: "Cinema Hotel",
      cityName: "Jenin",
      starRating: 5,
      roomType: "Deluxe Room",
      roomPhotoUrl: "/room.jpg",
      checkInDate: "2026-04-22",
      checkOutDate: "2026-04-25",
      adults: 3,
      children: 1,
      numberOfRooms: 2,
      pricePerNight: 150,
      discount: 0,
    });
  });

  it("uses default booking values when search params are missing", async () => {
    mockSearch = "";

    renderPage();

    await screen.findByText("Hotel Rooms: 1");

    fireEvent.click(screen.getByRole("button", { name: "Add mocked room" }));

    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({
        checkInDate: "",
        checkOutDate: "",
        adults: 2,
        children: 0,
        numberOfRooms: 1,
      })
    );
  });

  it("renders not found when hotel id is invalid", async () => {
    mockHotelId = "invalid";

    renderPage();

    expect(await screen.findByText("Hotel not found")).toBeInTheDocument();

    expect(mockGetHotelDetails).not.toHaveBeenCalled();
    expect(mockGetHotelGallery).not.toHaveBeenCalled();
    expect(mockGetAvailableRooms).not.toHaveBeenCalled();
    expect(mockGetHotelReviews).not.toHaveBeenCalled();
  });

  it("renders not found when API request fails", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mockGetHotelDetails.mockRejectedValue(new Error("Network error"));

    renderPage();

    expect(await screen.findByText("Hotel not found")).toBeInTheDocument();

    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
