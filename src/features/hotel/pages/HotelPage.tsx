import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
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
    <Container disableGutters maxWidth={false}>
      <Grid
        container
        spacing={2.5}
        alignItems="flex-start"
        sx={{
          pl: { xs: 0.5, md: 1 },
          py: { xs: 0.5, md: 1 },
        }}
      >
        <Grid size={{ xs: 12, lg: 3.2 }}>
          <Stack spacing={2}>
            <HotelInformation hotel={hotel} />
            <HotelReviews reviews={reviews} />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Stack spacing={2}>
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
          </Stack>
        </Grid>

        <Grid
          size={{ xs: 12, lg: 2.8 }}
          sx={{
            alignSelf: { lg: "flex-start" },
            position: { xs: "static", lg: "sticky" },
            top: { lg: 88 },
            px: { xs: 0.5, md: 0.5 },
            py: { xs: 0.3, md: 0.5 },
          }}
        >
          <HotelLocationMap hotel={hotel} />
        </Grid>
      </Grid>
    </Container>
  );
}
