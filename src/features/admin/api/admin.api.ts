import { httpClient } from "@shared/api/httpClient";
import type {
  AdminNavLink,
  CityFormValues,
  CityRow,
  HotelFormValues,
  HotelRow,
  RoomFormValues,
  RoomRow,
} from "../types/admin.types";

export async function getAdminNavigation(): Promise<AdminNavLink[]> {
  const res = await httpClient.get<AdminNavLink[]>("/admin/navigation");
  return res.data;
}
//cities
export async function getCities(params?: {
  name?: string;
  country?: string;
}): Promise<CityRow[]> {
  const res = await httpClient.get<CityRow[]>("/cities", { params });
  return res.data;
}

export async function createCity(payload: CityFormValues): Promise<CityRow[]> {
  const res = await httpClient.post<CityRow[]>("/cities", payload);
  return res.data;
}

export async function updateCity(
  id: number,
  payload: CityFormValues
): Promise<CityRow[]> {
  const res = await httpClient.put<CityRow[]>(`/cities/${id}`, payload);
  return res.data;
}

export async function deleteCity(id: number): Promise<CityRow[]> {
  const res = await httpClient.delete<CityRow[]>(`/cities/${id}`);
  return res.data;
}

// Hotels

export async function getHotels(params?: {
  hotelName?: string;
}): Promise<HotelRow[]> {
  const res = await httpClient.get<HotelRow[]>("/hotels", { params });
  return res.data;
}

export async function createHotel(
  payload: HotelFormValues
): Promise<HotelRow[]> {
  const res = await httpClient.post<HotelRow[]>("/hotels", payload);
  return res.data;
}

export async function updateHotel(
  hotelId: number,
  payload: HotelFormValues
): Promise<HotelRow[]> {
  const res = await httpClient.put<HotelRow[]>(`/hotels/${hotelId}`, payload);
  return res.data;
}

export async function deleteHotel(hotelId: number): Promise<HotelRow[]> {
  const res = await httpClient.delete<HotelRow[]>(`/hotels/${hotelId}`);
  return res.data;
}

// Rooms

export async function getRooms(params?: {
  roomNumber?: string;
}): Promise<RoomRow[]> {
  const res = await httpClient.get<RoomRow[]>("/rooms", { params });
  return res.data;
}

export async function createRoom(payload: RoomFormValues): Promise<RoomRow[]> {
  const res = await httpClient.post<RoomRow[]>("/rooms", payload);
  return res.data;
}

export async function updateRoom(
  roomId: number,
  payload: RoomFormValues
): Promise<RoomRow[]> {
  const res = await httpClient.put<RoomRow[]>(`/rooms/${roomId}`, payload);
  return res.data;
}

export async function deleteRoom(roomId: number): Promise<RoomRow[]> {
  const res = await httpClient.delete<RoomRow[]>(`/rooms/${roomId}`);
  return res.data;
}
