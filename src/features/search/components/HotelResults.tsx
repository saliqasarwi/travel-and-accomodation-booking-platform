import { useEffect, useState } from "react";
import { Stack, CircularProgress, Typography, Alert, Box } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import HotelCard from "./HotelCard";
import type { HotelSearchItem } from "../types/types";
import { fetchSearchResults } from "../api/search.api";
import { parseSearchParams } from "../utils/searchParams";
import { applyFilters } from "../utils/applyFilters";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { sortResults } from "../utils/sortResults";
import SearchSortBar from "./SearchSortBar";
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
          },
          controller.signal
        );

        const query = parseSearchParams(searchParams);
        const filtered = applyFilters(results, query);
        const sorted = sortResults(filtered, query.sort ?? "recommended");
        setData(sorted);
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
  }, [searchParams, resetPage]);

  if (loading) {
    return (
      <Box
        sx={{
          flex: 1,
          minHeight: 240,
          display: "grid",
          placeItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ flex: 1 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!data.length) {
    return (
      <Box
        sx={{
          flex: 1,
          p: 4,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          No results found
        </Typography>
        <Typography color="text.secondary">
          Try changing your destination, dates, or filters.
        </Typography>
      </Box>
    );
  }

  const visibleHotels = data.slice(0, page * PAGE_SIZE);
  const hasMore = visibleHotels.length < data.length;

  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <SearchSortBar resultsCount={data.length} />

      <Stack spacing={3}>
        {visibleHotels.map((hotel) => (
          <HotelCard key={hotel.hotelId} hotel={hotel} />
        ))}

        {hasMore && (
          <Box
            ref={sentinelRef}
            data-testid="infinite-scroll-sentinel"
            sx={{ height: 1 }}
          />
        )}
      </Stack>
    </Box>
  );
}
