import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Chip,
  Box,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import type { HotelSearchItem } from "../types/types";

type Props = {
  hotel: HotelSearchItem;
};

export default function HotelCard({ hotel }: Props) {
  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: 3,
        overflow: "hidden",
      }}
      elevation={2}
    >
      <CardMedia
        component="img"
        image={hotel.roomPhotoUrl}
        alt={hotel.hotelName}
        sx={{
          width: 240,
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={600}>
            {hotel.hotelName}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <StarIcon sx={{ color: "#fbc02d", fontSize: 18 }} />
            <Typography variant="body2">{hotel.starRating} Stars</Typography>
          </Stack>
          <Typography variant="subtitle1" fontWeight={700}>
            ${hotel.roomPrice} / night
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {hotel.roomType} • {hotel.cityName}
          </Typography>
          {hotel.discount > 0 && (
            <Box>
              <Chip
                label={`${hotel.discount}% OFF`}
                color="success"
                size="small"
              />
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
