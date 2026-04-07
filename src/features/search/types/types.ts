export type Amenity = {
  id: number;
  name: string;
  description: string;
};

export interface HotelSearchItem {
  hotelId: number;
  hotelName: string;
  starRating: number;
  latitude: number;
  longitude: number;
  roomPrice: number;
  roomType: string;
  cityName: string;
  roomPhotoUrl: string;
  discount: number;
  amenityIds?: number[];
  amenities?: Amenity[];
  numberOfChildren: number;
  numberOfAdults: number;
  numberOfRooms: number;
  checkInDate: string;
  checkOutDate: string;
}
