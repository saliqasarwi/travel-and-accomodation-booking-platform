import * as Yup from "yup";
import type { PaymentInfo } from "../types/checkout.types";

export const guestInfoSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  phone: Yup.string().trim().required("Phone is required"),
});

export const paymentSchema = Yup.object({
  method: Yup.mixed<PaymentInfo["method"]>()
    .oneOf(["credit_card", "pay_at_hotel"])
    .required("Payment method is required"),
  cardNumber: Yup.string().when("method", {
    is: "credit_card",
    then: (schema) =>
      schema
        .trim()
        .required("Card number is required")
        .matches(/^[0-9 ]+$/, "Only digits/spaces")
        .min(12, "Too short"),
    otherwise: (schema) => schema.notRequired(),
  }),
  expiry: Yup.string().when("method", {
    is: "credit_card",
    then: (schema) =>
      schema
        .trim()
        .required("Expiry is required")
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY"),
    otherwise: (schema) => schema.notRequired(),
  }),
  cvv: Yup.string().when("method", {
    is: "credit_card",
    then: (schema) =>
      schema
        .trim()
        .required("CVV is required")
        .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardholderName: Yup.string().when("method", {
    is: "credit_card",
    then: (schema) => schema.trim().required("Cardholder name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const requestsSchema = Yup.object({
  notes: Yup.string().max(500, "Too long (max 500 chars)").nullable(),
});

export function getStepSchema(step: number) {
  if (step === 0) return Yup.object({ guestInfo: guestInfoSchema });
  if (step === 1) return Yup.object({ paymentInfo: paymentSchema });
  return Yup.object({ specialRequests: requestsSchema });
}
