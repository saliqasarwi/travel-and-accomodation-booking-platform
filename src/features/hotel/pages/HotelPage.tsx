import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Stack,
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { httpClient } from "@shared/api/httpClient";
import type { Amenity } from "@features/search/types/types";
import { useSearchParams } from "react-router-dom";
import { useCart } from "@features/cart/useCart";
import type { AvailableRoom } from "../types/hotelRooms.types.ts";
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
  const [gallery, setGallery] = useState<string[]>([]);
  const [rooms, setRooms] = useState<AvailableRoom[]>([]);
  const [searchParams] = useSearchParams();
  const { addItem } = useCart();

  const checkInDate = searchParams.get("checkInDate") ?? "";
  const checkOutDate = searchParams.get("checkOutDate") ?? "";
  const adults = Number(searchParams.get("adults") ?? 2);
  const children = Number(searchParams.get("children") ?? 0);
  const numberOfRooms = Number(searchParams.get("numberOfRooms") ?? 1);
  useEffect(() => {
    async function fetchHotel() {
      try {
        const res = await httpClient.get(`/hotels/${hotelId}`);
        setHotel(res.data);
        const galleryRes = await httpClient.get(`/hotels/${hotelId}/gallery`);
        const data = galleryRes.data as (string | { url: string })[];
        const urls = data.map((x) => (typeof x === "string" ? x : x.url));
        setGallery(urls);
        const roomsRes = await httpClient.get(
          `/hotels/${hotelId}/available-rooms`
        );
        setRooms(roomsRes.data);
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
      <Box>
        <Typography variant="h5" fontWeight={700} mb={1}>
          Gallery
        </Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap">
          {gallery.map((url) => (
            <Box
              key={url}
              component="img"
              src={url}
              alt="Hotel"
              sx={{
                width: 220,
                height: 140,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          ))}
        </Stack>
      </Box>
      <Stack spacing={1}>
        <Box component="h2">Amenities</Box>
        {hotel.amenities?.map((amenity) => (
          <Box key={amenity.id ?? amenity.name}>
            <b>{amenity.name}:</b> {amenity.description}
          </Box>
        ))}
      </Stack>
      <Typography>Available Rooms: {hotel.availableRooms}</Typography>
      <Divider />

      <Typography variant="h5" fontWeight={700}>
        Room Availability
      </Typography>

      <Stack spacing={2}>
        {rooms.map((room) => (
          <Card key={room.roomId} sx={{ borderRadius: 3 }} elevation={2}>
            <Stack direction={{ xs: "column", md: "row" }}>
              <CardMedia
                component="img"
                image={room.roomPhotoUrl || hotel.imageUrl}
                alt={room.roomType}
                sx={{
                  width: { md: 260 },
                  height: { xs: 180, md: "auto" },
                  objectFit: "cover",
                }}
              />

              <CardContent sx={{ flex: 1 }}>
                <Stack spacing={1}>
                  <Typography variant="h6" fontWeight={800}>
                    {room.roomType} (#{room.roomNumber})
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Capacity: {room.capacityOfAdults} adults •{" "}
                    {room.capacityOfChildren} children
                  </Typography>

                  {room.roomAmenities?.length > 0 && (
                    <Typography variant="body2" color="text.secondary">
                      Amenities: {room.roomAmenities.join(" • ")}
                    </Typography>
                  )}

                  <Typography variant="h6" fontWeight={800}>
                    ${room.price} / night
                  </Typography>

                  <Button
                    variant="contained"
                    disabled={!room.availability}
                    onClick={() => {
                      addItem({
                        hotelId: Number(hotelId),
                        hotelName: hotel.hotelName,
                        cityName: hotel.location,
                        starRating: hotel.starRating,
                        roomType: room.roomType,
                        roomPhotoUrl: room.roomPhotoUrl,

                        checkInDate,
                        checkOutDate,
                        adults,
                        children,
                        numberOfRooms,

                        pricePerNight: room.price,
                        discount: 0,
                      });
                    }}
                  >
                    {room.availability ? "Add to cart" : "Not available"}
                  </Button>
                </Stack>
              </CardContent>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
