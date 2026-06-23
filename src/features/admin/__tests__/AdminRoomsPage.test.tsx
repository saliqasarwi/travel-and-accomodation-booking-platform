import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AdminRoomsPage from "../pages/AdminRoomsPage";
import { createRoom, deleteRoom, getRooms, updateRoom } from "../api/admin.api";

vi.mock("../api/admin.api", () => ({
  getRooms: vi.fn(),
  createRoom: vi.fn(),
  updateRoom: vi.fn(),
  deleteRoom: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "admin.rooms": "Rooms",
        "admin.roomNumber": "Room Number",
        "admin.availability": "Availability",
        "admin.available": "Available",
        "admin.notAvailable": "Not Available",
        "admin.adults": "Adults",
        "admin.children": "Children",
        "admin.created": "Created",
        "admin.modified": "Modified",
        "admin.actions": "Actions",
        "admin.createRoom": "Create Room",
        "admin.editRoom": "Edit Room",
        "admin.deleteRoom": "Delete Room",
        "admin.deleteRoomMessage": "Are you sure you want to delete this room?",
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
      roomNumber?: number;
      adultCapacity?: number;
      childrenCapacity?: number;
      availability?: boolean;
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
              roomNumber: 202,
              adultCapacity: 2,
              childrenCapacity: 1,
              availability: true,
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
          const id = getRowId
            ? getRowId(row)
            : ((row.id ?? row.roomId) as number);

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

describe("AdminRoomsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getRooms).mockResolvedValue([]);
    vi.mocked(createRoom).mockResolvedValue([]);
    vi.mocked(updateRoom).mockResolvedValue([]);
    vi.mocked(deleteRoom).mockResolvedValue([]);
  });

  it("fetches and displays rooms when page loads", async () => {
    vi.mocked(getRooms).mockResolvedValueOnce([
      {
        roomId: 1,
        roomNumber: 101,
        availability: true,
        adultCapacity: 2,
        childrenCapacity: 1,
        createdAt: "2026-01-01",
        modifiedAt: "2026-01-02",
      },
    ]);

    render(<AdminRoomsPage />);

    expect(await screen.findByText("101")).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();

    expect(getRooms).toHaveBeenCalledWith(undefined);
  });

  it("displays Not Available when room availability is false", async () => {
    vi.mocked(getRooms).mockResolvedValueOnce([
      {
        roomId: 2,
        roomNumber: 102,
        availability: false,
        adultCapacity: 2,
        childrenCapacity: 0,
      },
    ]);

    render(<AdminRoomsPage />);

    expect(await screen.findByText("102")).toBeInTheDocument();
    expect(screen.getByText("Not Available")).toBeInTheDocument();
  });

  it("searches for rooms using room number", async () => {
    const user = userEvent.setup();

    render(<AdminRoomsPage />);

    await user.type(screen.getByLabelText("admin-search"), "101");
    await user.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(getRooms).toHaveBeenLastCalledWith({
        roomNumber: "101",
      });
    });
  });

  it("clears the room search", async () => {
    const user = userEvent.setup();

    render(<AdminRoomsPage />);

    const input = screen.getByLabelText("admin-search");

    await user.type(input, "101");
    expect(input).toHaveValue("101");

    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(input).toHaveValue("");

    await waitFor(() => {
      expect(getRooms).toHaveBeenLastCalledWith(undefined);
    });
  });

  it("opens the create drawer and creates a room", async () => {
    const user = userEvent.setup();

    render(<AdminRoomsPage />);

    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(
      screen.getByRole("heading", { name: "Create Room" })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Submit rooms" }));

    await waitFor(() => {
      expect(createRoom).toHaveBeenCalledWith({
        roomNumber: 202,
        adultCapacity: 2,
        childrenCapacity: 1,
        availability: true,
      });
    });
  });

  it("opens the edit drawer and updates the selected room", async () => {
    const user = userEvent.setup();

    vi.mocked(getRooms).mockResolvedValue([
      {
        roomId: 9,
        roomNumber: 201,
        adultCapacity: 3,
        childrenCapacity: 2,
        availability: false,
      },
    ]);

    render(<AdminRoomsPage />);

    const row = await screen.findByTestId("row-9");
    await user.click(row);

    expect(
      screen.getByRole("heading", { name: "Edit Room" })
    ).toBeInTheDocument();

    expect(screen.getByTestId("drawer-initial-values")).toHaveTextContent(
      '"roomNumber":201'
    );

    await user.click(screen.getByRole("button", { name: "Submit rooms" }));

    await waitFor(() => {
      expect(updateRoom).toHaveBeenCalledWith(9, {
        roomNumber: 202,
        adultCapacity: 2,
        childrenCapacity: 1,
        availability: true,
      });
    });
  });

  it("opens the confirmation dialog and deletes a room", async () => {
    const user = userEvent.setup();

    vi.mocked(getRooms).mockResolvedValue([
      {
        roomId: 4,
        roomNumber: 104,
        availability: true,
      },
    ]);

    render(<AdminRoomsPage />);

    const actionCell = await screen.findByTestId("actions-4");
    const deleteButton = within(actionCell).getByRole("button");

    await user.click(deleteButton);

    expect(
      screen.getByRole("heading", { name: "Delete Room" })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Confirm Delete" }));

    await waitFor(() => {
      expect(deleteRoom).toHaveBeenCalledWith(4);
    });
  });
});
