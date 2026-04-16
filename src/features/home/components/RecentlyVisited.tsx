import { Box, Typography, Card, CardMedia, Stack, Rating } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useTranslation } from "react-i18next";
import type { RecentHotel } from "../types/home.types";
import { formatVisitDate } from "@shared/utils/formatters";

type Props = {
  items: RecentHotel[];
};

export default function RecentlyVisited({ items }: Props) {
  const { t, i18n } = useTranslation();

  if (items.length === 0) {
    return (
      <Typography color="text.secondary">{t("home.noRecentHotels")}</Typography>
    );
  }

  return (
    <Box component="section" sx={{ mt: 1 }}>
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
          {t("home.recentlyVisited")}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {t("home.recentlyVisitedSubtitle")}
        </Typography>

        <Box
          sx={{
            width: 72,
            height: 4,
            borderRadius: 999,
            background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
          }}
        />
      </Stack>

      <Box
        component="ul"
        sx={{
          listStyle: "none",
          p: 0,
          m: 0,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {items.map((item) => (
          <Box component="li" key={item.hotelId}>
            <Card
              sx={{
                position: "relative",
                borderRadius: 5,
                overflow: "hidden",
                height: 340,
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
                border: "1px solid",
                borderColor: "divider",
                transition:
                  "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 40px rgba(15, 23, 42, 0.14)",
                  borderColor: "primary.light",
                },
                "&:hover .recent-image": {
                  transform: "scale(1.06)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={item.thumbnailUrl}
                alt={item.hotelName}
                className="recent-image"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(15,23,42,0.82) 0%, rgba(15,23,42,0.28) 45%, rgba(15,23,42,0.04) 100%)",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  left: 20,
                  right: 20,
                  bottom: 18,
                  color: "#fff",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1.2,
                    mb: 0.75,
                  }}
                >
                  {item.hotelName}
                </Typography>

                <Stack
                  direction="row"
                  spacing={0.75}
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <LocationOnOutlinedIcon sx={{ fontSize: 17 }} />
                  <Typography variant="body2">{item.cityName}</Typography>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  flexWrap="wrap"
                  gap={1}
                >
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <AccessTimeOutlinedIcon sx={{ fontSize: 17 }} />
                    <Typography variant="body2">
                      {formatVisitDate(
                        item.visitDate,
                        i18n.language,
                        t("home.recentlyVisitedFallback")
                      )}
                    </Typography>
                  </Stack>

                  <Rating
                    value={item.starRating}
                    precision={0.5}
                    readOnly
                    size="small"
                    sx={{
                      "& .MuiRating-iconFilled": {
                        color: "#F59E0B",
                      },
                      "& .MuiRating-iconEmpty": {
                        color: "rgba(255,255,255,0.35)",
                      },
                    }}
                  />
                </Stack>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
