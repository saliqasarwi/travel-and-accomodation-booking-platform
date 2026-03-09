import { useEffect, useState } from "react";
import { Alert, Box, Skeleton, Typography } from "@mui/material";

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
          getFeaturedDeals(2),
          getTrendingDestinations(),
          getRecentHotels(2),
        ]);

        if (cancelled) return;

        setFeatured({
          data: featuredRes,
          loading: false,
          error: null,
        });
        setTrending({
          data: trendingRes,
          loading: false,
          error: null,
        });
        setRecent({
          data: recentRes,
          loading: false,
          error: null,
        });
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
    <Box sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 6,
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          background:
            "linear-gradient(135deg, rgba(25,118,210,0.10) 0%, rgba(25,118,210,0.04) 100%)",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 1 }}>
          Find your perfect stay
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 720 }}
        >
          Discover hotels, featured deals, and trending destinations for your
          next trip
        </Typography>

        <HomeSearchBar />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          mb: 4,
        }}
      >
        <Typography
          component="a"
          href="#featured-deals"
          sx={{
            textDecoration: "none",
            color: "primary.main",
            fontWeight: 700,
          }}
        >
          Featured Deals
        </Typography>

        <Typography
          component="a"
          href="#trending-destinations"
          sx={{
            textDecoration: "none",
            color: "primary.main",
            fontWeight: 700,
          }}
        >
          Trending Destinations
        </Typography>

        <Typography
          component="a"
          href="#recently-visited"
          sx={{
            textDecoration: "none",
            color: "primary.main",
            fontWeight: 700,
          }}
        >
          Recently Visited
        </Typography>
      </Box>

      {anyError && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {anyError}
        </Alert>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <Box id="featured-deals">
          {featured.loading ? (
            <Skeleton variant="rounded" height={300} />
          ) : (
            <FeaturedDeals items={featured.data ?? []} />
          )}
        </Box>

        <Box id="trending-destinations">
          {trending.loading ? (
            <Skeleton variant="rounded" height={360} />
          ) : (
            <TrendingDestinations items={trending.data ?? []} />
          )}
        </Box>

        <Box id="recently-visited">
          {recent.loading ? (
            <Skeleton variant="rounded" height={260} />
          ) : (
            <RecentlyVisited items={recent.data ?? []} />
          )}
        </Box>
      </Box>
    </Box>
  );
}
