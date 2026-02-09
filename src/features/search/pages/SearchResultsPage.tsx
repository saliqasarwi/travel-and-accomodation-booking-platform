import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchHome } from "@features/home/api/home.api";
import type { HomeSearchResult } from "@features/home/types/home.types";
import { parseApiError } from "@shared/api";
export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const [data, setData] = useState<HomeSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const query = {
      city: params.get("city") || undefined,
      checkInDate: params.get("checkInDate") || undefined,
      checkOutDate: params.get("checkOutDate") || undefined,
      adults: params.get("adults") ? Number(params.get("adults")) : undefined,
      children: params.get("children")
        ? Number(params.get("children"))
        : undefined,
      numberOfRooms: params.get("numberOfRooms")
        ? Number(params.get("numberOfRooms"))
        : undefined,
    };

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await searchHome(query);
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
  }, [params]);

  if (loading) return <p>Loading search results…</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;

  return (
    <div>
      <h1>Search Results</h1>

      {data.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {data.map((item, idx) => (
            <li key={idx}>
              <b>{item.cityName}</b> — Rooms: {item.numberOfRooms}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
