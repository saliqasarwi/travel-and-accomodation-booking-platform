import { useEffect, useState } from "react";
import { getRecentHotels } from "../api/home.api";
import type { RecentHotel } from "../types/home.types";
import { parseApiError } from "@shared/api";
export default function RecentlyVisited() {
  const [data, setData] = useState<RecentHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setError(null);
        setLoading(true);

        // backend demo uses userId=2
        const res = await getRecentHotels(2);

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

  if (loading) return <div>Loading recently visited hotels…</div>;
  if (error) return <div style={{ color: "crimson" }}>{error}</div>;
  return (
    <section>
      <h2>RecentlyVisited</h2>
      <ul>
        {data.slice(0, 5).map((item, idx) => (
          <li key={idx}>
            <b>{item.hotelName ?? "Hotel"}</b> — {item.cityName ?? "City"}
          </li>
        ))}
      </ul>
    </section>
  );
}
