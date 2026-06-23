import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CheckoutHeader from "../components/CheckoutHeader";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "checkout.title": "Checkout",
        "checkout.subtitle": "Complete your booking details",
      };

      return translations[key] ?? key;
    },
  }),
}));

describe("CheckoutHeader", () => {
  it("renders checkout title and subtitle", () => {
    render(<CheckoutHeader />);

    expect(screen.getByText("Checkout")).toBeInTheDocument();
    expect(
      screen.getByText("Complete your booking details")
    ).toBeInTheDocument();
  });
});
