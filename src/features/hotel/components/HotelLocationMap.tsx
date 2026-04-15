import { Box, Button, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { HotelDetails } from "../types/hotel.types";

type Props = {
  hotel: HotelDetails;
};

export default function HotelLocationMap({ hotel }: Props) {
  const { t } = useTranslation();
  const lat = hotel.latitude;
  const lng = hotel.longitude;

  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=14&output=embed`;

  return (
    <Stack spacing={1}>
      <Typography
        variant="h6"
        fontWeight={800}
        sx={{
          fontWeight: 800,
          fontSize: { xs: "1.75rem", md: "2rem" },
          lineHeight: 1.05,
          background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 1,
        }}
      >
        {t("hotel.location")}
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: 260,
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <iframe
          title="hotel-map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={embedUrl}
        />
      </Box>

      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="outlined"
          component="a"
          href={googleMapsUrl}
          target="_blank"
        >
          {t("hotel.openInGoogleMaps")}
        </Button>
      </Stack>
    </Stack>
  );
}
