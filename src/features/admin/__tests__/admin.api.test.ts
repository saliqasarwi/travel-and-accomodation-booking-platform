import { describe, expect, it, vi, beforeEach } from "vitest";
import { httpClient } from "@shared/api/httpClient";
import {
  getAdminNavigation,
  getCities,
  createCity,
  updateCity,
  deleteCity,
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../api/admin.api";
import type { CityRow, HotelRow, RoomRow } from "../types/admin.types";

vi.mock("@shared/api/httpClient", () => ({
  httpClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("admin.api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches admin navigation", async () => {
    const data = [{ label: "Cities", path: "/admin/cities" }];

    vi.mocked(httpClient.get).mockResolvedValueOnce({ data });

    const result = await getAdminNavigation();

    expect(httpClient.get).toHaveBeenCalledWith("/admin/navigation");
    expect(result).toEqual(data);
  });

  it("fetches cities with params", async () => {
    const data = [
      {
        id: 1,
        name: "Jenin",
        country: "Palestine",
        postOffice: "00970",
        numberOfHotels: 4,
      },
    ];

    vi.mocked(httpClient.get).mockResolvedValueOnce({ data });

    const result = await getCities({ name: "Jenin" });

    expect(httpClient.get).toHaveBeenCalledWith("/cities", {
      params: { name: "Jenin" },
    });
    expect(result).toEqual(data);
  });

  it("creates a city", async () => {
    const payload = {
      name: "Jenin",
      country: "Palestine",
      postOffice: "00970",
      numberOfHotels: 4,
    };

    const data = [{ id: 1, ...payload }];

    vi.mocked(httpClient.post).mockResolvedValueOnce({ data });

    const result = await createCity(payload);

    expect(httpClient.post).toHaveBeenCalledWith("/cities", payload);
    expect(result).toEqual(data);
  });

  it("updates a city", async () => {
    const payload = {
      name: "Updated City",
      country: "Palestine",
    };

    const data = [{ id: 1, ...payload }];

    vi.mocked(httpClient.put).mockResolvedValueOnce({ data });

    const result = await updateCity(1, payload);

    expect(httpClient.put).toHaveBeenCalledWith("/cities/1", payload);
    expect(result).toEqual(data);
  });

  it("deletes a city", async () => {
    const data: CityRow[] = [];

    vi.mocked(httpClient.delete).mockResolvedValueOnce({ data });

    const result = await deleteCity(1);

    expect(httpClient.delete).toHaveBeenCalledWith("/cities/1");
    expect(result).toEqual(data);
  });

  it("fetches hotels with params", async () => {
    const data = [
      {
        id: 1,
        hotelName: "Cinema Hotel",
        starRating: 5,
        availableRooms: 10,
        location: "Jenin",
      },
    ];

    vi.mocked(httpClient.get).mockResolvedValueOnce({ data });

    const result = await getHotels({ hotelName: "Cinema" });

    expect(httpClient.get).toHaveBeenCalledWith("/hotels", {
      params: { hotelName: "Cinema" },
    });
    expect(result).toEqual(data);
  });

  it("creates a hotel", async () => {
    const payload = {
      hotelName: "Cinema Hotel",
      starRating: 5,
      availableRooms: 10,
      location: "Jenin",
    };

    const data = [{ id: 1, ...payload }];

    vi.mocked(httpClient.post).mockResolvedValueOnce({ data });

    const result = await createHotel(payload);

    expect(httpClient.post).toHaveBeenCalledWith("/hotels", payload);
    expect(result).toEqual(data);
  });

  it("updates a hotel", async () => {
    const payload = {
      hotelName: "Updated Hotel",
      starRating: 4,
    };

    const data = [{ id: 1, ...payload }];

    vi.mocked(httpClient.put).mockResolvedValueOnce({ data });

    const result = await updateHotel(1, payload);

    expect(httpClient.put).toHaveBeenCalledWith("/hotels/1", payload);
    expect(result).toEqual(data);
  });

  it("deletes a hotel", async () => {
    const data: HotelRow[] = [];

    vi.mocked(httpClient.delete).mockResolvedValueOnce({ data });

    const result = await deleteHotel(1);

    expect(httpClient.delete).toHaveBeenCalledWith("/hotels/1");
    expect(result).toEqual(data);
  });

  it("fetches rooms with params", async () => {
    const data = [
      {
        roomId: 1,
        roomNumber: 101,
        availability: true,
        adultCapacity: 2,
        childrenCapacity: 1,
      },
    ];

    vi.mocked(httpClient.get).mockResolvedValueOnce({ data });

    const result = await getRooms({ roomNumber: "101" });

    expect(httpClient.get).toHaveBeenCalledWith("/rooms", {
      params: { roomNumber: "101" },
    });
    expect(result).toEqual(data);
  });

  it("creates a room", async () => {
    const payload = {
      roomNumber: 101,
      availability: true,
      adultCapacity: 2,
      childrenCapacity: 1,
    };

    const data = [{ roomId: 1, ...payload }];

    vi.mocked(httpClient.post).mockResolvedValueOnce({ data });

    const result = await createRoom(payload);

    expect(httpClient.post).toHaveBeenCalledWith("/rooms", payload);
    expect(result).toEqual(data);
  });

  it("updates a room", async () => {
    const payload = {
      roomNumber: 102,
      availability: false,
    };

    const data = [{ roomId: 1, ...payload }];

    vi.mocked(httpClient.put).mockResolvedValueOnce({ data });

    const result = await updateRoom(1, payload);

    expect(httpClient.put).toHaveBeenCalledWith("/rooms/1", payload);
    expect(result).toEqual(data);
  });

  it("deletes a room", async () => {
    const data: RoomRow[] = [];

    vi.mocked(httpClient.delete).mockResolvedValueOnce({ data });

    const result = await deleteRoom(1);

    expect(httpClient.delete).toHaveBeenCalledWith("/rooms/1");
    expect(result).toEqual(data);
  });
});
