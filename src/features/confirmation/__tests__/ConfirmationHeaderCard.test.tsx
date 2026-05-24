import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ConfirmationHeaderCard from "../components/ConfirmationHeaderCard";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "confirmation.bookingConfirmed": "Booking Confirmed",
        "confirmation.keepForRecords": "Keep this for your records",
        "confirmation.confirmationNumber": "Confirmation Number",
        "confirmation.created": "Created",
      };

      return translations[key] ?? key;
    },
  }),
}));

vi.mock("@shared/utils/formatters", () => ({
  formatDate: () => "June 1, 2026",
}));

describe("ConfirmationHeaderCard", () => {
  it("renders confirmation header information", () => {
    render(
      <ConfirmationHeaderCard
        confirmationNumber="CONF-123"
        status="Confirmed"
        createdAt="2026-06-01T10:00:00Z"
      />
    );

    expect(
      screen.getByRole("heading", { name: /booking confirmed/i })
    ).toBeInTheDocument();

    expect(screen.getByText("Keep this for your records")).toBeInTheDocument();
    expect(screen.getByText("CONF-123")).toBeInTheDocument();
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
    expect(screen.getByText("June 1, 2026")).toBeInTheDocument();
  });
});
