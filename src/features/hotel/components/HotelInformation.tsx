import { Box, Chip, Rating, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { HotelDetails } from "../types/hotel.types";

type Props = {
  hotel: HotelDetails;
};

export default function HotelInformation({ hotel }: Props) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        p: 2.25,
        borderRadius: 3,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
      }}
    >
      <Stack spacing={1.25}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2rem", md: "2.5rem" },
            lineHeight: 1.05,
            background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {hotel.hotelName}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          flexWrap="wrap"
          useFlexGap
        >
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", fontWeight: 500 }}
          >
            {hotel.location}
          </Typography>

          <Rating
            value={hotel.starRating}
            precision={0.1}
            readOnly
            size="small"
          />

          <Typography variant="body2" color="text.secondary">
            {t("hotel.starHotel", { count: hotel.starRating })}
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.8 }}
        >
          {hotel.description}
        </Typography>

        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
          {hotel.amenities.map((amenity) => (
            <Chip
              key={amenity.id}
              label={amenity.name}
              size="small"
              sx={{
                bgcolor: "rgba(21,101,192,0.08)",
                color: "primary.main",
                fontWeight: 700,
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
