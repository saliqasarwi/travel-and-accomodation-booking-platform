import { useEffect, useState } from "react";
import { Alert, Box, Container, Skeleton, Typography } from "@mui/material";

import HomeSearchBar from "../../../shared/components/HomeSearchBar/HomeSearchBar";
import FeaturedDeals from "../components/FeaturedDeals";
import TrendingDestinations from "../components/TrendingDestinations";
import RecentlyVisited from "../components/RecentlyVisited";
import { BsMouse } from "react-icons/bs";
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
    <Box sx={{ mx: 5 }}>
      {/*hero*/}
      <Box
        sx={{
          position: "relative",
          width: "99.4vw",
          ml: "calc(50% - 50vw)",
          mr: "calc(50% - 50vw)",
          minHeight: { xs: 420, md: 560 },
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          backgroundImage:
            "linear-gradient(rgba(8,35,84,0.65), rgba(8,35,84,0.55)), url('https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              maxWidth: 1080,
              py: { xs: 7, md: 10 },
              ml: 2,
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                color: "common.white",
                fontWeight: 800,
                lineHeight: 1.05,
                mb: 2,
                fontSize: { xs: "2.4rem", sm: "3rem", md: "4.25rem" },
                maxWidth: 820,
                textShadow: "0 4px 18px rgba(31, 2, 2, 0.93)",
              }}
            >
              Find your perfect stay
            </Typography>

            <Typography
              sx={{
                color: "common.white",
                mb: 5,
                maxWidth: 760,
                fontSize: { xs: "1rem", md: "1.45rem" },
                fontWeight: 500,
                textShadow: "0 2px 10px rgba(0,0,0,0.20)",
              }}
            >
              Discover hotels, featured deals, and trending destinations for
              your next trip
            </Typography>

            <Box sx={{ minWidth: "1120" }}>
              <HomeSearchBar />
            </Box>
          </Box>
        </Container>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            bottom: 20,
            left: "50%",
            cursor: "pointer",
            opacity: 0.9,
            color: "common.white",
            fontSize: 36,
            zIndex: 2,
            animation: "bounce 1.6s infinite",
            "@keyframes bounce": {
              "0%, 100%": {
                transform: "translate(-50%, 0)",
              },
              "50%": {
                transform: "translate(-50%, 8px)",
              },
            },
          }}
          onClick={() =>
            document.getElementById("featured-deals")?.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          <BsMouse />
        </Box>
      </Box>
      {anyError && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {anyError}
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          mt: 10,
        }}
      >
        <Box id="featured-deals" sx={{ scrollMarginTop: 90 }}>
          {featured.loading ? (
            <Skeleton variant="rounded" height={300} />
          ) : (
            <FeaturedDeals items={featured.data ?? []} />
          )}
        </Box>

        <Box>
          {trending.loading ? (
            <Skeleton variant="rounded" height={360} />
          ) : (
            <TrendingDestinations items={trending.data ?? []} />
          )}
        </Box>

        <Box>
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
