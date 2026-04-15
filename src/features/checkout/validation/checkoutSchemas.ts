import * as Yup from "yup";
import type { PaymentInfo } from "../types/checkout.types";
import i18n from "@shared/i18n/i18n";

const guestInfoSchema = () =>
  Yup.object({
    firstName: Yup.string()
      .trim()
      .required(i18n.t("validation.firstNameRequired")),
    lastName: Yup.string()
      .trim()
      .required(i18n.t("validation.lastNameRequired")),
    email: Yup.string()
      .trim()
      .email(i18n.t("validation.emailInvalid"))
      .required(i18n.t("validation.emailRequired")),
    phone: Yup.string().trim().required(i18n.t("validation.phoneRequired")),
  });

const paymentSchema = () =>
  Yup.object({
    method: Yup.mixed<PaymentInfo["method"]>()
      .oneOf(["credit_card", "pay_at_hotel"])
      .required(i18n.t("validation.paymentMethodRequired")),

    cardNumber: Yup.string().when("method", {
      is: "credit_card",
      then: (schema) =>
        schema
          .trim()
          .required(i18n.t("validation.cardNumberRequired"))
          .matches(/^[0-9 ]+$/, i18n.t("validation.digitsOnly"))
          .min(12, i18n.t("validation.cardNumberTooShort")),
      otherwise: (schema) => schema.notRequired(),
    }),

    expiry: Yup.string().when("method", {
      is: "credit_card",
      then: (schema) =>
        schema
          .trim()
          .required(i18n.t("validation.expiryRequired"))
          .matches(
            /^(0[1-9]|1[0-2])\/\d{2}$/,
            i18n.t("validation.expiryFormat")
          ),
      otherwise: (schema) => schema.notRequired(),
    }),

    cvv: Yup.string().when("method", {
      is: "credit_card",
      then: (schema) =>
        schema
          .trim()
          .required(i18n.t("validation.cvvRequired"))
          .matches(/^\d{3,4}$/, i18n.t("validation.cvvInvalid")),
      otherwise: (schema) => schema.notRequired(),
    }),

    cardholderName: Yup.string().when("method", {
      is: "credit_card",
      then: (schema) =>
        schema.trim().required(i18n.t("validation.cardholderNameRequired")),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

const requestsSchema = () =>
  Yup.object({
    notes: Yup.string().max(500, i18n.t("validation.notesTooLong")).nullable(),
  });

export function getStepSchema(step: number) {
  if (step === 0) return Yup.object({ guestInfo: guestInfoSchema() });
  if (step === 1) return Yup.object({ paymentInfo: paymentSchema() });
  return Yup.object({ specialRequests: requestsSchema() });
}
