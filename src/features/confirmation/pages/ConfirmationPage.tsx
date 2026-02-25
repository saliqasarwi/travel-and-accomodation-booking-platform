import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import HomeRounded from "@mui/icons-material/HomeRounded";
import { getBookingDetails } from "../api/confirmation.api";
import type { BookingApiResponse } from "../types/confirmation.types";
import ConfirmationHeaderCard from "../components/ConfirmationHeaderCard";
import HotelRoomsCard from "../components/HotelRoomsCard";
import GuestInfoCard from "../components/GuestInfoCard";
import SpecialRequestsCard from "../components/SpecialRequestCard";
import { calculateBookingTotals } from "../utils/booking.utils";
import TotalsCard from "../components/TotalsCard";

export default function ConfirmationPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingApiResponse | null>(null);

  useEffect(() => {
    let alive = true;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const id = Number(bookingId);
        if (!bookingId || Number.isNaN(id))
          throw new Error("Invalid booking id");

        const data = await getBookingDetails(id);
        if (!alive) return;

        setBooking(data);
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Failed to load booking");
      } finally {
        if (alive) setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [bookingId]);

  if (loading) {
    return (
      <Stack alignItems="center" mt={6} spacing={2}>
        <CircularProgress />
        <Typography color="text.secondary">Loading confirmation…</Typography>
      </Stack>
    );
  }

  if (error || !booking) {
    return (
      <Stack spacing={2} mt={3}>
        <Alert severity="error">{error ?? "Booking not found"}</Alert>
        <Button
          startIcon={<HomeRounded />}
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ width: "fit-content" }}
        >
          Back to Home
        </Button>
      </Stack>
    );
  }

  const { subtotal, discounts, total } = calculateBookingTotals(
    booking.request.items
  );

  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <div ref={printRef} data-print-root>
        <Grid
          container
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
          gap={4}
        >
          <ConfirmationHeaderCard
            confirmationNumber={booking.confirmationNumber}
            status={booking.bookingStatus}
            createdAt={booking.createdAt}
          />
          <HotelRoomsCard items={booking.request.items} />
          <GuestInfoCard guest={booking.request.guestInfo} />
          <SpecialRequestsCard notes={booking.request.specialRequests} />
          <TotalsCard subtotal={subtotal} discounts={discounts} total={total} />
        </Grid>
      </div>
    </Stack>
  );
}
