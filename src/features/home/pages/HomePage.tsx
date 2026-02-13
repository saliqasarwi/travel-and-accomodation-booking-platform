import { useEffect, useState } from "react";
import { Alert, Box, Skeleton, Typography } from "@mui/material";

import Container from "@shared/ui/Container/PageContainer";
import Section from "@shared/ui/Section/Section";

import HomeSearchBar from "../../../shared/components/HomeSearchBar";
import FeaturedDeals from "../components/FeaturedDeals";
import TrendingDestinations from "../components/TrendingDestinations";
import RecentlyVisited from "../components/RecentlyVisited";

import {
  getFeaturedDeals,
  getTrendingDestinations,
  getRecentHotels,
} from "../api/home.api";

import type {
  FeaturedDeal,
  TrendingDestination,
  RecentHotel,
} from "../types/home.types";

type LoadState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const initialState = <T,>(): LoadState<T> => ({
  data: null,
  loading: true,
  error: null,
});

export default function HomePage() {
  const [featured, setFeatured] =
    useState<LoadState<FeaturedDeal[]>>(initialState());
  const [trending, setTrending] =
    useState<LoadState<TrendingDestination[]>>(initialState());
  const [recent, setRecent] =
    useState<LoadState<RecentHotel[]>>(initialState());

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        const [featuredRes, trendingRes, recentRes] = await Promise.all([
          getFeaturedDeals(),
          getTrendingDestinations(),
          getRecentHotels(2),
        ]);

        if (cancelled) return;

        setFeatured({ data: featuredRes, loading: false, error: null });
        setTrending({ data: trendingRes, loading: false, error: null });
        setRecent({ data: recentRes, loading: false, error: null });
      } catch (err: unknown) {
        if (cancelled) return;
        const message =
          typeof err === "object" && err !== null && "message" in err
            ? String(
                (err as { message?: unknown }).message ??
                  "Failed to load homepage content"
              )
            : "Failed to load homepage content";

        setFeatured((s) => ({ ...s, loading: false, error: message }));
        setTrending((s) => ({ ...s, loading: false, error: message }));
        setRecent((s) => ({ ...s, loading: false, error: message }));
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const anyError = featured.error || trending.error || recent.error;

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Find your perfect stay
        </Typography>

        <Section title="Search" sx={{ mb: 5 }}>
          <HomeSearchBar />
        </Section>

        {anyError && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {anyError}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Box>
            {featured.loading ? (
              <Skeleton variant="rounded" height={300} />
            ) : (
              <FeaturedDeals items={featured.data ?? []} />
            )}
          </Box>

          <Box>
            {trending.loading ? (
              <Skeleton variant="rounded" height={300} />
            ) : (
              <TrendingDestinations />
            )}
          </Box>

          <Box>
            {recent.loading ? (
              <Skeleton variant="rounded" height={300} />
            ) : (
              <RecentlyVisited />
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
