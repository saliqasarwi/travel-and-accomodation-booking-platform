import { Box, Button, Stack, Typography } from "@mui/material";
import type { HotelDetails } from "../types/hotel.types";

type Props = {
  hotel: HotelDetails;
};

export default function HotelLocationMap({ hotel }: Props) {
  const lat = hotel.latitude;
  const lng = hotel.longitude;

  const canShowMap = typeof lat === "number" && typeof lng === "number";

  const googleMapsUrl = canShowMap
    ? `https://www.google.com/maps?q=${lat},${lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.location)}`;

  const embedUrl = canShowMap
    ? `https://maps.google.com/maps?q=${lat},${lng}&z=14&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent(hotel.location)}&z=14&output=embed`;

  return (
    <Stack spacing={1}>
      <Typography variant="h6" fontWeight={800}>
        Location on map
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

      <Stack direction="row" spacing={1} flexWrap="wrap">
        <Button
          variant="outlined"
          component="a"
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open in Google Maps
        </Button>
      </Stack>

      <Box
        sx={{
          p: 1.5,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography fontWeight={800}>Nearby attractions</Typography>
        <Typography color="text.secondary" variant="body2">
          Nearby attractions
        </Typography>
      </Box>
    </Stack>
  );
}
