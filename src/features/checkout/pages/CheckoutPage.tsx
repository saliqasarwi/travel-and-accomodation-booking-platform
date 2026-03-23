import { useState } from "react";
import { Box, CircularProgress, Stack, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useCart } from "@features/cart/useCart";
import { createBooking } from "../api/checkout.api";
import type { CheckoutFormValues } from "../types/checkout.types";

import CheckoutStepper from "../components/CheckoutStepper";
import BookingSummaryCard from "../components/BookingSummaryCard";
import CheckoutHeader from "../components/CheckoutHeader";
import CheckoutActions from "../components/CheckoutActions";
import CheckoutStepContent from "../components/CheckoutStepContent";
import ConfirmActionDialog from "@shared/components/ConfirmActionDialog";

import {
  checkoutInitialValues,
  getNestedErrors,
  getNestedTouched,
} from "../utils/checkoutForm";
import { getStepSchema } from "../validation/checkoutSchemas";

const stepsCount = 3;

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const navigate = useNavigate();
  const { state, clearCart } = useCart();

  const formik = useFormik<CheckoutFormValues>({
    initialValues: checkoutInitialValues,
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
      } catch (error) {
        console.error("Create booking failed", error);
        helpers.setSubmitting(false);
      }
    },
  });

  async function handleNext() {
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

    try {
      await getStepSchema(activeStep).validate(formik.values, {
        abortEarly: false,
      });
      setActiveStep((prev) => Math.min(prev + 1, stepsCount - 1));
      formik.setErrors({});
      formik.setTouched({});
    } catch (err) {
      const nextErrors: Record<string, string> = {};
      if (err instanceof Yup.ValidationError) {
        for (const e of err.inner) {
          if (e.path && !nextErrors[e.path]) {
            nextErrors[e.path] = e.message;
          }
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
        <CheckoutHeader />

        <CheckoutStepper activeStep={activeStep} />

        <Stack
          direction={{ xs: "column", lg: "row" }}
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
              <CheckoutStepContent
                activeStep={activeStep}
                values={formik.values}
                onGuestInfoChange={(next) =>
                  formik.setFieldValue("guestInfo", next)
                }
                onPaymentInfoChange={(next) =>
                  formik.setFieldValue("paymentInfo", next)
                }
                onSpecialRequestsChange={(next) =>
                  formik.setFieldValue("specialRequests", next)
                }
                guestInfoErrors={getNestedErrors(
                  formik.errors as Record<string, unknown>,
                  "guestInfo"
                )}
                guestInfoTouched={getNestedTouched(
                  formik.touched as Record<string, unknown>,
                  "guestInfo"
                )}
                paymentInfoErrors={getNestedErrors(
                  formik.errors as Record<string, unknown>,
                  "paymentInfo"
                )}
                paymentInfoTouched={getNestedTouched(
                  formik.touched as Record<string, unknown>,
                  "paymentInfo"
                )}
                specialRequestsErrors={getNestedErrors(
                  formik.errors as Record<string, unknown>,
                  "specialRequests"
                )}
                specialRequestsTouched={getNestedTouched(
                  formik.touched as Record<string, unknown>,
                  "specialRequests"
                )}
                onBlur={formik.handleBlur}
              />

              <CheckoutActions
                isLastStep={isLastStep}
                isSubmitting={formik.isSubmitting}
                activeStep={activeStep}
                onBack={handleBack}
                onNext={handleNext}
                onConfirm={handleOpenConfirm}
              />
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
