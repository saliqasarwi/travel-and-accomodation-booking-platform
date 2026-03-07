import { useCallback, useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminToolbar from "../components/AdminToolbar";
import AdminEntityDrawer from "../components/AdminEntityDrawer";
import { getRooms, deleteRoom, createRoom, updateRoom } from "../api/admin.api";
import type { RoomFormValues, RoomRow } from "../types/admin.types";
import Chip from "@mui/material/Chip";
import { useSearchParams } from "react-router-dom";
import ConfirmActionDialog from "@shared/components/ConfirmActionDialog";
const EMPTY_ROOM: RoomFormValues = {
  roomNumber: undefined,
  adultCapacity: undefined,
  childrenCapacity: undefined,
  availability: false,
};

export default function AdminRoomsPage() {
  const [rows, setRows] = useState<RoomRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("roomNumber") ?? "";

  // drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerInitialValues, setDrawerInitialValues] =
    useState<RoomFormValues>(EMPTY_ROOM);
  const [saving, setSaving] = useState(false);
  //dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      const roomNumber = searchParams.get("roomNumber") ?? undefined;
      const data = await getRooms(roomNumber ? { roomNumber } : undefined);
      setRows(data);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const openCreate = () => {
    setDrawerMode("create");
    setSelectedId(null);
    setDrawerInitialValues(EMPTY_ROOM);
    setDrawerOpen(true);
  };

  const openEdit = (row: RoomRow) => {
    setDrawerMode("edit");
    setSelectedId(row.roomId);
    setDrawerInitialValues({
      roomNumber: row.roomNumber,
      adultCapacity: row.adultCapacity,
      childrenCapacity: row.childrenCapacity,
      availability: row.availability,
    });
    setDrawerOpen(true);
  };

  const handleSubmit = async (values: RoomFormValues) => {
    try {
      setSaving(true);

      if (drawerMode === "create") {
        await createRoom(values);
      } else {
        if (selectedId == null) return;
        await updateRoom(selectedId, values);
      }

      setDrawerOpen(false);
      await fetchRooms();
    } finally {
      setSaving(false);
    }
  };
  const openDeleteDialog = (id: number) => {
    setSelectedDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedDeleteId == null) return;

    try {
      setDeleting(true);
      await deleteRoom(selectedDeleteId);
      setConfirmOpen(false);
      setSelectedDeleteId(null);
      await fetchRooms();
    } finally {
      setDeleting(false);
    }
  };
  const columns: GridColDef[] = [
    { field: "roomNumber", headerName: "Number", flex: 1, minWidth: 80 },
    {
      field: "availability",
      headerName: "Availablity",
      width: 160,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const isAvailable = Boolean(params.value);
        return (
          <Chip
            size="small"
            label={isAvailable ? "Available" : "Not available"}
            color={isAvailable ? "success" : "default"}
            variant={isAvailable ? "filled" : "outlined"}
          />
        );
      },
    },
    {
      field: "adultCapacity",
      headerName: "Adults",
      width: 120,
    },
    {
      field: "childrenCapacity",
      headerName: "Children",
      width: 120,
    },
    { field: "createdAt", headerName: "Created", flex: 1, minWidth: 170 },
    { field: "modifiedAt", headerName: "Modified", flex: 1, minWidth: 170 },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            openDeleteDialog(params.row.roomId);
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <AdminToolbar
          title="Rooms"
          searchValue={searchValue}
          onSearchChange={(value) => {
            setSearchParams((prev) => {
              const next = new URLSearchParams(prev);
              if (value) next.set("roomNumber", value);
              else next.delete("roomNumber");
              return next;
            });
          }}
          onSearchSubmit={() => {}}
          onCreateClick={openCreate}
        />

        <Box sx={{ height: 520, mt: 3, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            getRowId={(row) => row.roomId}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
            onRowClick={(params) => openEdit(params.row as RoomRow)}
          />
        </Box>

        <AdminEntityDrawer
          open={drawerOpen}
          mode={drawerMode}
          entity="rooms"
          title={drawerMode === "create" ? "Create Room" : "Edit Room"}
          initialValues={drawerInitialValues}
          onClose={() => setDrawerOpen(false)}
          onSubmit={handleSubmit}
          saving={saving}
        />
      </Box>
      <ConfirmActionDialog
        open={confirmOpen}
        title="Delete room"
        message="Are you sure you want to delete this room?"
        confirmText="Delete"
        confirmColor="error"
        loading={deleting}
        onClose={() => {
          if (!deleting) {
            setConfirmOpen(false);
            setSelectedDeleteId(null);
          }
        }}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
