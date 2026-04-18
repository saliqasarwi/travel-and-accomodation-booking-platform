import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { useTranslation } from "react-i18next";
import { localizeField } from "@shared/utils/localize";
import type { FeaturedDeal } from "../types/home.types";

type Props = {
  items: FeaturedDeal[];
};

export default function FeaturedDeals({ items }: Props) {
  const { t, i18n } = useTranslation();

  if (items.length === 0) {
    return (
      <Typography color="text.secondary">
        {t("home.noFeaturedDeals")}
      </Typography>
    );
  }

  return (
    <Box component="section" sx={{ mt: 2 }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: "text.primary",
            lineHeight: 1.2,
            fontSize: {
              xs: "1.6rem",
              sm: "2rem",
              md: "2.25rem",
            },
          }}
        >
          {t("home.featuredDeals")}
          <Box
            sx={{
              mt: 0.8,
              width: 72,
              height: 4,
              borderRadius: 999,
              background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
            }}
          />
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {t("home.featuredDealsSubtitle")}
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {items.map((deal) => (
          <Card
            key={deal.hotelId}
            sx={{
              height: "100%",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
              transition:
                "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 20px 40px rgba(15, 23, 42, 0.14)",
                borderColor: "primary.light",
              },
              "&:hover .featured-image": {
                transform: "scale(1.06)",
              },
            }}
          >
            <Box sx={{ position: "relative", overflow: "hidden" }}>
              <CardMedia
                component="img"
                image={deal.roomPhotoUrl}
                alt={localizeField(deal.hotelName, i18n.language)}
                className="featured-image"
                sx={{
                  height: 220,
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                }}
              />

              {deal.discount ? (
                <Chip
                  icon={<LocalOfferOutlinedIcon />}
                  label={t("home.savePercent", { value: deal.discount })}
                  sx={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    color: "#fff",
                    background:
                      "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
                    fontWeight: 700,
                    "& .MuiChip-icon": {
                      color: "#fff",
                    },
                  }}
                />
              ) : null}
            </Box>

            <CardContent sx={{ p: 2.5 }}>
              <Stack spacing={1.4}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: "text.primary",
                      mb: 0.6,
                    }}
                  >
                    {localizeField(deal.hotelName, i18n.language)}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={0.7}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <LocationOnOutlinedIcon
                      sx={{ fontSize: 18, color: "text.secondary" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {localizeField(deal.cityName, i18n.language)}
                    </Typography>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    p: 1.6,
                    background:
                      "linear-gradient(180deg, rgba(21,101,192,0.06) 0%, rgba(15,157,148,0.08) 100%)",
                    border: "1px solid rgba(21,101,192,0.10)",
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="end"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    gap={1.5}
                  >
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          display: "block",
                          mb: 0.5,
                        }}
                      >
                        {t("home.startingFrom")}
                      </Typography>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            textDecoration: "line-through",
                          }}
                        >
                          US${deal.originalRoomPrice}
                        </Typography>

                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 800,
                            color: "primary.main",
                            lineHeight: 1,
                          }}
                        >
                          US${deal.finalPrice}
                        </Typography>
                      </Stack>

                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {t("home.perNight")}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
