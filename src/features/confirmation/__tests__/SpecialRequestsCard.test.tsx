import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SpecialRequestsCard from "../components/SpecialRequestCard";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "confirmation.specialRequests": "Special Requests",
        "confirmation.noSpecialRequests": "No special requests",
      };

      return translations[key] ?? key;
    },
  }),
}));

describe("SpecialRequestsCard", () => {
  it("renders special request notes", () => {
    render(<SpecialRequestsCard notes={{ notes: "Near elevator" }} />);

    expect(
      screen.getByRole("heading", { name: /special requests/i })
    ).toBeInTheDocument();

    expect(screen.getByText("Near elevator")).toBeInTheDocument();
  });

  it("renders fallback when there are no special requests", () => {
    render(<SpecialRequestsCard notes={{ notes: "" }} />);

    expect(screen.getByText("No special requests")).toBeInTheDocument();
  });
});
