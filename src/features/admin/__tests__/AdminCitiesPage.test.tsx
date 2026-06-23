import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AdminCitiesPage from "../pages/AdminCitiesPage";
import {
  createCity,
  deleteCity,
  getCities,
  updateCity,
} from "../api/admin.api";

vi.mock("../api/admin.api", () => ({
  getCities: vi.fn(),
  createCity: vi.fn(),
  updateCity: vi.fn(),
  deleteCity: vi.fn(),
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
        "admin.cities": "Cities",
        "admin.name": "Name",
        "admin.country": "Country",
        "admin.postOffice": "Post Office",
        "admin.numberOfHotels": "Number of Hotels",
        "admin.created": "Created",
        "admin.modified": "Modified",
        "admin.actions": "Actions",
        "admin.createCity": "Create City",
        "admin.editCity": "Edit City",
        "admin.deleteCity": "Delete City",
        "admin.deleteCityMessage": "Are you sure you want to delete this city?",
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
      name: string;
      country?: string;
      postOffice?: string;
      numberOfHotels?: number;
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
              name: "Jenin",
              country: "Palestine",
              postOffice: "00970",
              numberOfHotels: 5,
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
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.field}>{column.headerName}</th>
          ))}
        </tr>
      </thead>

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

describe("AdminCitiesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getCities).mockResolvedValue([]);
    vi.mocked(createCity).mockResolvedValue([]);
    vi.mocked(updateCity).mockResolvedValue([]);
    vi.mocked(deleteCity).mockResolvedValue([]);
  });

  it("fetches and displays cities when page loads", async () => {
    vi.mocked(getCities).mockResolvedValueOnce([
      {
        id: 1,
        name: "Jenin",
        country: "Palestine",
        postOffice: "00970",
        numberOfHotels: 4,
        createdAt: "2026-01-01",
        modifiedAt: "2026-01-02",
      },
    ]);

    render(<AdminCitiesPage />);

    expect(await screen.findByText("Jenin")).toBeInTheDocument();
    expect(screen.getByText("Palestine")).toBeInTheDocument();
    expect(screen.getByText("00970")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();

    expect(getCities).toHaveBeenCalledWith(undefined);
  });

  it("searches for cities using the entered name", async () => {
    const user = userEvent.setup();

    render(<AdminCitiesPage />);

    await waitFor(() => {
      expect(getCities).toHaveBeenCalledWith(undefined);
    });

    await user.type(screen.getByLabelText("admin-search"), "Jenin");
    await user.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(getCities).toHaveBeenLastCalledWith({
        name: "Jenin",
      });
    });
  });

  it("clears the city search", async () => {
    const user = userEvent.setup();

    render(<AdminCitiesPage />);

    const input = screen.getByLabelText("admin-search");

    await user.type(input, "Jenin");
    expect(input).toHaveValue("Jenin");

    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(input).toHaveValue("");

    await waitFor(() => {
      expect(getCities).toHaveBeenLastCalledWith(undefined);
    });
  });

  it("opens the create drawer and creates a city", async () => {
    const user = userEvent.setup();

    render(<AdminCitiesPage />);

    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(
      screen.getByRole("heading", { name: "Create City" })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Submit cities" }));

    await waitFor(() => {
      expect(createCity).toHaveBeenCalledWith({
        name: "Jenin",
        country: "Palestine",
        postOffice: "00970",
        numberOfHotels: 5,
      });
    });

    await waitFor(() => {
      expect(
        screen.queryByRole("heading", { name: "Create City" })
      ).not.toBeInTheDocument();
    });
  });

  it("opens the edit drawer and updates the selected city", async () => {
    const user = userEvent.setup();

    vi.mocked(getCities).mockResolvedValue([
      {
        id: 7,
        name: "Jenin",
        country: "Palestine",
        postOffice: "00970",
        numberOfHotels: 4,
      },
    ]);

    render(<AdminCitiesPage />);

    const row = await screen.findByTestId("row-7");
    await user.click(row);

    expect(
      screen.getByRole("heading", { name: "Edit City" })
    ).toBeInTheDocument();

    expect(screen.getByTestId("drawer-initial-values")).toHaveTextContent(
      "Jenin"
    );

    await user.click(screen.getByRole("button", { name: "Submit cities" }));

    await waitFor(() => {
      expect(updateCity).toHaveBeenCalledWith(7, {
        name: "Jenin",
        country: "Palestine",
        postOffice: "00970",
        numberOfHotels: 5,
      });
    });
  });

  it("opens the confirmation dialog and deletes a city", async () => {
    const user = userEvent.setup();

    vi.mocked(getCities).mockResolvedValue([
      {
        id: 3,
        name: "Jenin",
        country: "Palestine",
      },
    ]);

    render(<AdminCitiesPage />);

    const actionCell = await screen.findByTestId("actions-3");
    const deleteButton = within(actionCell).getByRole("button");

    await user.click(deleteButton);

    expect(
      screen.getByRole("heading", { name: "Delete City" })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Confirm Delete" }));

    await waitFor(() => {
      expect(deleteCity).toHaveBeenCalledWith(3);
    });
  });
});
