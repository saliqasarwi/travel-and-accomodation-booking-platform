import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import type { AvailableRoom } from "../types/room.types";
import { localizeField } from "@shared/utils/localize";

type Props = {
  rooms: AvailableRoom[];
  onAddToCart: (room: AvailableRoom) => void;
};

export default function HotelRoomsSection({ rooms, onAddToCart }: Props) {
  const { t, i18n } = useTranslation();

  return (
    <Stack spacing={2}>
      <Typography
        variant="h5"
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
        {t("hotel.availableRooms")}
      </Typography>

      {rooms.length === 0 ? (
        <Typography color="text.secondary">
          {t("hotel.noAvailableRooms")}
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {rooms.map((room) => (
            <Grid key={room.roomId} size={{ xs: 12, sm: 6 }}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 16px 32px rgba(15, 23, 42, 0.10)",
                  },
                }}
                elevation={0}
              >
                <CardMedia
                  component="img"
                  image={room.roomPhotoUrl}
                  alt={localizeField(room.roomType, i18n.language)}
                  sx={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                  }}
                />

                <CardContent
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.25,
                  }}
                >
                  <Box>
                    <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5 }}>
                      {localizeField(room.roomType, i18n.language)}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    {t("hotel.capacity")}: {room.capacityOfAdults}{" "}
                    {t("hotel.adults")} • {room.capacityOfChildren}{" "}
                    {t("hotel.children")}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {t("hotel.amenities")}:{" "}
                    {room.amenities
                      .map((a) => localizeField(a.name, i18n.language))
                      .join(" • ")}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 900,
                      color: "primary.main",
                      mt: 0.5,
                    }}
                  >
                    ${room.price} / {t("hotel.perNight")}
                  </Typography>

                  <Button
                    variant="contained"
                    disabled={!room.availability}
                    onClick={() => onAddToCart(room)}
                    fullWidth
                    sx={{ mt: 0.5 }}
                  >
                    {room.availability
                      ? t("hotel.addToCart")
                      : t("admin.notAvailable")}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
}
