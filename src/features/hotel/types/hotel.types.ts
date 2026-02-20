export type HotelAmenity = {
  id: number;
  name: string;
  description?: string;
};

export type HotelDetails = {
  hotelName: string;
  location: string;
  description: string;
  amenities: HotelAmenity[];
  starRating: number;
  availableRooms: number;
  imageUrl: string;
  longitude?: number;
  latitude?: number;
};
