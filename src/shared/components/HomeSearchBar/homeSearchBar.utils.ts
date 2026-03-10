import dayjs from "dayjs";

export function formatGuests(adults: number, children: number, rooms: number) {
  return `${adults} adult${adults > 1 ? "s" : ""} · ${children} child${
    children > 1 ? "ren" : ""
  } · ${rooms} room${rooms > 1 ? "s" : ""}`;
}

export function formatDate(date: string) {
  if (!date) return "";
  return dayjs(date).format("ddd D MMM");
}

export function formatDateRange(checkInDate: string, checkOutDate: string) {
  if (!checkInDate || !checkOutDate) return "Select dates";
  return `${formatDate(checkInDate)} — ${formatDate(checkOutDate)}`;
}
