import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import GuestInfoStep from "../components/GuestInfoStep";
import type { GuestInfo } from "../types/checkout.types";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "checkout.guestInformation": "Guest information",
        "checkout.guestInformationHint": "Enter guest details",
        "checkout.firstName": "First name",
        "checkout.lastName": "Last name",
        "checkout.email": "Email",
        "checkout.phone": "Phone",
      };

      return translations[key] ?? key;
    },
  }),
}));

const guestInfo: GuestInfo = {
  firstName: "Sali",
  lastName: "Qasarwi",
  email: "sali@gmail.com",
  phone: "0599999999",
};

describe("GuestInfoStep", () => {
  it("renders guest info fields", () => {
    render(<GuestInfoStep value={guestInfo} onChange={vi.fn()} />);

    expect(screen.getByText("Guest information")).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toHaveValue("Sali");
    expect(screen.getByLabelText(/last name/i)).toHaveValue("Qasarwi");
    expect(screen.getByLabelText(/email/i)).toHaveValue("sali@gmail.com");
    expect(screen.getByLabelText(/phone/i)).toHaveValue("0599999999");
  });

  it("calls onChange when first name changes", () => {
    const onChange = vi.fn();

    render(<GuestInfoStep value={guestInfo} onChange={onChange} />);

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "Sara" },
    });

    expect(onChange).toHaveBeenCalledWith({
      ...guestInfo,
      firstName: "Sara",
    });
  });

  it("calls onChange when last name changes", () => {
    const onChange = vi.fn();

    render(<GuestInfoStep value={guestInfo} onChange={onChange} />);

    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Ali" },
    });

    expect(onChange).toHaveBeenCalledWith({
      ...guestInfo,
      lastName: "Ali",
    });
  });

  it("calls onChange when email changes", () => {
    const onChange = vi.fn();

    render(<GuestInfoStep value={guestInfo} onChange={onChange} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "new@example.com" },
    });

    expect(onChange).toHaveBeenCalledWith({
      ...guestInfo,
      email: "new@example.com",
    });
  });

  it("calls onChange when phone changes", () => {
    const onChange = vi.fn();

    render(<GuestInfoStep value={guestInfo} onChange={onChange} />);

    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "0566666666" },
    });

    expect(onChange).toHaveBeenCalledWith({
      ...guestInfo,
      phone: "0566666666",
    });
  });

  it("shows touched field errors", () => {
    render(
      <GuestInfoStep
        value={guestInfo}
        onChange={vi.fn()}
        errors={{ firstName: "First name is required" }}
        touched={{ firstName: true }}
      />
    );

    expect(screen.getByText("First name is required")).toBeInTheDocument();
  });

  it("does not show untouched field errors", () => {
    render(
      <GuestInfoStep
        value={guestInfo}
        onChange={vi.fn()}
        errors={{ firstName: "First name is required" }}
        touched={{ firstName: false }}
      />
    );

    expect(
      screen.queryByText("First name is required")
    ).not.toBeInTheDocument();
  });

  it("calls onBlur when a field loses focus", () => {
    const onBlur = vi.fn();

    render(
      <GuestInfoStep value={guestInfo} onChange={vi.fn()} onBlur={onBlur} />
    );

    fireEvent.blur(screen.getByLabelText(/first name/i));

    expect(onBlur).toHaveBeenCalled();
  });
});
