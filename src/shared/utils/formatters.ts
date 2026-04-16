export function money(n: number, language = "en") {
  return new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

export function formatDate(iso: string, language = "en") {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;

  return d.toLocaleString(language === "ar" ? "ar-EG" : "en-GB");
}

export function formatVisitDate(
  date: string | undefined,
  language: string,
  fallback: string
) {
  if (!date) return fallback;

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString(language === "ar" ? "ar-EG" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
