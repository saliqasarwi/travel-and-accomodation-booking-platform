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
import type {
  FeaturedDeal,
  RecentHotel,
  TrendingDestination,
} from "../src/features/home/types/home.types";
import type {
  CityRow,
  HotelRow,
  RoomRow,
} from "../src/features/admin/types/admin.types";
import type { HotelDetails } from "../src/features/hotel/types/hotel.types";
import type { AvailableRoom } from "../src/features/hotel/types/room.types";
import type { HotelReview } from "../src/features/hotel/types/review.types";
import type { BookingItem } from "../src/features/bookings/api/bookings.api";
import type { BookingApiResponse } from "../src/features/confirmation/types/confirmation.types";
import type { UserProfile } from "../src/features/profile/api/profile.api";
import type { AuthenticateResponse } from "../src/features/auth/types/auth.types";

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

export const storybookFeaturedDeals: FeaturedDeal[] =
  storybookSearchResults.map((result) => ({
    hotelId: result.hotelId,
    hotelName: result.hotelName,
    cityName: result.cityName,
    originalRoomPrice: Math.round(result.roomPrice * 1.25),
    discount: result.discount,
    finalPrice: result.roomPrice,
    roomPhotoUrl: result.roomPhotoUrl,
  }));

export const storybookTrendingDestinations: TrendingDestination[] = [
  {
    cityId: 301,
    cityName: "Tel Aviv",
    countryName: "Israel",
    description:
      "Mediterranean beaches, restaurants, and energetic neighborhoods for a coastal city break.",
    thumbnailUrl: image("photo-1544971587-b842c27f8e14"),
  },
  {
    cityId: 302,
    cityName: "Jerusalem",
    countryName: "Israel",
    description:
      "Historic streets, sacred landmarks, boutique stays, and stone courtyards full of atmosphere.",
    thumbnailUrl: image("photo-1542743408-218cc173cda0"),
  },
  {
    cityId: 303,
    cityName: "Haifa",
    countryName: "Israel",
    description:
      "Gardens, sea views, and hillside neighborhoods with easy access to northern coast trips.",
    thumbnailUrl: image("photo-1570722750791-5f14fbb57d72"),
  },
];

export const storybookRecentHotels: RecentHotel[] = storybookSearchResults.map(
  (result, index) => ({
    hotelId: result.hotelId,
    hotelName: result.hotelName,
    cityName: result.cityName,
    starRating: result.starRating,
    visitDate: `2026-06-${20 - index * 2}T12:15:00Z`,
    thumbnailUrl: result.roomPhotoUrl,
    priceLowerBound: result.roomPrice,
    priceUpperBound: result.roomPrice + 140,
  })
);

export const storybookCities: CityRow[] = [
  {
    id: 1,
    name: "Tel Aviv",
    country: "Israel",
    postOffice: "6100001",
    numberOfHotels: 28,
    createdAt: "2026-05-01",
    modifiedAt: "2026-06-12",
  },
  {
    id: 2,
    name: "Jerusalem",
    country: "Israel",
    postOffice: "9103401",
    numberOfHotels: 34,
    createdAt: "2026-05-02",
    modifiedAt: "2026-06-14",
  },
  {
    id: 3,
    name: "Haifa",
    country: "Israel",
    postOffice: "3309500",
    numberOfHotels: 16,
    createdAt: "2026-05-03",
    modifiedAt: "2026-06-16",
  },
];

export const storybookHotels: HotelRow[] = [
  {
    id: 101,
    hotelName: "Azure Bay Resort",
    starRating: 4.7,
    availableRooms: 24,
    location: "Tel Aviv waterfront",
    createdAt: "2026-05-11",
    modifiedAt: "2026-06-18",
  },
  {
    id: 102,
    hotelName: "Old City Boutique Hotel",
    starRating: 4.4,
    availableRooms: 12,
    location: "Jerusalem",
    createdAt: "2026-05-12",
    modifiedAt: "2026-06-17",
  },
  {
    id: 103,
    hotelName: "Carmel Garden Suites",
    starRating: 5,
    availableRooms: 18,
    location: "Haifa",
    createdAt: "2026-05-13",
    modifiedAt: "2026-06-16",
  },
];

export const storybookRooms: RoomRow[] = [
  {
    roomId: 501,
    roomNumber: 501,
    availability: true,
    adultCapacity: 2,
    childrenCapacity: 1,
    createdAt: "2026-05-21",
    modifiedAt: "2026-06-10",
  },
  {
    roomId: 608,
    roomNumber: 608,
    availability: false,
    adultCapacity: 3,
    childrenCapacity: 2,
    createdAt: "2026-05-22",
    modifiedAt: "2026-06-11",
  },
  {
    roomId: 714,
    roomNumber: 714,
    availability: true,
    adultCapacity: 2,
    childrenCapacity: 0,
    createdAt: "2026-05-23",
    modifiedAt: "2026-06-12",
  },
];

export const storybookHotelDetails: HotelDetails = {
  hotelName: "Azure Bay Resort",
  location: "Tel Aviv waterfront",
  description:
    "A relaxed seaside hotel with bright rooms, walkable beach access, and a rooftop terrace for sunset views.",
  amenities: storybookAmenities,
  starRating: 4.7,
  availableRooms: 24,
  imageUrl: image("photo-1566073771259-6a8506099945"),
  latitude: 32.0853,
  longitude: 34.7818,
};

export const storybookHotelGallery = [
  { url: image("photo-1566073771259-6a8506099945") },
  { url: image("photo-1551882547-ff40c63fe5fa") },
  { url: image("photo-1578683010236-d716f9a3f461") },
  { url: image("photo-1590490360182-c33d57733427") },
];

export const storybookAvailableRooms: AvailableRoom[] = [
  {
    hotelId: 101,
    roomId: 501,
    roomNumber: "501",
    roomPhotoUrl: image("photo-1590490360182-c33d57733427"),
    roomType: "Deluxe Sea View",
    capacityOfAdults: 2,
    capacityOfChildren: 1,
    amenities: storybookAmenities.slice(0, 3),
    price: 184,
    availability: true,
  },
  {
    hotelId: 101,
    roomId: 608,
    roomNumber: "608",
    roomPhotoUrl: image("photo-1578683010236-d716f9a3f461"),
    roomType: "Executive Suite",
    capacityOfAdults: 3,
    capacityOfChildren: 2,
    amenities: [storybookAmenities[0], storybookAmenities[1]],
    price: 236,
    availability: false,
  },
];

export const storybookHotelReviews: HotelReview[] = [
  {
    reviewId: 1,
    customerName: "Maya Cohen",
    rating: 5,
    description:
      "The room was spotless, breakfast was generous, and the rooftop view was the highlight.",
  },
  {
    reviewId: 2,
    customerName: "Omar Khalil",
    rating: 4,
    description:
      "Comfortable stay with a great location and helpful recommendations from the staff.",
  },
];

export const storybookProfile: UserProfile = {
  id: 2,
  firstName: "Lina",
  lastName: "Haddad",
  email: "lina@example.com",
  phone: "+972 59 123 4567",
  country: "Palestine",
  city: "Ramallah",
  modifiedAt: "2026-06-20",
};

export const storybookBooking: BookingApiResponse = {
  bookingId: 1842,
  confirmationNumber: "TRV-2026-1842",
  bookingStatus: "Confirmed",
  createdAt: "2026-07-02T09:30:00Z",
  request: {
    guestInfo: {
      firstName: "Lina",
      lastName: "Haddad",
      email: "lina@example.com",
      phone: "+972 59 123 4567",
    },
    paymentInfo: {
      method: "credit_card",
      cardNumber: "4242 4242 4242 4242",
      expiry: "08/29",
      cvv: "123",
      cardholderName: "Lina Haddad",
    },
    specialRequests: {
      notes: "High floor if available, and late check-in around 10 PM.",
    },
    items: [
      {
        id: "101|Deluxe Sea View|2026-07-12|2026-07-16|2|1|1",
        hotelId: 101,
        hotelName: "Azure Bay Resort",
        cityName: "Tel Aviv",
        starRating: 4.7,
        roomType: "Deluxe Sea View",
        roomPhotoUrl: image("photo-1566073771259-6a8506099945"),
        checkInDate: "2026-07-12",
        checkOutDate: "2026-07-16",
        adults: 2,
        children: 1,
        numberOfRooms: 1,
        pricePerNight: 184,
        discount: 18,
      },
      {
        id: "103|Executive Suite|2026-09-10|2026-09-13|2|2|2",
        hotelId: 103,
        hotelName: "Carmel Garden Suites",
        cityName: "Haifa",
        starRating: 5,
        roomType: "Executive Suite",
        roomPhotoUrl: image("photo-1578683010236-d716f9a3f461"),
        checkInDate: "2026-09-10",
        checkOutDate: "2026-09-13",
        adults: 2,
        children: 2,
        numberOfRooms: 2,
        pricePerNight: 236,
        discount: 12,
      },
    ],
  },
};

export const storybookBookings: BookingItem[] = [
  {
    bookingId: storybookBooking.bookingId,
    confirmationNumber: storybookBooking.confirmationNumber,
    bookingStatus: storybookBooking.bookingStatus,
    createdAt: storybookBooking.createdAt,
    request: {
      guestInfo: storybookBooking.request.guestInfo,
      items: storybookBooking.request.items,
    },
  },
];

const authResponse: AuthenticateResponse = {
  authentication: "storybook-token",
  userType: "User",
};

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
    const method = config.method?.toUpperCase() ?? "GET";

    if (method === "GET" && path.endsWith("/home/search")) {
      return createResponse(config, storybookSearchResults);
    }

    if (method === "GET" && path.endsWith("/home/featured-deals")) {
      return createResponse(config, storybookFeaturedDeals);
    }

    if (method === "GET" && path.endsWith("/home/destinations/trending")) {
      return createResponse(config, storybookTrendingDestinations);
    }

    if (method === "GET" && /\/home\/users\/\d+\/recent-hotels$/.test(path)) {
      return createResponse(config, storybookRecentHotels);
    }

    if (method === "GET" && path.endsWith("/search-results/amenities")) {
      return createResponse(config, storybookAmenities);
    }

    if (method === "GET" && path.endsWith("/cities")) {
      return createResponse(config, storybookCities);
    }

    if (method === "GET" && path.endsWith("/hotels")) {
      return createResponse(config, storybookHotels);
    }

    if (method === "GET" && path.endsWith("/rooms")) {
      return createResponse(config, storybookRooms);
    }

    if (method === "GET" && /\/hotels\/\d+$/.test(path)) {
      return createResponse(config, storybookHotelDetails);
    }

    if (method === "GET" && /\/hotels\/\d+\/gallery$/.test(path)) {
      return createResponse(config, storybookHotelGallery);
    }

    if (method === "GET" && /\/hotels\/\d+\/available-rooms$/.test(path)) {
      return createResponse(config, storybookAvailableRooms);
    }

    if (method === "GET" && /\/hotels\/\d+\/reviews$/.test(path)) {
      return createResponse(config, storybookHotelReviews);
    }

    if (method === "GET" && path.endsWith("/bookings")) {
      return createResponse(config, storybookBookings);
    }

    if (method === "GET" && /\/bookings\/\d+$/.test(path)) {
      return createResponse(config, storybookBooking);
    }

    if (method === "POST" && path.endsWith("/bookings")) {
      return createResponse(config, {
        bookingId: storybookBooking.bookingId,
        confirmationNumber: storybookBooking.confirmationNumber,
      });
    }

    if (method === "GET" && path.endsWith("/profile")) {
      return createResponse(config, storybookProfile);
    }

    if (method === "PUT" && path.endsWith("/profile")) {
      return createResponse(config, {
        ...storybookProfile,
        modifiedAt: new Date().toISOString(),
      });
    }

    if (method === "POST" && path.endsWith("/auth/authenticate")) {
      return createResponse(config, authResponse);
    }

    if (["POST", "PUT", "DELETE"].includes(method)) {
      return createResponse(config, {});
    }

    return createResponse(config, {}, 404);
  };

  httpClient.defaults.adapter = adapter;
  window.__travelStorybookApiMocksInstalled = true;
}
