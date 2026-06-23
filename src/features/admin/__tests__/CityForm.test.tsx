import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import CityForm from "../components/forms/CityForm";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "admin.name": "Name",
        "admin.country": "Country",
        "admin.postOffice": "Post Office",
        "admin.numberOfHotels": "Number of Hotels",
        "validation.nameRequired": "Name is required",
        "validation.mustBeZeroOrMore": "Must be zero or more",
      };

      return translations[key] ?? key;
    },
  }),
}));

describe("CityForm", () => {
  it("renders city form fields", () => {
    render(
      <CityForm
        initialValues={{
          name: "Jenin",
          country: "Palestine",
          postOffice: "00970",
          numberOfHotels: 4,
        }}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/name/i)).toHaveValue("Jenin");
    expect(screen.getByLabelText(/country/i)).toHaveValue("Palestine");
    expect(screen.getByLabelText(/post office/i)).toHaveValue("00970");
    expect(screen.getByLabelText(/number of hotels/i)).toHaveValue(4);
  });

  it("updates city form values", async () => {
    const user = userEvent.setup();

    render(
      <CityForm
        initialValues={{
          name: "",
          country: "",
          postOffice: "",
          numberOfHotels: undefined,
        }}
        onSubmit={vi.fn()}
      />
    );

    await user.type(screen.getByLabelText(/name/i), "Jenin");
    await user.type(screen.getByLabelText(/country/i), "Palestine");
    await user.type(screen.getByLabelText(/post office/i), "00970");
    await user.type(screen.getByLabelText(/number of hotels/i), "3");

    expect(screen.getByLabelText(/name/i)).toHaveValue("Jenin");
    expect(screen.getByLabelText(/country/i)).toHaveValue("Palestine");
    expect(screen.getByLabelText(/post office/i)).toHaveValue("00970");
    expect(screen.getByLabelText(/number of hotels/i)).toHaveValue(3);
  });
  it("shows validation error when name is missing", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <CityForm
        initialValues={{
          name: "",
          country: "",
          postOffice: "",
          numberOfHotels: undefined,
        }}
        onSubmit={onSubmit}
      />
    );

    await user.click(screen.getByLabelText(/name/i));
    await user.tab();
    await user.keyboard("{enter}");

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
