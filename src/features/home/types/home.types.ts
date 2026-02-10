export type IsoDate = string;
export type IsoDateTime = string;

export interface HomeSearchParams {
  city?: string;
  checkInDate?: IsoDate;
  checkOutDate?: IsoDate;
  adults?: number;
  children?: number;
  numberOfRooms?: number;
}

export interface HomeSearchResult {
  // based on server filtering in /api/home/search (searchResults.json)
  cityName: string;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfRooms: number;

  // allow extra fields from JSON without breaking
  [key: string]: unknown;
}

export interface FeaturedDeal {
  hotelId?: number;
  originalRoomPrice?: number;
  discount?: number;
  finalPrice?: number;
  cityName?: string;
  hotelName?: string;
  hotelStarRating?: number;
  title?: string;
  description?: string;
  roomPhotoUrl?: string;
  [key: string]: unknown;
}

export interface RecentHotel {
  hotelId?: number;
  hotelName?: string;
  starRating?: number;
  visitDate?: IsoDateTime;
  cityName?: string;
  thumbnailUrl?: string;
  priceLowerBound?: number;
  priceUpperBound: number;
  [key: string]: unknown;
}

export interface TrendingDestination {
  cityId?: number;
  cityName?: string;
  countryName?: string;
  description?: string;
  thumbnailUrl?: string;

  [key: string]: unknown;
}
