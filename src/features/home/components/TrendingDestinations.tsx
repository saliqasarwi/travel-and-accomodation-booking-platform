import { useEffect, useState, useRef } from "react";
import { getTrendingDestinations } from "../api/home.api";
import type { TrendingDestination } from "../types/home.types";
import { parseApiError } from "@shared/api";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
export default function TrendingDestinations() {
  const [data, setData] = useState<TrendingDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await getTrendingDestinations();
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
  }, []);
  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const { current } = scrollContainerRef;
    const scrollAmount = current.clientWidth * 0.8; // scroll ~80% of visible width
    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (loading) return <Typography>Loading trending destinations…</Typography>;
  if (error)
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  if (data.length === 0)
    return (
      <Typography color="text.secondary">No trending destinations.</Typography>
    );
  return (
    <Box component="section" sx={{ py: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Trending Destinations
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 2 }}>
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={280}
              height={360}
              sx={{ borderRadius: 3, flexShrink: 0 }}
            />
          ))}
        </Box>
      ) : data.length === 0 ? (
        <Typography color="text.secondary" align="center">
          No trending destinations available.
        </Typography>
      ) : (
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => scroll("left")}
            sx={{
              position: "absolute",
              left: -20,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "background.paper",
              boxShadow: 3,
              zIndex: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Box
            ref={scrollContainerRef}
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              pb: 2,
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {data.map((x) => (
              <Card
                key={x.cityId}
                sx={{
                  flex: "0 0 280px", // fixed card width - adjust as needed
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: 3,
                  scrollSnapAlign: "start",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 360, objectFit: "cover" }}
                  image={x.thumbnailUrl}
                  alt={x.cityName}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                  }}
                />
                <CardContent
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    color: "white",
                    p: 2.5,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    {x.cityName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 0.5,
                      opacity: 0.9,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {x.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          <IconButton
            onClick={() => scroll("right")}
            sx={{
              position: "absolute",
              right: -20,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "background.paper",
              boxShadow: 3,
              zIndex: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
