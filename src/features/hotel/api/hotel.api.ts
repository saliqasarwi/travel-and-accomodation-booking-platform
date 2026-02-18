import { httpClient } from "@shared/api/httpClient";
import type { HotelDetails } from "../types/hotel.types";
import type { AvailableRoom } from "../types/room.types";

type GalleryItem = { url: string };

export async function getHotelDetails(hotelId: number) {
  const res = await httpClient.get<HotelDetails>(`/hotels/${hotelId}`);
  return res.data;
}

export async function getHotelGallery(hotelId: number) {
  const res = await httpClient.get<GalleryItem[]>(`/hotels/${hotelId}/gallery`);
  return res.data;
}

export async function getAvailableRooms(hotelId: number | string) {
  const res = await httpClient.get<AvailableRoom[]>(
    `/hotels/${hotelId}/available-rooms`
  );
  const rooms: AvailableRoom[] = res.data.map((r) => ({
    hotelId: r.hotelId,
    roomId: r.roomId,
    roomNumber: r.roomNumber,
    roomPhotoUrl: r.roomPhotoUrl,
    roomType: r.roomType,
    capacityOfAdults: r.capacityOfAdults,
    capacityOfChildren: r.capacityOfChildren,
    amenities: r.amenities ?? [],
    price: r.price,
    availability: r.availability,
  }));

  return rooms;
}
