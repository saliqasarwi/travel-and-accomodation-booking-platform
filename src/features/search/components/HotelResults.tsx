import { useEffect, useState } from "react";
import { Stack, CircularProgress, Typography, Alert } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import HotelCard from "./HotelCard";
import type { HotelSearchItem } from "../types/types";
import { fetchSearchResults } from "../api/search.api";

export default function HotelResults() {
  const [searchParams] = useSearchParams();

  const [data, setData] = useState<HotelSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const results = await fetchSearchResults(
          {
            city: searchParams.get("city") ?? undefined,
            checkInDate: searchParams.get("checkInDate") ?? undefined,
            checkOutDate: searchParams.get("checkOutDate") ?? undefined,
            adults: searchParams.get("adults")
              ? Number(searchParams.get("adults"))
              : undefined,
            children: searchParams.get("children")
              ? Number(searchParams.get("children"))
              : undefined,
            numberOfRooms: searchParams.get("numberOfRooms")
              ? Number(searchParams.get("numberOfRooms"))
              : undefined,
          },
          controller.signal
        );

        const filtered = results.filter((r) => {
          const minPrice = searchParams.get("minPrice")
            ? Number(searchParams.get("minPrice"))
            : undefined;

          const maxPrice = searchParams.get("maxPrice")
            ? Number(searchParams.get("maxPrice"))
            : undefined;

          const stars = searchParams.get("stars")
            ? searchParams.get("stars")!.split(",").map(Number)
            : undefined;

          const roomType = searchParams.get("roomType") ?? undefined;

          const amenities = searchParams.get("amenities")
            ? searchParams.get("amenities")!.split(",").map(Number)
            : undefined;

          if (minPrice !== undefined && r.roomPrice < minPrice) return false;
          if (maxPrice !== undefined && r.roomPrice > maxPrice) return false;

          if (stars?.length && !stars.includes(r.starRating)) return false;

          if (roomType && r.roomType !== roomType) return false;

          if (amenities?.length) {
            const ids = r.amenities?.map((a) => a.id) ?? [];
            const hasAll = amenities.every((id) => ids.includes(id));
            if (!hasAll) return false;
          }

          return true;
        });

        setData(filtered);
      } catch (err) {
        if (
          typeof err === "object" &&
          err !== null &&
          "name" in err &&
          (err as { name?: unknown }).name !== "AbortError"
        ) {
          setError("Failed to load search results");
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [searchParams]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!data.length) return <Typography>No results found.</Typography>;

  return (
    <Stack spacing={3} sx={{ flex: 1 }}>
      {data.map((hotel) => (
        <HotelCard key={hotel.hotelId} hotel={hotel} />
      ))}
    </Stack>
  );
}
