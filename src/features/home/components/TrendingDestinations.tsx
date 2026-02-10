import { useEffect, useState } from "react";
import { getTrendingDestinations } from "../api/home.api";
import type { TrendingDestination } from "../types/home.types";
import { parseApiError } from "@shared/api";
export default function TrendingDestinations() {
  const [data, setData] = useState<TrendingDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await getTrendingDestinations();
        if (!cancelled) setData(res);
      } catch (e) {
        if (!cancelled) setError(parseApiError(e).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div>Loading trending destinations…</div>;
  if (error) return <div style={{ color: "crimson" }}>{error}</div>;
  return (
    <section>
      <h2>TrendingDestinations</h2>
      <ul>
        {data.slice(0, 8).map((item, idx) => (
          <li key={idx}>
            <b>{item.cityName ?? "City"}</b> — {item.countryName ?? ""}
          </li>
        ))}
      </ul>
    </section>
  );
}
