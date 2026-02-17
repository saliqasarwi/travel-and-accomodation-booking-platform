import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stack, Typography, CircularProgress, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { httpClient } from "@shared/api/httpClient";
import type { Amenity } from "@features/search/types/types";
type HotelDetails = {
  hotelName: string;
  location: string;
  description: string;
  amenities: Amenity[];
  starRating: number;
  availableRooms: number;
  imageUrl: string;
};

export default function HotelPage() {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState<HotelDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotel() {
      try {
        const res = await httpClient.get(`/hotels/${hotelId}`);
        setHotel(res.data);
      } catch (error) {
        console.error("Failed to fetch hotel", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHotel();
  }, [hotelId]);

  if (loading) {
    return (
      <Stack alignItems="center" mt={4}>
        <CircularProgress />
      </Stack>
    );
  }

  if (!hotel) {
    return <Typography>Hotel not found</Typography>;
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        {hotel.hotelName}
      </Typography>

      <Typography color="text.secondary">{hotel.location}</Typography>

      <Stack direction="row">
        Stars:{hotel.starRating}
        <StarIcon sx={{ color: "gold" }} />
      </Stack>

      <Typography>{hotel.description}</Typography>

      <Stack spacing={1}>
        <Box component="h2">Amenities</Box>
        {hotel.amenities?.map((amenity) => (
          <Box key={amenity.id ?? amenity.name}>
            <b>{amenity.name}:</b> {amenity.description}
          </Box>
        ))}
      </Stack>
      <Typography>Available Rooms: {hotel.availableRooms}</Typography>
    </Stack>
  );
}
