import { useEffect, useState } from "react";
import { getFeaturedDeals } from "../api/home.api";
import type { FeaturedDeal } from "../types/home.types";
import { parseApiError } from "@shared/api";
export default function FeaturedDeals() {
  const [data, setData] = useState<FeaturedDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await getFeaturedDeals();
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
  if (loading) return <div>Loading featured deals…</div>;
  if (error) return <div style={{ color: "crimson" }}>{error}</div>;
  return (
    <section>
      <h2>FeaturedDeals</h2>
      <ul>
        {data.slice(0, 5).map((item, idx) => (
          <li key={item.hotelId ?? idx}>
            <b>{item.hotelName ?? "Hotel"}</b> — {item.cityName ?? "City"}
          </li>
        ))}
      </ul>
    </section>
  );
}
