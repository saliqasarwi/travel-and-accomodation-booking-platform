import { useEffect, useState } from "react";
import { Stack, CircularProgress, Typography, Alert } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import HotelCard from "./HotelCard";
import type { HotelSearchItem } from "../types/types";
import { fetchSearchResults } from "../api/search.api";
import { parseSearchParams } from "../utils/searchParams";
import { applyFilters } from "../utils/applyFilters";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const PAGE_SIZE = 6;
export default function HotelResults() {
  const [searchParams] = useSearchParams();
  const { sentinelRef, page, resetPage } = useInfiniteScroll();

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

        const query = parseSearchParams(searchParams);
        const filtered = applyFilters(results, query);
        setData(filtered);
        resetPage();
      } catch (err) {
        if (!axios.isCancel(err)) {
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

  const visibleHotels = data.slice(0, page * PAGE_SIZE);
  const hasMore = visibleHotels.length < data.length;

  return (
    <Stack spacing={3} sx={{ flex: 1 }}>
      {visibleHotels.map((hotel) => (
        <HotelCard key={hotel.hotelId} hotel={hotel} />
      ))}
      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
    </Stack>
  );
}
