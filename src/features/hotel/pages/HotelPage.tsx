import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import { useCart } from "@features/cart/useCart";

import type { HotelDetails } from "../types/hotel.types";
import type { AvailableRoom } from "../types/room.types";
import type { HotelReview } from "../types/review.types";

import {
  getHotelDetails,
  getHotelGallery,
  getAvailableRooms,
  getHotelReviews,
} from "../api/hotel.api";

import HotelGallery from "../components/HotelGallery";
import HotelLocationMap from "../components/HotelLocationMap";
import HotelRooms from "../components/HotelRooms";
import HotelReviews from "../components/HotelReviews";
import HotelInformation from "../components/HotelInformation";

export default function HotelPage() {
  const { hotelId } = useParams();
  const numericHotelId = useMemo(() => Number(hotelId), [hotelId]);

  const [hotel, setHotel] = useState<HotelDetails | null>(null);
  const [gallery, setGallery] = useState<{ url: string }[]>([]);
  const [rooms, setRooms] = useState<AvailableRoom[]>([]);
  const [reviews, setReviews] = useState<HotelReview[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const { addItem } = useCart();

  const checkInDate = searchParams.get("checkInDate") ?? "";
  const checkOutDate = searchParams.get("checkOutDate") ?? "";
  const adults = Number(searchParams.get("adults") ?? 2);
  const children = Number(searchParams.get("children") ?? 0);
  const numberOfRooms = Number(searchParams.get("numberOfRooms") ?? 1);

  useEffect(() => {
    async function load() {
      try {
        if (!Number.isFinite(numericHotelId)) return;

        const [hotelDetails, hotelGallery, availableRooms, hotelReviews] =
          await Promise.all([
            getHotelDetails(numericHotelId),
            getHotelGallery(numericHotelId),
            getAvailableRooms(numericHotelId),
            getHotelReviews(numericHotelId),
          ]);

        setHotel(hotelDetails);
        setGallery(hotelGallery ?? []);
        setRooms(availableRooms ?? []);
        setReviews(hotelReviews ?? []);
      } catch (e) {
        console.error("Failed to load hotel:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [numericHotelId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (!hotel) {
    return <Alert color="error">Hotel not found</Alert>;
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={6}>
        <Stack spacing={1.5} alignItems={{ xs: "center", md: "flex-start" }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight={800}
            sx={{
              fontSize: { xs: "2.5rem", md: "3.8rem" },
              background: "linear-gradient(90deg, #1976d2, #42a5f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
            }}
          >
            {hotel.hotelName}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            flexWrap="wrap"
            justifyContent={{ xs: "center", md: "flex-start" }}
          >
            <Typography variant="h6" color="text.secondary" fontWeight={500}>
              {hotel.location}
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              <Rating
                value={hotel.starRating}
                precision={0.1}
                readOnly
                size="medium"
              />
            </Typography>
          </Stack>
        </Stack>

        <HotelInformation hotel={hotel} reviews={reviews} />

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={5}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={6}>
              <HotelGallery items={gallery} />

              <HotelRooms
                rooms={rooms}
                onAddToCart={(room) => {
                  addItem({
                    hotelId: numericHotelId,
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
              />

              <HotelReviews reviews={reviews} />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Box
              sx={{
                position: { lg: "sticky" },
                top: { lg: 24 },
                pb: { lg: 4 },
              }}
            >
              <HotelLocationMap hotel={hotel} />
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
