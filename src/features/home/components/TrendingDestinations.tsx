import { useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import type { TrendingDestination } from "../types/home.types";

type Props = {
  items: TrendingDestination[];
};

export default function TrendingDestinations({ items }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const { current } = scrollContainerRef;
    const scrollAmount = current.clientWidth * 0.8;

    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (items.length === 0) {
    return (
      <Typography color="text.secondary">
        No trending destinations available.
      </Typography>
    );
  }

  return (
    <Box component="section" sx={{ py: 1 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        Trending Destinations
      </Typography>

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
          {items.map((item) => (
            <Card
              key={item.cityId}
              sx={{
                flex: "0 0 280px",
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
                image={item.thumbnailUrl}
                alt={item.cityName}
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
                  color: "common.white",
                  p: 2.5,
                }}
              >
                <Typography variant="h6" fontWeight={700}>
                  {item.cityName}
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
                  {item.description}
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
    </Box>
  );
}
