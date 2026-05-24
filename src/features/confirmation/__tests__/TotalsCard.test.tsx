import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TotalsCard from "../components/TotalsCard";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "confirmation.totals": "Totals",
        "confirmation.subtotal": "Subtotal",
        "confirmation.discounts": "Discounts",
        "confirmation.total": "Total",
      };

      return translations[key] ?? key;
    },
  }),
}));

vi.mock("@shared/utils/formatters", () => ({
  money: (value: number) => `$${value}`,
}));

describe("TotalsCard", () => {
  it("renders subtotal, discounts, and total", () => {
    render(<TotalsCard subtotal={360} discounts={40} total={320} />);

    expect(
      screen.getByRole("heading", { name: /totals/i })
    ).toBeInTheDocument();

    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("$360")).toBeInTheDocument();

    expect(screen.getByText("Discounts")).toBeInTheDocument();
    expect(screen.getByText("-$40")).toBeInTheDocument();

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("$320")).toBeInTheDocument();
  });
});
