import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import GuestInfoCard from "../components/GuestInfoCard";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "confirmation.guestInformation": "Guest Information",
        "confirmation.name": "Name",
        "confirmation.email": "Email",
        "confirmation.phone": "Phone",
      };

      return translations[key] ?? key;
    },
  }),
}));

describe("GuestInfoCard", () => {
  it("renders guest information", () => {
    render(
      <GuestInfoCard
        guest={{
          firstName: "Sali",
          lastName: "Qasarwi",
          email: "sali@test.com",
          phone: "0599999999",
        }}
      />
    );

    expect(
      screen.getByRole("heading", { name: /guest information/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/sali qasarwi/i)).toBeInTheDocument();
    expect(screen.getByText(/sali@test.com/i)).toBeInTheDocument();
    expect(screen.getByText(/0599999999/i)).toBeInTheDocument();
  });

  it("does not crash when guest is missing", () => {
    render(<GuestInfoCard />);

    expect(
      screen.getByRole("heading", { name: /guest information/i })
    ).toBeInTheDocument();
  });
});
