import { Button, Card, CardContent, Stack } from "@mui/material";
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
          navigate("/home/search");
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
      setActiveStep((s) => Math.min(s + 1, stepsCount - 1));
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
    setActiveStep((s) => Math.max(s - 1, 0));
  }

  const isLastStep = activeStep === stepsCount - 1;

  return (
    <Stack spacing={2}>
      <CheckoutStepper activeStep={activeStep} />

      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        spacing={10}
      >
        {/* LEFT COLUMN */}
        <Stack flex={1} spacing={2}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 2 }}>
              {activeStep === 0 && (
                <GuestInfoStep
                  value={formik.values.guestInfo}
                  onChange={(next) => {
                    formik.setFieldValue("guestInfo", next);
                  }}
                  errors={getNestedErrors("guestInfo")}
                  touched={getNestedTouched("guestInfo")}
                  onBlur={formik.handleBlur}
                />
              )}
              {activeStep === 1 && (
                <PaymentStep
                  value={formik.values.paymentInfo}
                  onChange={(next) => {
                    formik.setFieldValue("paymentInfo", next);
                  }}
                  errors={getNestedErrors("paymentInfo")}
                  touched={getNestedTouched("paymentInfo")}
                  onBlur={formik.handleBlur}
                />
              )}
              {activeStep === 2 && (
                <SpecialRequestsStep
                  value={formik.values.specialRequests}
                  onChange={(next) => {
                    formik.setFieldValue("specialRequests", next);
                  }}
                  errors={getNestedErrors("specialRequests")}
                  touched={getNestedTouched("specialRequests")}
                  onBlur={formik.handleBlur}
                />
              )}
            </CardContent>
          </Card>

          <Stack direction="row" justifyContent="space-between">
            <Button
              onClick={handleBack}
              disabled={activeStep === 0 || formik.isSubmitting}
            >
              Back
            </Button>

            <Button
              variant="contained"
              onClick={isLastStep ? () => formik.handleSubmit() : handleNext}
            >
              {isLastStep ? "Confirm booking" : "Next"}
            </Button>
          </Stack>
        </Stack>

        <Stack
          width={{ xs: "100%", md: 380 }}
          sx={{ position: "sticky", top: 100, height: "fit-content" }}
        >
          <BookingSummaryCard />
        </Stack>
      </Stack>
    </Stack>
  );
}
