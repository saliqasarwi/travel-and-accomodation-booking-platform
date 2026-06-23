import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import RoomForm from "../components/forms/RoomForm";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "admin.roomNumber": "Room Number",
        "admin.adults": "Adults",
        "admin.children": "Children",
        "admin.available": "Available",
        "validation.roomNumberMin": "Room number must be at least 1",
        "validation.roomNumberRequired": "Room number is required",
        "validation.mustBeZeroOrMore": "Must be zero or more",
      };

      return translations[key] ?? key;
    },
  }),
}));

describe("RoomForm", () => {
  it("renders room form fields", () => {
    render(
      <RoomForm
        initialValues={{
          roomNumber: 101,
          adultCapacity: 2,
          childrenCapacity: 1,
          availability: true,
        }}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/room number/i)).toHaveValue(101);
    expect(screen.getByLabelText(/adults/i)).toHaveValue(2);
    expect(screen.getByLabelText(/children/i)).toHaveValue(1);
    expect(screen.getByRole("checkbox", { name: /available/i })).toBeChecked();
  });

  it("updates availability checkbox", async () => {
    const user = userEvent.setup();

    render(
      <RoomForm
        initialValues={{
          roomNumber: 101,
          adultCapacity: 2,
          childrenCapacity: 1,
          availability: false,
        }}
        onSubmit={vi.fn()}
      />
    );

    const checkbox = screen.getByRole("checkbox", { name: /available/i });

    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
