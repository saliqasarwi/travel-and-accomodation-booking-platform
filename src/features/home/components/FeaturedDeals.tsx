import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import type { FC } from "react";
import type { FeaturedDeal } from "../types/home.types";

interface Props {
  items: FeaturedDeal[];
}

const FeaturedDeals: FC<Props> = ({ items }) => {
  if (items.length === 0) {
    return (
      <Typography color="text.secondary">
        No featured deals available
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
        Featured Deals
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {items.slice(0, 6).map((deal) => (
          <Card
            key={deal.hotelId}
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              {deal.roomPhotoUrl && (
                <CardMedia
                  component="img"
                  height="180"
                  image={deal.roomPhotoUrl}
                  alt={deal.hotelName}
                  sx={{
                    objectFit: "cover",
                  }}
                />
              )}
            </Box>

            <CardContent sx={{ p: 2, pt: 1.5 }}>
              <Typography
                variant="subtitle1"
                component="div"
                fontWeight={600}
                sx={{
                  mb: 0.5,
                  lineHeight: 1.3,
                  fontSize: "1.05rem",
                }}
              >
                {deal.hotelName}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1.5, fontSize: "0.875rem" }}
              >
                {deal.cityName}
              </Typography>
              <Box sx={{ mt: 1 }}>
                {typeof deal.finalPrice === "number" && (
                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                    {typeof deal.originalPrice === "number" &&
                      deal.originalPrice > deal.finalPrice && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            textDecoration: "line-through",
                            fontSize: "0.9rem",
                          }}
                        >
                          US${deal.originalPrice}
                        </Typography>
                      )}

                    <Typography
                      variant="h6"
                      component="span"
                      fontWeight={700}
                      color="#003580"
                      sx={{ fontSize: "1.4rem", lineHeight: 1 }}
                    >
                      US${deal.finalPrice}
                    </Typography>
                  </Box>
                )}

                {deal.discount && (
                  <Typography
                    variant="caption"
                    color="success.main"
                    sx={{
                      fontWeight: 500,
                      mt: 0.5,
                      display: "block",
                    }}
                  >
                    Save {deal.discount}%
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedDeals;
