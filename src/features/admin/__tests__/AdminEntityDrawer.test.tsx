import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AdminEntityDrawer from "../components/AdminEntityDrawer";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "common.cancel": "Cancel",
        "common.save": "Save",

        "admin.name": "Name",
        "admin.country": "Country",
        "admin.postOffice": "Post Office",
        "admin.numberOfHotels": "Number of Hotels",

        "admin.hotelName": "Hotel Name",
        "admin.location": "Location",
        "admin.starRating": "Star Rating",
        "admin.availableRooms": "Available Rooms",

        "admin.roomNumber": "Room Number",
        "admin.adults": "Adults",
        "admin.children": "Children",
        "admin.available": "Available",

        "validation.nameRequired": "Name is required",
        "validation.hotelNameRequired": "Hotel name is required",
        "validation.roomNumberRequired": "Room number is required",
        "validation.roomNumberMin": "Room number must be at least 1",
        "validation.mustBeZeroOrMore": "Must be zero or more",
        "validation.minOne": "Minimum is 1",
        "validation.maxFive": "Maximum is 5",
      };

      return translations[key] ?? key;
    },
  }),
}));

describe("AdminEntityDrawer", () => {
  it("renders city form inside drawer", () => {
    render(
      <AdminEntityDrawer
        open
        mode="create"
        entity="cities"
        title="Create City"
        initialValues={{
          name: "",
          country: "",
          postOffice: "",
          numberOfHotels: undefined,
        }}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByText("Create City")).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("calls onClose when cancel is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <AdminEntityDrawer
        open
        mode="create"
        entity="cities"
        title="Create City"
        initialValues={{
          name: "",
          country: "",
          postOffice: "",
          numberOfHotels: undefined,
        }}
        onClose={onClose}
        onSubmit={vi.fn()}
      />
    );

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onClose).toHaveBeenCalled();
  });

  it("submits city form when save is clicked", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <AdminEntityDrawer
        open
        mode="create"
        entity="cities"
        title="Create City"
        initialValues={{
          name: "",
          country: "",
          postOffice: "",
          numberOfHotels: undefined,
        }}
        onClose={vi.fn()}
        onSubmit={onSubmit}
      />
    );

    await user.type(screen.getByLabelText(/name/i), "Jenin");
    await user.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Jenin",
        }),
        expect.anything()
      );
    });
  });

  it("does not submit invalid city form", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <AdminEntityDrawer
        open
        mode="create"
        entity="cities"
        title="Create City"
        initialValues={{
          name: "",
          country: "",
          postOffice: "",
          numberOfHotels: undefined,
        }}
        onClose={vi.fn()}
        onSubmit={onSubmit}
      />
    );

    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("renders hotel form inside drawer", () => {
    render(
      <AdminEntityDrawer
        open
        mode="create"
        entity="hotels"
        title="Create Hotel"
        initialValues={{
          hotelName: "",
          location: "",
          starRating: undefined,
          availableRooms: undefined,
        }}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByText("Create Hotel")).toBeInTheDocument();
    expect(screen.getByLabelText(/hotel name/i)).toBeInTheDocument();
  });

  it("renders room form inside drawer", () => {
    render(
      <AdminEntityDrawer
        open
        mode="create"
        entity="rooms"
        title="Create Room"
        initialValues={{
          roomNumber: undefined,
          adultCapacity: undefined,
          childrenCapacity: undefined,
          availability: false,
        }}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByText("Create Room")).toBeInTheDocument();
    expect(screen.getByLabelText(/room number/i)).toBeInTheDocument();
  });
});
