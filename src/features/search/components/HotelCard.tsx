import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Chip,
  Box,
  CardActionArea,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import HotelIcon from "@mui/icons-material/Hotel";
import type { HotelSearchItem } from "../types/types";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {
  hotel: HotelSearchItem;
};

export default function HotelCard({ hotel }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const checkIn = searchParams.get("checkInDate") ?? "";
  const checkOut = searchParams.get("checkOutDate") ?? "";
  const adults = Number(searchParams.get("adults") ?? 2);
  const children = Number(searchParams.get("children") ?? 0);
  const rooms = Number(searchParams.get("numberOfRooms") ?? 1);

  const onCardClick = () => {
    navigate(`/hotels/${hotel.hotelId}?${searchParams.toString()}`);
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
      elevation={2}
    >
      <CardActionArea onClick={onCardClick}>
        <Stack direction="row">
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
                <Typography variant="body2">
                  {hotel.starRating} Stars
                </Typography>
              </Stack>
              <Typography variant="subtitle1" fontWeight={700}>
                ${hotel.roomPrice} / night
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {hotel.roomType} • {hotel.cityName}
              </Typography>

              {checkIn && checkOut && (
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <CalendarMonthIcon
                    sx={{ fontSize: 16, color: "text.secondary" }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {checkIn} → {checkOut}
                  </Typography>
                </Stack>
              )}

              <Stack direction="row" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <PeopleIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    {adults} adult{adults !== 1 ? "s" : ""}
                    {children > 0 &&
                      ` • ${children} child${children !== 1 ? "ren" : ""}`}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <HotelIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    {rooms} room{rooms !== 1 ? "s" : ""}
                  </Typography>
                </Stack>
              </Stack>

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
        </Stack>
      </CardActionArea>
    </Card>
  );
}
