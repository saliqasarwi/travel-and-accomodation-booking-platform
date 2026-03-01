export type AdminEntity = "cities" | "hotels" | "rooms";

export interface AdminNavLink {
  label: string;
  path: string;
}

export interface CityRow {
  id: number;
  name: string;
  country?: string;
  postOffice?: string;
  numberOfHotels?: number;
  createdAt?: string;
  modifiedAt?: string;
}

export interface HotelRow {
  id: number;
  hotelName: string;

  starRating?: number;
  owner?: string;
  roomNumber?: number;
  createdAt?: string;
  modifiedAt?: string;
}

export interface RoomRow {
  roomId: number;

  roomNumber?: number;
  availability?: boolean;

  adultCapacity?: number;
  childrenCapacity?: number;

  createdAt?: string;
  modifiedAt?: string;
}

export interface CityFormValues {
  name: string;
  country?: string;
  postOffice?: string;
  numberOfHotels?: number;
}

export interface HotelFormValues {
  hotelName: string;
  city?: string;
  owner?: string;
  starRating?: number;
}

export interface RoomFormValues {
  roomNumber?: number;
  adultCapacity?: number;
  childrenCapacity?: number;
  availability?: boolean;
}
