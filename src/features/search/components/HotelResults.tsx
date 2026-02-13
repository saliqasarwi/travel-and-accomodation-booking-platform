import { useEffect, useState } from "react";
import { Stack, CircularProgress, Typography, Alert } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import HotelCard from "./HotelCard.tsx";
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
            city: searchParams.get("cityName") ?? undefined,
            checkInDate: searchParams.get("checkInDate") ?? undefined,
            checkOutDate: searchParams.get("checkOutDate") ?? undefined,
            adults: searchParams.get("numberOfAdults")
              ? Number(searchParams.get("numberOfAdults"))
              : undefined,
            children: searchParams.get("numberOfChildren")
              ? Number(searchParams.get("numberOfChildren"))
              : undefined,
            numberOfRooms: searchParams.get("numberOfRooms")
              ? Number(searchParams.get("numberOfRooms"))
              : undefined,
          },
          controller.signal
        );

        setData(results);
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
