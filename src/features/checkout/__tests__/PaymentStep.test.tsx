import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PaymentStep from "../components/PaymentStep";
import type { PaymentInfo } from "../types/checkout.types";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "checkout.paymentMethod": "Payment method",
        "checkout.paymentMethodHint": "Choose how you want to pay",
        "checkout.creditCard": "Credit card",
        "checkout.payAtHotel": "Pay at hotel",
        "checkout.cardNumber": "Card number",
        "checkout.expiry": "Expiry",
        "checkout.cvv": "CVV",
        "checkout.cardholderName": "Cardholder name",
        "checkout.nameOnCard": "Name on card",
        "checkout.payAtHotelHint": "You will pay when you arrive at the hotel",
      };

      return translations[key] ?? key;
    },
  }),
}));

const cardValue: PaymentInfo = {
  method: "credit_card",
  cardNumber: "123456789012",
  expiry: "12/30",
  cvv: "123",
  cardholderName: "Sali Qasarwi",
};

describe("PaymentStep", () => {
  it("renders credit card fields when method is credit card", () => {
    render(<PaymentStep value={cardValue} onChange={vi.fn()} />);

    expect(screen.getByText("Payment method")).toBeInTheDocument();
    expect(screen.getByLabelText("Card number")).toHaveValue("123456789012");
    expect(screen.getByLabelText("Expiry")).toHaveValue("12/30");
    expect(screen.getByLabelText("CVV")).toHaveValue("123");
    expect(screen.getByLabelText("Cardholder name")).toHaveValue(
      "Sali Qasarwi"
    );
  });

  it("calls onChange when payment method changes to pay at hotel", () => {
    const onChange = vi.fn();

    render(<PaymentStep value={cardValue} onChange={onChange} />);

    fireEvent.click(screen.getByLabelText("Pay at hotel"));

    expect(onChange).toHaveBeenCalledWith({
      ...cardValue,
      method: "pay_at_hotel",
    });
  });

  it("renders pay at hotel hint when method is pay at hotel", () => {
    render(
      <PaymentStep value={{ method: "pay_at_hotel" }} onChange={vi.fn()} />
    );

    expect(
      screen.getByText("You will pay when you arrive at the hotel")
    ).toBeInTheDocument();

    expect(screen.queryByLabelText("Card number")).not.toBeInTheDocument();
  });

  it("updates card number", () => {
    const onChange = vi.fn();

    render(<PaymentStep value={cardValue} onChange={onChange} />);

    fireEvent.change(screen.getByLabelText("Card number"), {
      target: { value: "9999" },
    });

    expect(onChange).toHaveBeenCalledWith({
      ...cardValue,
      cardNumber: "9999",
    });
  });

  it("updates expiry", () => {
    const onChange = vi.fn();

    render(<PaymentStep value={cardValue} onChange={onChange} />);

    fireEvent.change(screen.getByLabelText("Expiry"), {
      target: { value: "01/31" },
    });

    expect(onChange).toHaveBeenCalledWith({
      ...cardValue,
      expiry: "01/31",
    });
  });

  it("updates cvv", () => {
    const onChange = vi.fn();

    render(<PaymentStep value={cardValue} onChange={onChange} />);

    fireEvent.change(screen.getByLabelText("CVV"), {
      target: { value: "999" },
    });

    expect(onChange).toHaveBeenCalledWith({
      ...cardValue,
      cvv: "999",
    });
  });

  it("updates cardholder name", () => {
    const onChange = vi.fn();

    render(<PaymentStep value={cardValue} onChange={onChange} />);

    fireEvent.change(screen.getByLabelText("Cardholder name"), {
      target: { value: "New Name" },
    });

    expect(onChange).toHaveBeenCalledWith({
      ...cardValue,
      cardholderName: "New Name",
    });
  });

  it("shows touched field error", () => {
    render(
      <PaymentStep
        value={cardValue}
        onChange={vi.fn()}
        errors={{ cardNumber: "Card number is required" }}
        touched={{ cardNumber: true }}
      />
    );

    expect(screen.getByText("Card number is required")).toBeInTheDocument();
  });

  it("does not show untouched field error", () => {
    render(
      <PaymentStep
        value={cardValue}
        onChange={vi.fn()}
        errors={{ cardNumber: "Card number is required" }}
        touched={{ cardNumber: false }}
      />
    );

    expect(
      screen.queryByText("Card number is required")
    ).not.toBeInTheDocument();
  });

  it("calls onBlur when card number field loses focus", () => {
    const onBlur = vi.fn();

    render(
      <PaymentStep value={cardValue} onChange={vi.fn()} onBlur={onBlur} />
    );

    fireEvent.blur(screen.getByLabelText("Card number"));

    expect(onBlur).toHaveBeenCalled();
  });
});
