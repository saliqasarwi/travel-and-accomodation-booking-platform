import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import CheckoutStepper from "../components/CheckoutStepper";
import { useMemo, useState } from "react";
import GuestInfoStep from "../components/GuestInfoStep";
import PaymentStep from "../components/PaymentStep";
import SpecialRequestsStep from "../components/SpecialRequestsStep";
import BookingSummaryCard from "../components/BookingSummaryCard";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../api/checkout.api";
import { useCart } from "@features/cart/useCart";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { CheckoutFormValues, PaymentInfo } from "../types/checkout.types";
import ConfirmActionDialog from "@shared/components/ConfirmActionDialog";
const stepsCount = 3;
const guestInfoSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  phone: Yup.string().trim().required("Phone is required"),
});

const paymentSchema = Yup.object({
  method: Yup.mixed<PaymentInfo["method"]>()
    .oneOf(["credit_card", "pay_at_hotel"])
    .required("Payment method is required"),
  cardNumber: Yup.string().when("method", {
    is: "credit_card",
    then: (num) =>
      num
        .trim()
        .required("Card number is required")
        .matches(/^[0-9 ]+$/, "Only digits/spaces")
        .min(12, "Too short"),
    otherwise: (num) => num.notRequired(),
  }),
  expiry: Yup.string().when("method", {
    is: "credit_card",
    then: (expiry) =>
      expiry
        .trim()
        .required("Expiry is required")
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY"),
    otherwise: (expiry) => expiry.notRequired(),
  }),
  cvv: Yup.string().when("method", {
    is: "credit_card",
    then: (cvv) =>
      cvv
        .trim()
        .required("CVV is required")
        .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
    otherwise: (cvv) => cvv.notRequired(),
  }),
  cardholderName: Yup.string().when("method", {
    is: "credit_card",
    then: (cardholderName) =>
      cardholderName.trim().required("Cardholder name is required"),
    otherwise: (cardholderName) => cardholderName.notRequired(),
  }),
});

const requestsSchema = Yup.object({
  notes: Yup.string().max(500, "Too long (max 500 chars)").nullable(),
});

function getStepSchema(step: number) {
  if (step === 0) return Yup.object({ guestInfo: guestInfoSchema });
  if (step === 1) return Yup.object({ paymentInfo: paymentSchema });
  return Yup.object({ specialRequests: requestsSchema });
}
export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const initialValues: CheckoutFormValues = useMemo(
    () => ({
      guestInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      paymentInfo: {
        method: "credit_card",
        cardNumber: "",
        expiry: "",
        cvv: "",
        cardholderName: "",
      },
      specialRequests: {
        notes: "",
      },
    }),
    []
  );

  const formik = useFormik<CheckoutFormValues>({
    initialValues,
    validationSchema: getStepSchema(activeStep),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, helpers) => {
      try {
        if (!state.items.length) {
          navigate("/");
          return;
        }
        const result = await createBooking({
          guestInfo: values.guestInfo,
          paymentInfo: values.paymentInfo,
          specialRequests: values.specialRequests,
          items: state.items,
        });
        clearCart();
        navigate(`/confirmation/${result.bookingId}`);
      } catch (e) {
        console.error("Create booking failed", e);
        helpers.setSubmitting(false);
      }
    },
  });

  // Helper to extract nested errors for a step section
  const getNestedErrors = (section: string) => {
    const raw = formik.errors as Record<string, unknown>;
    return (raw[section] ?? {}) as Record<string, string>;
  };

  const getNestedTouched = (section: string) => {
    const raw = formik.touched as Record<string, unknown>;
    return (raw[section] ?? {}) as Record<string, boolean>;
  };

  async function handleNext() {
    // Mark all fields for the current step as touched so errors show immediately
    if (activeStep === 0) {
      await formik.setTouched({
        guestInfo: {
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      });
    } else if (activeStep === 1) {
      await formik.setTouched({
        paymentInfo: {
          method: true,
          cardNumber: true,
          expiry: true,
          cvv: true,
          cardholderName: true,
        },
      });
    } else {
      await formik.setTouched({
        specialRequests: { notes: true },
      });
    }

    // validate current step only
    const stepSchema = getStepSchema(activeStep);

    try {
      await stepSchema.validate(formik.values, { abortEarly: false });
      setActiveStep((prev) => Math.min(prev + 1, stepsCount - 1));
      // clear step errors & touched when moving forward
      formik.setErrors({});
      formik.setTouched({});
    } catch (err) {
      const nextErrors: Record<string, string> = {};
      if (err instanceof Yup.ValidationError) {
        for (const e of err.inner) {
          if (e.path && !nextErrors[e.path]) nextErrors[e.path] = e.message;
        }
      }
      formik.setErrors(nextErrors);
    }
  }

  function handleBack() {
    formik.setErrors({});
    formik.setTouched({});
    setActiveStep((prev) => Math.max(prev - 1, 0));
  }
  function handleOpenConfirm() {
    setConfirmOpen(true);
  }

  function handleCloseConfirm() {
    if (formik.isSubmitting) return;
    setConfirmOpen(false);
  }

  async function handleConfirmBooking() {
    setConfirmOpen(false);
    await formik.submitForm();
  }
  const isLastStep = activeStep === stepsCount - 1;
  if (formik.isSubmitting) {
    return (
      <Box sx={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!state.items.length) {
    return <Alert severity="warning">Your cart is empty.</Alert>;
  }
  return (
    <>
      <Stack
        spacing={{ xs: 2.5, md: 3 }}
        sx={{
          px: { xs: 1.5, sm: 2, md: 4, lg: 6 },
          pb: { xs: 3, md: 4 },
          width: "100%",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.5rem" },
              lineHeight: 1.05,
              background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 0.75,
            }}
          >
            Checkout
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Complete your booking details and confirm your stay.
          </Typography>

          <Box
            sx={{
              width: 72,
              height: 4,
              borderRadius: 999,
              background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
            }}
          />
        </Box>
        <CheckoutStepper activeStep={activeStep} />

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, lg: 4 }}
          alignItems="stretch"
        >
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              width: { xs: "100%", lg: "auto" },
            }}
          >
            <Stack spacing={2.5}>
              {activeStep === 0 && (
                <GuestInfoStep
                  value={formik.values.guestInfo}
                  onChange={(next) => formik.setFieldValue("guestInfo", next)}
                  errors={getNestedErrors("guestInfo")}
                  touched={getNestedTouched("guestInfo")}
                  onBlur={formik.handleBlur}
                />
              )}

              {activeStep === 1 && (
                <PaymentStep
                  value={formik.values.paymentInfo}
                  onChange={(next) => formik.setFieldValue("paymentInfo", next)}
                  errors={getNestedErrors("paymentInfo")}
                  touched={getNestedTouched("paymentInfo")}
                  onBlur={formik.handleBlur}
                />
              )}

              {activeStep === 2 && (
                <SpecialRequestsStep
                  value={formik.values.specialRequests}
                  onChange={(next) =>
                    formik.setFieldValue("specialRequests", next)
                  }
                  errors={getNestedErrors("specialRequests")}
                  touched={getNestedTouched("specialRequests")}
                  onBlur={formik.handleBlur}
                />
              )}

              <Stack
                direction={{ xs: "column-reverse", sm: "row" }}
                spacing={1.5}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
                sx={{ width: "100%" }}
              >
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0 || formik.isSubmitting}
                  sx={{
                    fontWeight: 700,
                    alignSelf: { xs: "flex-start", sm: "auto" },
                  }}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  onClick={isLastStep ? handleOpenConfirm : handleNext}
                  sx={{
                    minWidth: { xs: "100%", sm: 180 },
                    fontWeight: 700,
                    borderRadius: 2,
                  }}
                >
                  {isLastStep ? "Confirm booking" : "Next"}
                </Button>
              </Stack>
            </Stack>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", lg: 360 },
              maxWidth: "100%",
              flexShrink: 0,
              position: { xs: "static", lg: "sticky" },
              top: { lg: 96 },
              alignSelf: { xs: "stretch", lg: "flex-start" },
            }}
          >
            <BookingSummaryCard />
          </Box>
        </Stack>
      </Stack>
      <ConfirmActionDialog
        open={confirmOpen}
        title="Confirm booking"
        message="Are you sure you want to confirm this booking?"
        confirmText="Confirm booking"
        cancelText="Cancel"
        confirmColor="primary"
        loading={formik.isSubmitting}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmBooking}
      />
    </>
  );
}
