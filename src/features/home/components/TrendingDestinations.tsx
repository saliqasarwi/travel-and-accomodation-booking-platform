import { useRef } from "react";
import { Box, Typography, IconButton, Stack, Chip } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
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
    <Box component="section" sx={{ py: 2 }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "text.primary",
            lineHeight: 1.2,
          }}
        >
          Trending Destinations
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 520 }}
        >
          Explore the most popular places travelers are loving right now.
        </Typography>

        <Box
          sx={{
            width: 84,
            height: 4,
            borderRadius: 999,
            background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
          }}
        />
      </Stack>

      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: -18,
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "background.paper",
            width: 48,
            height: 48,
            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.14)",
            zIndex: 3,
            display: { xs: "none", md: "flex" },
            "&:hover": {
              bgcolor: "background.default",
              transform: "translateY(-50%) scale(1.04)",
            },
          }}
        >
          <ArrowBackIosNewRoundedIcon
            fontSize="small"
            sx={{ color: "text.primary" }}
          />
        </IconButton>

        <Box
          ref={scrollContainerRef}
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            pb: 4,
            scrollSnapType: "x mandatory",
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {items.map((item) => (
            <Box
              key={item.cityId}
              sx={{
                flex: "0 0 300px",
                height: 420,
                perspective: "1500px",
                scrollSnapAlign: "start",
                cursor: "pointer",
                "&:hover .flip-card-inner": {
                  transform: "rotateY(180deg)",
                },
                "&:hover .front-image": {
                  transform: "scale(1.08)",
                },
              }}
            >
              <Box
                className="flip-card-inner"
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Front side */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 4,
                    overflow: "hidden",
                    backfaceVisibility: "hidden",
                    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)",
                    border: "1px solid #EEF2F7",
                  }}
                >
                  <Box
                    component="img"
                    src={item.thumbnailUrl}
                    alt={item.cityName}
                    className="front-image"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.8s ease",
                    }}
                  />
                </Box>

                {/* Back side */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 4,
                    overflow: "hidden",
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)",
                    border: "1px solid #EEF2F7",
                    background:
                      "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 3,
                    color: "white",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      zIndex: 1,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 800,
                            lineHeight: 1.1,
                            mb: 1,
                            color: "#FFFFFF",
                            textShadow: "0 2px 8px rgba(0,0,0,0.2)",
                          }}
                        >
                          {item.cityName}
                        </Typography>
                      </Box>

                      <Chip
                        icon={
                          <LocationOnOutlinedIcon
                            sx={{ color: "#FFFFFF", fontSize: 18 }}
                          />
                        }
                        label={item.countryName}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255,255,255,0.2)",
                          color: "#FFFFFF",
                          border: "1px solid rgba(255,255,255,0.3)",
                          fontWeight: 600,
                          backdropFilter: "blur(4px)",
                          "& .MuiChip-icon": {
                            color: "#FFFFFF !important",
                          },
                        }}
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.95)",
                        lineHeight: 1.6,
                        mb: 3,
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        flexGrow: 1,
                        textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: -18,
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "background.paper",
            width: 48,
            height: 48,
            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.14)",
            zIndex: 3,
            display: { xs: "none", md: "flex" },
            "&:hover": {
              bgcolor: "background.default",
              transform: "translateY(-50%) scale(1.04)",
            },
          }}
        >
          <ArrowForwardIosRoundedIcon
            fontSize="small"
            sx={{ color: "text.primary" }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}
