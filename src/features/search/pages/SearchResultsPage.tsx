import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

import Container from "@shared/ui/Container/PageContainer";
import Section from "@shared/ui/Section/Section";
import HomeSearchBar from "@shared/components/HomeSearchBar";

import SearchFilters from "../components/SearchFilters.tsx";
import HotelResults from "../components/HotelResults.tsx";

import { parseSearchParams } from "../utils/searchParams";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();

  const query = useMemo(() => {
    return parseSearchParams(searchParams);
  }, [searchParams]);

  return (
    <Container>
      <HomeSearchBar />

      <Section title="Search Results">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {query.cityName} | {query.checkInDate} → {query.checkOutDate}
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="flex-start"
        >
          <SearchFilters />

          <HotelResults />
        </Stack>
      </Section>
    </Container>
  );
}
