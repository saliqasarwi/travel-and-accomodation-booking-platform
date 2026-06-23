import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AdminHotelsPage from "../pages/AdminHotelsPage";
import {
  createHotel,
  deleteHotel,
  getHotels,
  updateHotel,
} from "../api/admin.api";

vi.mock("../api/admin.api", () => ({
  getHotels: vi.fn(),
  createHotel: vi.fn(),
  updateHotel: vi.fn(),
  deleteHotel: vi.fn(),
}));

vi.mock("@shared/utils/localize", () => ({
  localizeField: (value: unknown, language: string) => {
    if (typeof value === "string") return value;

    if (value && typeof value === "object") {
      const localized = value as Record<string, string | undefined>;
      return localized[language] ?? localized.en ?? localized.ar ?? "";
    }

    return "";
  },
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      language: "en",
    },
    t: (key: string) => {
      const translations: Record<string, string> = {
        "admin.hotels": "Hotels",
        "admin.hotelName": "Hotel Name",
        "admin.starRating": "Star Rating",
        "admin.availableRooms": "Available Rooms",
        "admin.location": "Location",
        "admin.created": "Created",
        "admin.modified": "Modified",
        "admin.actions": "Actions",
        "admin.createHotel": "Create Hotel",
        "admin.editHotel": "Edit Hotel",
        "admin.deleteHotel": "Delete Hotel",
        "admin.deleteHotelMessage":
          "Are you sure you want to delete this hotel?",
        "common.create": "Create",
        "common.delete": "Delete",
      };

      return translations[key] ?? key;
    },
  }),
}));

vi.mock("../components/AdminToolbar", () => ({
  default: ({
    title,
    searchValue,
    onSearchChange,
    onSearchSubmit,
    onClearSearch,
    onCreateClick,
  }: {
    title: string;
    searchValue: string;
    onSearchChange: (value: string) => void;
    onSearchSubmit?: () => void;
    onClearSearch?: () => void;
    onCreateClick: () => void;
  }) => (
    <div>
      <h1>{title}</h1>

      <input
        aria-label="admin-search"
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <button type="button" onClick={onSearchSubmit}>
        Search
      </button>

      <button type="button" onClick={onClearSearch}>
        Clear
      </button>

      <button type="button" onClick={onCreateClick}>
        Create
      </button>
    </div>
  ),
}));

vi.mock("../components/AdminEntityDrawer", () => ({
  default: ({
    open,
    title,
    entity,
    initialValues,
    onClose,
    onSubmit,
  }: {
    open: boolean;
    title: string;
    entity: string;
    initialValues: unknown;
    onClose: () => void;
    onSubmit: (values: {
      hotelName: string;
      location?: string;
      starRating?: number;
      availableRooms?: number;
    }) => Promise<void>;
  }) =>
    open ? (
      <div role="dialog" aria-label="entity-drawer">
        <h2>{title}</h2>

        <div data-testid="drawer-initial-values">
          {JSON.stringify(initialValues)}
        </div>

        <button
          type="button"
          onClick={() =>
            void onSubmit({
              hotelName: "Royal Hotel",
              location: "Ramallah",
              starRating: 5,
              availableRooms: 12,
            })
          }
        >
          Submit {entity}
        </button>

        <button type="button" onClick={onClose}>
          Close Drawer
        </button>
      </div>
    ) : null,
}));

vi.mock("@shared/components/ConfirmActionDialog", () => ({
  default: ({
    open,
    title,
    message,
    onClose,
    onConfirm,
  }: {
    open: boolean;
    title: string;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
  }) =>
    open ? (
      <div role="dialog" aria-label="confirm-delete">
        <h2>{title}</h2>
        <p>{message}</p>

        <button type="button" onClick={onConfirm}>
          Confirm Delete
        </button>

        <button type="button" onClick={onClose}>
          Cancel Delete
        </button>
      </div>
    ) : null,
}));

vi.mock("@mui/x-data-grid", () => ({
  DataGrid: ({
    rows,
    columns,
    onRowClick,
    getRowId,
  }: {
    rows: Array<Record<string, unknown>>;
    columns: Array<{
      field: string;
      headerName: string;
      renderCell?: (params: {
        row: Record<string, unknown>;
        value: unknown;
      }) => React.ReactNode;
    }>;
    onRowClick?: (params: { row: Record<string, unknown> }) => void;
    getRowId?: (row: Record<string, unknown>) => string | number;
  }) => (
    <table>
      <tbody>
        {rows.map((row) => {
          const id = getRowId ? getRowId(row) : (row.id as number);

          return (
            <tr
              key={id}
              data-testid={`row-${id}`}
              onClick={() => onRowClick?.({ row })}
            >
              {columns.map((column) => (
                <td
                  key={column.field}
                  data-testid={
                    column.field === "actions" ? `actions-${id}` : undefined
                  }
                >
                  {column.renderCell
                    ? column.renderCell({
                        row,
                        value: row[column.field],
                      })
                    : String(row[column.field] ?? "")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  ),
}));

describe("AdminHotelsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getHotels).mockResolvedValue([]);
    vi.mocked(createHotel).mockResolvedValue([]);
    vi.mocked(updateHotel).mockResolvedValue([]);
    vi.mocked(deleteHotel).mockResolvedValue([]);
  });

  it("fetches and displays hotels when page loads", async () => {
    vi.mocked(getHotels).mockResolvedValueOnce([
      {
        id: 1,
        hotelName: "Cinema Hotel",
        starRating: 5,
        availableRooms: 10,
        location: "Jenin",
        createdAt: "2026-01-01",
        modifiedAt: "2026-01-02",
      },
    ]);

    render(<AdminHotelsPage />);

    expect(await screen.findByText("Cinema Hotel")).toBeInTheDocument();
    expect(screen.getByText("Jenin")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();

    expect(getHotels).toHaveBeenCalledWith(undefined);
  });

  it("searches for hotels using hotel name", async () => {
    const user = userEvent.setup();

    render(<AdminHotelsPage />);

    await user.type(screen.getByLabelText("admin-search"), "Cinema");
    await user.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(getHotels).toHaveBeenLastCalledWith({
        hotelName: "Cinema",
      });
    });
  });

  it("clears the hotel search", async () => {
    const user = userEvent.setup();

    render(<AdminHotelsPage />);

    const input = screen.getByLabelText("admin-search");

    await user.type(input, "Royal");
    expect(input).toHaveValue("Royal");

    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(input).toHaveValue("");

    await waitFor(() => {
      expect(getHotels).toHaveBeenLastCalledWith(undefined);
    });
  });

  it("opens the create drawer and creates a hotel", async () => {
    const user = userEvent.setup();

    render(<AdminHotelsPage />);

    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(
      screen.getByRole("heading", { name: "Create Hotel" })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Submit hotels" }));

    await waitFor(() => {
      expect(createHotel).toHaveBeenCalledWith({
        hotelName: "Royal Hotel",
        location: "Ramallah",
        starRating: 5,
        availableRooms: 12,
      });
    });
  });

  it("opens the edit drawer and updates the selected hotel", async () => {
    const user = userEvent.setup();

    vi.mocked(getHotels).mockResolvedValue([
      {
        id: 8,
        hotelName: "Cinema Hotel",
        starRating: 4,
        availableRooms: 7,
        location: "Jenin",
      },
    ]);

    render(<AdminHotelsPage />);

    const row = await screen.findByTestId("row-8");
    await user.click(row);

    expect(
      screen.getByRole("heading", { name: "Edit Hotel" })
    ).toBeInTheDocument();

    expect(screen.getByTestId("drawer-initial-values")).toHaveTextContent(
      "Cinema Hotel"
    );

    await user.click(screen.getByRole("button", { name: "Submit hotels" }));

    await waitFor(() => {
      expect(updateHotel).toHaveBeenCalledWith(8, {
        hotelName: "Royal Hotel",
        location: "Ramallah",
        starRating: 5,
        availableRooms: 12,
      });
    });
  });

  it("opens the confirmation dialog and deletes a hotel", async () => {
    const user = userEvent.setup();

    vi.mocked(getHotels).mockResolvedValue([
      {
        id: 6,
        hotelName: "Cinema Hotel",
        location: "Jenin",
      },
    ]);

    render(<AdminHotelsPage />);

    const actionCell = await screen.findByTestId("actions-6");
    const deleteButton = within(actionCell).getByRole("button");

    await user.click(deleteButton);

    expect(
      screen.getByRole("heading", { name: "Delete Hotel" })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Confirm Delete" }));

    await waitFor(() => {
      expect(deleteHotel).toHaveBeenCalledWith(6);
    });
  });
});
