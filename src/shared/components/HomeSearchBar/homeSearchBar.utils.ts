export function formatDateRange(
  checkInDate: string,
  checkOutDate: string,
  language: string
) {
  if (!checkInDate || !checkOutDate) return "";

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
    return `${checkInDate} — ${checkOutDate}`;
  }

  const locale = language.startsWith("ar") ? "ar-EG" : "en-GB";

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };

  return `${checkIn.toLocaleDateString(
    locale,
    formatOptions
  )} — ${checkOut.toLocaleDateString(locale, formatOptions)}`;
}

export function formatGuests(
  adults: number,
  children: number,
  numberOfRooms: number,
  t: (key: string, options?: Record<string, unknown>) => string
) {
  return [
    t("search.adults", { count: adults }),
    t("search.children", { count: children }),
    t("search.rooms", { count: numberOfRooms }),
  ].join(" • ");
}
