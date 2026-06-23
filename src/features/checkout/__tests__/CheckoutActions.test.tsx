import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CheckoutActions from "../components/CheckoutActions";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "checkout.back": "Back",
        "checkout.next": "Next",
        "checkout.confirmBooking": "Confirm booking",
      };

      return translations[key] ?? key;
    },
  }),
}));

describe("CheckoutActions", () => {
  it("renders next button when not on last step", () => {
    render(
      <CheckoutActions
        isLastStep={false}
        isSubmitting={false}
        activeStep={1}
        onBack={vi.fn()}
        onNext={vi.fn()}
        onConfirm={vi.fn()}
      />
    );

    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  it("renders confirm button on last step", () => {
    render(
      <CheckoutActions
        isLastStep
        isSubmitting={false}
        activeStep={2}
        onBack={vi.fn()}
        onNext={vi.fn()}
        onConfirm={vi.fn()}
      />
    );

    expect(
      screen.getByRole("button", { name: "Confirm booking" })
    ).toBeInTheDocument();
  });

  it("disables back button on first step", () => {
    render(
      <CheckoutActions
        isLastStep={false}
        isSubmitting={false}
        activeStep={0}
        onBack={vi.fn()}
        onNext={vi.fn()}
        onConfirm={vi.fn()}
      />
    );

    expect(screen.getByRole("button", { name: "Back" })).toBeDisabled();
  });

  it("disables back button while submitting", () => {
    render(
      <CheckoutActions
        isLastStep={false}
        isSubmitting
        activeStep={1}
        onBack={vi.fn()}
        onNext={vi.fn()}
        onConfirm={vi.fn()}
      />
    );

    expect(screen.getByRole("button", { name: "Back" })).toBeDisabled();
  });

  it("calls onBack when back button is clicked", () => {
    const onBack = vi.fn();

    render(
      <CheckoutActions
        isLastStep={false}
        isSubmitting={false}
        activeStep={1}
        onBack={onBack}
        onNext={vi.fn()}
        onConfirm={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Back" }));

    expect(onBack).toHaveBeenCalled();
  });

  it("calls onNext when next button is clicked", () => {
    const onNext = vi.fn();

    render(
      <CheckoutActions
        isLastStep={false}
        isSubmitting={false}
        activeStep={1}
        onBack={vi.fn()}
        onNext={onNext}
        onConfirm={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(onNext).toHaveBeenCalled();
  });

  it("calls onConfirm when confirm button is clicked", () => {
    const onConfirm = vi.fn();

    render(
      <CheckoutActions
        isLastStep
        isSubmitting={false}
        activeStep={2}
        onBack={vi.fn()}
        onNext={vi.fn()}
        onConfirm={onConfirm}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Confirm booking" }));

    expect(onConfirm).toHaveBeenCalled();
  });
});
