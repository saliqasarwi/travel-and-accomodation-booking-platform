import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SearchFilters from "../components/SearchFilters";

const mockSetSearchParams = vi.fn();

let mockSearchParams = new URLSearchParams();

let mockAmenitiesState = {
  amenities: [
    { id: 1, name: "WiFi", description: "Fast WiFi" },
    { id: 2, name: "Pool", description: "Swimming pool" },
  ],
  loading: false,
  error: null as string | null,
};

let mockRoomTypesState = {
  roomTypes: ["Deluxe", "Standard"],
  loading: false,
  error: null as string | null,
};

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );

  return {
    ...actual,
    useSearchParams: () => [mockSearchParams, mockSetSearchParams],
  };
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "search.filters": "Filters",
        "search.clearAll": "Clear all",
        "search.budgetPerNight": "Budget per night",
        "search.min": "Min",
        "search.max": "Max",
        "search.starRating": "Star rating",
        "search.roomType": "Room type",
        "search.loadingRoomTypes": "Loading room types",
        "search.all": "All",
        "search.amenities": "Amenities",
        "search.loadingAmenities": "Loading amenities",
      };

      return translations[key] ?? key;
    },
    i18n: {
      language: "en",
    },
  }),
}));

vi.mock("../hooks/useAmenities", () => ({
  useAmenities: () => mockAmenitiesState,
}));

vi.mock("../hooks/useRoomTypes", () => ({
  useRoomTypes: () => mockRoomTypesState,
}));

vi.mock("@shared/utils/localize", () => ({
  localizeField: (
    value: string | Record<string, string> | undefined,
    language: string
  ) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value[language] ?? value.en ?? Object.values(value)[0] ?? "";
  },
}));

function renderWithRouter(initialSearch = "") {
  mockSearchParams = new URLSearchParams(initialSearch);

  return render(
    <MemoryRouter initialEntries={[`/search?${initialSearch}`]}>
      <SearchFilters />
    </MemoryRouter>
  );
}

describe("SearchFilters", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockSearchParams = new URLSearchParams();

    mockAmenitiesState = {
      amenities: [
        { id: 1, name: "WiFi", description: "Fast WiFi" },
        { id: 2, name: "Pool", description: "Swimming pool" },
      ],
      loading: false,
      error: null,
    };

    mockRoomTypesState = {
      roomTypes: ["Deluxe", "Standard"],
      loading: false,
      error: null,
    };
  });

  it("renders main filter sections", () => {
    renderWithRouter();

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Budget per night")).toBeInTheDocument();
    expect(screen.getByText("Star rating")).toBeInTheDocument();
    expect(screen.getAllByText("Room type").length).toBeGreaterThan(0);
    expect(screen.getByText("Amenities")).toBeInTheDocument();
  });
  it("renders amenities and room types", () => {
    renderWithRouter();

    expect(screen.getByText("WiFi")).toBeInTheDocument();
    expect(screen.getByText("Pool")).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByRole("combobox"));

    expect(screen.getByRole("option", { name: "Deluxe" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Standard" })
    ).toBeInTheDocument();
  });

  it("disables clear all button when there are no active filters", () => {
    renderWithRouter();

    expect(screen.getByRole("button", { name: "Clear all" })).toBeDisabled();
  });

  it("enables clear all button when filters are active", () => {
    renderWithRouter("minPrice=100&stars=5&amenities=1&roomType=Deluxe");

    expect(screen.getByRole("button", { name: "Clear all" })).toBeEnabled();
  });

  it("clears active filters when clear all is clicked", () => {
    renderWithRouter(
      "minPrice=100&maxPrice=500&stars=5&amenities=1&roomType=Deluxe"
    );

    fireEvent.click(screen.getByRole("button", { name: "Clear all" }));

    expect(mockSetSearchParams).toHaveBeenCalled();

    const next = new URLSearchParams(
      mockSetSearchParams.mock.calls[0][0] as URLSearchParams
    );

    expect(next.has("minPrice")).toBe(false);
    expect(next.has("maxPrice")).toBe(false);
    expect(next.has("stars")).toBe(false);
    expect(next.has("amenities")).toBe(false);
    expect(next.has("roomType")).toBe(false);
  });

  it("updates min price input", () => {
    renderWithRouter();

    const inputs = screen.getAllByRole("spinbutton");
    const minInput = inputs[0];

    fireEvent.change(minInput, { target: { value: "150" } });

    expect(mockSetSearchParams).toHaveBeenCalled();

    const next = new URLSearchParams(
      mockSetSearchParams.mock.calls[0][0] as URLSearchParams
    );

    expect(next.get("minPrice")).toBe("150");
  });

  it("updates max price input", () => {
    renderWithRouter();

    const inputs = screen.getAllByRole("spinbutton");
    const maxInput = inputs[1];

    fireEvent.change(maxInput, { target: { value: "700" } });

    expect(mockSetSearchParams).toHaveBeenCalled();

    const next = new URLSearchParams(
      mockSetSearchParams.mock.calls[0][0] as URLSearchParams
    );

    expect(next.get("maxPrice")).toBe("700");
  });

  it("removes min price when min input is cleared", () => {
    renderWithRouter("minPrice=150");

    const inputs = screen.getAllByRole("spinbutton");
    const minInput = inputs[0];

    fireEvent.change(minInput, { target: { value: "" } });

    expect(mockSetSearchParams).toHaveBeenCalled();

    const next = new URLSearchParams(
      mockSetSearchParams.mock.calls[0][0] as URLSearchParams
    );

    expect(next.has("minPrice")).toBe(false);
  });

  it("removes max price when max input is cleared", () => {
    renderWithRouter("maxPrice=700");

    const inputs = screen.getAllByRole("spinbutton");
    const maxInput = inputs[1];

    fireEvent.change(maxInput, { target: { value: "" } });

    expect(mockSetSearchParams).toHaveBeenCalled();

    const next = new URLSearchParams(
      mockSetSearchParams.mock.calls[0][0] as URLSearchParams
    );

    expect(next.has("maxPrice")).toBe(false);
  });

  it("toggles star filter", () => {
    renderWithRouter();

    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[0]);

    expect(mockSetSearchParams).toHaveBeenCalled();

    const next = new URLSearchParams(
      mockSetSearchParams.mock.calls[0][0] as URLSearchParams
    );

    expect(next.get("stars")).toBe("5");
  });

  it("untoggles selected star filter", () => {
    renderWithRouter("stars=5");

    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[0]);

    expect(mockSetSearchParams).toHaveBeenCalled();

    const next = new URLSearchParams(
      mockSetSearchParams.mock.calls[0][0] as URLSearchParams
    );

    expect(next.has("stars")).toBe(false);
  });

  it("toggles amenity filter", () => {
    renderWithRouter();

    const wifiCheckbox = screen.getByRole("checkbox", { name: "WiFi" });

    fireEvent.click(wifiCheckbox);

    expect(mockSetSearchParams).toHaveBeenCalled();

    const next = new URLSearchParams(
      mockSetSearchParams.mock.calls[0][0] as URLSearchParams
    );

    expect(next.get("amenities")).toBe("1");
  });

  it("untoggles selected amenity filter", () => {
    renderWithRouter("amenities=1");

    const wifiCheckbox = screen.getByRole("checkbox", { name: "WiFi" });

    fireEvent.click(wifiCheckbox);

    expect(mockSetSearchParams).toHaveBeenCalled();

    const next = new URLSearchParams(
      mockSetSearchParams.mock.calls[0][0] as URLSearchParams
    );

    expect(next.has("amenities")).toBe(false);
  });

  it("shows amenities loading state", () => {
    mockAmenitiesState = {
      amenities: [],
      loading: true,
      error: null,
    };

    renderWithRouter();

    expect(screen.getByText("Loading amenities")).toBeInTheDocument();
  });

  it("shows amenities error state", () => {
    mockAmenitiesState = {
      amenities: [],
      loading: false,
      error: "Failed to load amenities",
    };

    renderWithRouter();

    expect(screen.getByText("Failed to load amenities")).toBeInTheDocument();
  });

  it("shows room types loading state", () => {
    mockRoomTypesState = {
      roomTypes: [],
      loading: true,
      error: null,
    };

    renderWithRouter();

    expect(screen.getByText("Loading room types")).toBeInTheDocument();
  });

  it("shows room types error state", () => {
    mockRoomTypesState = {
      roomTypes: [],
      loading: false,
      error: "Failed to load room types",
    };

    renderWithRouter();

    expect(screen.getByText("Failed to load room types")).toBeInTheDocument();
  });
});
