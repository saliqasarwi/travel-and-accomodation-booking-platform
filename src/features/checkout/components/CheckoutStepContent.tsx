import GuestInfoStep from "./GuestInfoStep";
import PaymentStep from "./PaymentStep";
import SpecialRequestsStep from "./SpecialRequestsStep";
import type { CheckoutFormValues } from "../types/checkout.types";

type Props = {
  activeStep: number;
  values: CheckoutFormValues;
  onGuestInfoChange: (next: CheckoutFormValues["guestInfo"]) => void;
  onPaymentInfoChange: (next: CheckoutFormValues["paymentInfo"]) => void;
  onSpecialRequestsChange: (
    next: CheckoutFormValues["specialRequests"]
  ) => void;
  guestInfoErrors: Record<string, string>;
  guestInfoTouched: Record<string, boolean>;
  paymentInfoErrors: Record<string, string>;
  paymentInfoTouched: Record<string, boolean>;
  specialRequestsErrors: Record<string, string>;
  specialRequestsTouched: Record<string, boolean>;
  onBlur: (e: React.FocusEvent) => void;
};

export default function CheckoutStepContent({
  activeStep,
  values,
  onGuestInfoChange,
  onPaymentInfoChange,
  onSpecialRequestsChange,
  guestInfoErrors,
  guestInfoTouched,
  paymentInfoErrors,
  paymentInfoTouched,
  specialRequestsErrors,
  specialRequestsTouched,
  onBlur,
}: Props) {
  if (activeStep === 0) {
    return (
      <GuestInfoStep
        value={values.guestInfo}
        onChange={onGuestInfoChange}
        errors={guestInfoErrors}
        touched={guestInfoTouched}
        onBlur={onBlur}
      />
    );
  }

  if (activeStep === 1) {
    return (
      <PaymentStep
        value={values.paymentInfo}
        onChange={onPaymentInfoChange}
        errors={paymentInfoErrors}
        touched={paymentInfoTouched}
        onBlur={onBlur}
      />
    );
  }

  return (
    <SpecialRequestsStep
      value={values.specialRequests}
      onChange={onSpecialRequestsChange}
      errors={specialRequestsErrors}
      touched={specialRequestsTouched}
      onBlur={onBlur}
    />
  );
}
