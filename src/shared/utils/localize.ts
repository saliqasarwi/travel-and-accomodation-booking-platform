export function localizeField(
  value: unknown,
  language: string,
  fallback: string = ""
): string {
  if (typeof value === "string") return value;

  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const lang = language.startsWith("ar") ? "ar" : "en";

    const current = obj[lang];
    if (typeof current === "string") return current;

    if (typeof obj.en === "string") return obj.en;
    if (typeof obj.ar === "string") return obj.ar;
  }

  return fallback;
}
