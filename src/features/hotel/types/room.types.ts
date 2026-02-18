export type Amenity = {
  id: number;
  name: string;
  description?: string;
};
export type AvailableRoom = {
  roomId: number;
  hotelId: number;
  roomNumber: string;
  roomPhotoUrl: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  roomAmenities: Amenity[];
  price: number;
  availability: boolean;
};
