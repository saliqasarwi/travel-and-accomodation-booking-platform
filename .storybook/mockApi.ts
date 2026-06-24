import type {
  AxiosAdapter,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { httpClient } from "../src/shared/api/httpClient";
import type {
  HotelSearchItem,
  Amenity,
} from "../src/features/search/types/types";

declare global {
  interface Window {
    __travelStorybookApiMocksInstalled?: boolean;
  }
}

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const storybookAmenities: Amenity[] = [
  { id: 1, name: "Free WiFi", description: "High-speed wireless internet" },
  { id: 2, name: "Pool", description: "Outdoor pool access" },
  { id: 3, name: "Breakfast", description: "Breakfast included" },
  { id: 4, name: "Airport shuttle", description: "Scheduled shuttle service" },
];

export const storybookSearchResults: HotelSearchItem[] = [
  {
    hotelId: 101,
    hotelName: "Azure Bay Resort",
    starRating: 4.7,
    latitude: 32.0853,
    longitude: 34.7818,
    roomPrice: 184,
    roomType: "Deluxe Sea View",
    cityName: "Tel Aviv",
    roomPhotoUrl: image("photo-1566073771259-6a8506099945"),
    discount: 18,
    amenityIds: [1, 2, 3],
    amenities: storybookAmenities.slice(0, 3),
    numberOfChildren: 1,
    numberOfAdults: 2,
    numberOfRooms: 1,
    checkInDate: "2026-07-12",
    checkOutDate: "2026-07-16",
  },
  {
    hotelId: 102,
    hotelName: "Old City Boutique Hotel",
    starRating: 4.4,
    latitude: 31.7683,
    longitude: 35.2137,
    roomPrice: 142,
    roomType: "Superior King Room",
    cityName: "Jerusalem",
    roomPhotoUrl: image("photo-1551882547-ff40c63fe5fa"),
    discount: 0,
    amenityIds: [1, 3, 4],
    amenities: [
      storybookAmenities[0],
      storybookAmenities[2],
      storybookAmenities[3],
    ],
    numberOfChildren: 0,
    numberOfAdults: 2,
    numberOfRooms: 1,
    checkInDate: "2026-08-04",
    checkOutDate: "2026-08-08",
  },
  {
    hotelId: 103,
    hotelName: "Carmel Garden Suites",
    starRating: 5,
    latitude: 32.794,
    longitude: 34.9896,
    roomPrice: 236,
    roomType: "Executive Suite",
    cityName: "Haifa",
    roomPhotoUrl: image("photo-1578683010236-d716f9a3f461"),
    discount: 12,
    amenityIds: [1, 2, 4],
    amenities: [
      storybookAmenities[0],
      storybookAmenities[1],
      storybookAmenities[3],
    ],
    numberOfChildren: 2,
    numberOfAdults: 2,
    numberOfRooms: 2,
    checkInDate: "2026-09-10",
    checkOutDate: "2026-09-13",
  },
];

function getPath(config: InternalAxiosRequestConfig) {
  const requestUrl = `${config.baseURL ?? ""}${config.url ?? ""}`;

  try {
    return new URL(requestUrl, "http://storybook.local").pathname;
  } catch {
    return config.url ?? "";
  }
}

function createResponse<T>(
  config: InternalAxiosRequestConfig,
  data: T,
  status = 200
): AxiosResponse<T> {
  return {
    data,
    status,
    statusText: status === 200 ? "OK" : "Not Found",
    headers: {},
    config,
    request: null,
  };
}

export function installStorybookApiMocks() {
  if (window.__travelStorybookApiMocksInstalled) return;

  const adapter: AxiosAdapter = async (config) => {
    const path = getPath(config);

    if (path.endsWith("/home/search")) {
      return createResponse(config, storybookSearchResults);
    }

    if (path.endsWith("/search-results/amenities")) {
      return createResponse(config, storybookAmenities);
    }

    return createResponse(config, {}, 404);
  };

  httpClient.defaults.adapter = adapter;
  window.__travelStorybookApiMocksInstalled = true;
}
