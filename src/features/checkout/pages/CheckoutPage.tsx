import { Button, Card, CardContent, Stack } from "@mui/material";
import CheckoutStepper from "../components/CheckoutStepper";
import { useState } from "react";
import GuestInfoStep from "../components/GuestInfoStep";
import type {
  GuestInfo,
  PaymentInfo,
  SpecialRequests,
} from "../types/checkout.types";
import PaymentStep from "../components/PaymentStep";
import SpecialRequestsStep from "../components/SpecialRequestsStep";
import BookingSummaryCard from "../components/BookingSummaryCard";
const stepsCount = 3;
export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: "credit_card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardholderName: "",
  });
  const [specialRequests, setSpecialRequests] = useState<SpecialRequests>({
    notes: "",
  });

  const handleNext = () =>
    setActiveStep((s) => Math.min(s + 1, stepsCount - 1));
  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 0));

  return (
    <Stack spacing={2}>
      <CheckoutStepper activeStep={activeStep} />

      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="flex-start"
        spacing={10}
      >
        {/* LEFT COLUMN */}
        <Stack flex={1} spacing={2}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 2 }}>
              {activeStep === 0 && (
                <GuestInfoStep value={guestInfo} onChange={setGuestInfo} />
              )}
              {activeStep === 1 && (
                <PaymentStep value={paymentInfo} onChange={setPaymentInfo} />
              )}
              {activeStep === 2 && (
                <SpecialRequestsStep
                  value={specialRequests}
                  onChange={setSpecialRequests}
                />
              )}
            </CardContent>
          </Card>

          <Stack direction="row" justifyContent="space-between">
            <Button onClick={handleBack} disabled={activeStep === 0}>
              Back
            </Button>

            <Button variant="contained" onClick={handleNext}>
              {activeStep === stepsCount - 1 ? "Review Booking" : "Next"}
            </Button>
          </Stack>
        </Stack>

        <Stack width={{ xs: "100%", md: 380 }}>
          <BookingSummaryCard />
        </Stack>
      </Stack>
    </Stack>
  );
}
