import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HotelForm from "../components/forms/HotelForm";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "admin.hotelName": "Hotel Name",
        "admin.location": "Location",
        "admin.starRating": "Star Rating",
        "admin.availableRooms": "Available Rooms",
        "validation.hotelNameRequired": "Hotel name is required",
        "validation.minOne": "Minimum is 1",
        "validation.maxFive": "Maximum is 5",
        "validation.mustBeZeroOrMore": "Must be zero or more",
      };

      return translations[key] ?? key;
    },
  }),
}));

describe("HotelForm", () => {
  it("renders hotel form fields", () => {
    render(
      <HotelForm
        initialValues={{
          hotelName: "Cinema Hotel",
          location: "Jenin",
          starRating: 5,
          availableRooms: 10,
        }}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/hotel name/i)).toHaveValue("Cinema Hotel");
    expect(screen.getByLabelText(/location/i)).toHaveValue("Jenin");
    expect(screen.getByLabelText(/star rating/i)).toHaveValue(5);
    expect(screen.getByLabelText(/available rooms/i)).toHaveValue(10);
  });
});
