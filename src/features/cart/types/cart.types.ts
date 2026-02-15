export type CartItem = {
  id: string;

  hotelId: number;
  hotelName: string;
  cityName: string;
  starRating: number;

  roomType: string;
  roomPhotoUrl?: string;

  checkInDate: string;
  checkOutDate: string;

  adults: number;
  children: number;
  numberOfRooms: number;

  pricePerNight: number;
  discount?: number;
};

export type CartState = {
  items: CartItem[];
};

export type AddItemInput = Omit<CartItem, "id">;
