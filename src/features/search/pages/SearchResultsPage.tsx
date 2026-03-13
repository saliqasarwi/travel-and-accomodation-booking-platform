import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";

import HomeSearchBar from "@shared/components/HomeSearchBar/HomeSearchBar";

import SearchFilters from "../components/SearchFilters";
import HotelResults from "../components/HotelResults";
import { parseSearchParams } from "../utils/searchParams";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();

  const query = useMemo(() => {
    return parseSearchParams(searchParams);
  }, [searchParams]);

  return (
    <Stack spacing={4} sx={{ my: 6 }}>
      <HomeSearchBar />

      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "text.primary",
            mb: 1,
            lineHeight: 1.2,
          }}
        >
          Search Results
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Explore available stays in{" "}
          <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
            {query.city || "your destination"}
          </Box>{" "}
          {query.checkInDate &&
            query.checkOutDate &&
            `from ${query.checkInDate} to ${query.checkOutDate}.`}
        </Typography>

        <Box
          sx={{
            width: 72,
            height: 4,
            borderRadius: 999,
            background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
          }}
        />
      </Box>

      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={4}
        alignItems="flex-start"
      >
        <SearchFilters />
        <HotelResults />
      </Stack>
    </Stack>
  );
}
