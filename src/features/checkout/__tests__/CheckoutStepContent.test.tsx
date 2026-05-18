import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CheckoutStepContent from "../components/CheckoutStepContent";
import type { CheckoutFormValues } from "../types/checkout.types";

vi.mock("../components/GuestInfoStep", () => ({
  default: () => <div>Guest Info Step</div>,
}));

vi.mock("../components/PaymentStep", () => ({
  default: () => <div>Payment Step</div>,
}));

vi.mock("../components/SpecialRequestsStep", () => ({
  default: () => <div>Special Requests Step</div>,
}));

const values: CheckoutFormValues = {
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
};

const baseProps = {
  values,
  onGuestInfoChange: vi.fn(),
  onPaymentInfoChange: vi.fn(),
  onSpecialRequestsChange: vi.fn(),
  guestInfoErrors: {},
  guestInfoTouched: {},
  paymentInfoErrors: {},
  paymentInfoTouched: {},
  specialRequestsErrors: {},
  specialRequestsTouched: {},
  onBlur: vi.fn(),
};

describe("CheckoutStepContent", () => {
  it("renders guest info step for active step 0", () => {
    render(<CheckoutStepContent {...baseProps} activeStep={0} />);

    expect(screen.getByText("Guest Info Step")).toBeInTheDocument();
  });

  it("renders payment step for active step 1", () => {
    render(<CheckoutStepContent {...baseProps} activeStep={1} />);

    expect(screen.getByText("Payment Step")).toBeInTheDocument();
  });

  it("renders special requests step for active step 2", () => {
    render(<CheckoutStepContent {...baseProps} activeStep={2} />);

    expect(screen.getByText("Special Requests Step")).toBeInTheDocument();
  });

  it("renders special requests step for any step greater than 1", () => {
    render(<CheckoutStepContent {...baseProps} activeStep={5} />);

    expect(screen.getByText("Special Requests Step")).toBeInTheDocument();
  });
});
