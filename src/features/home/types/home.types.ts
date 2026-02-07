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
  id?: number;
  hotelName?: string;
  name?: string;
  city?: string;
  starRating?: number;
  originalPrice?: number;
  discount?: number;
  finalPrice?: number;
  imageUrl?: string;

  [key: string]: unknown;
}

export interface RecentHotel {
  hotelName?: string;
  city?: string;
  starRating?: number;
  visitDate?: IsoDateTime;
  thumbnailUrl?: string;

  [key: string]: unknown;
}

export interface TrendingDestination {
  cityName?: string;
  country?: string;
  description?: string;
  thumbnailUrl?: string;

  [key: string]: unknown;
}
