import { useCallback, useEffect, useState } from "react";
import { Box, IconButton, Rating } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

import AdminToolbar from "../components/AdminToolbar";
import AdminEntityDrawer from "../components/AdminEntityDrawer";

import {
  getHotels,
  deleteHotel,
  createHotel,
  updateHotel,
} from "../api/admin.api";
import type { HotelFormValues, HotelRow } from "../types/admin.types";
import { useSearchParams } from "react-router-dom";
import ConfirmActionDialog from "@shared/components/ConfirmActionDialog";
const EMPTY_HOTEL: HotelFormValues = {
  hotelName: "",
  location: "",
  starRating: undefined,
  availableRooms: undefined,
};

export default function AdminHotelsPage() {
  const [rows, setRows] = useState<HotelRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("hotelName") ?? "";
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerInitialValues, setDrawerInitialValues] =
    useState<HotelFormValues>(EMPTY_HOTEL);
  const [saving, setSaving] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchHotels = useCallback(async () => {
    try {
      setLoading(true);
      const hotelName = searchParams.get("hotelName") ?? undefined;
      const data = await getHotels(hotelName ? { hotelName } : undefined);
      setRows(data);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);
  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const openCreate = () => {
    setDrawerMode("create");
    setSelectedId(null);
    setDrawerInitialValues(EMPTY_HOTEL);
    setDrawerOpen(true);
  };

  const openEdit = (row: HotelRow) => {
    setDrawerMode("edit");
    setSelectedId(row.id);
    setDrawerInitialValues({
      hotelName: row.hotelName ?? "",
      location: row.location ?? "",
      starRating: row.starRating,
      availableRooms: row.availableRooms,
    });
    setDrawerOpen(true);
  };

  const handleSubmit = async (values: HotelFormValues) => {
    try {
      setSaving(true);

      if (drawerMode === "create") {
        await createHotel(values);
      } else {
        if (selectedId == null) return;
        await updateHotel(selectedId, values);
      }

      setDrawerOpen(false);
      await fetchHotels();
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
      await deleteHotel(selectedDeleteId);
      setConfirmOpen(false);
      setSelectedDeleteId(null);
      await fetchHotels();
    } finally {
      setDeleting(false);
    }
  };
  const columns: GridColDef[] = [
    { field: "hotelName", headerName: "Name", flex: 1, minWidth: 180 },
    {
      field: "starRating",
      headerName: "Star Rate",
      width: 160,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Rating
          value={params.value || 0}
          readOnly
          precision={0.5}
          size="small"
        />
      ),
    },
    { field: "availableRooms", headerName: "#Rooms", width: 110 },
    { field: "location", headerName: "Location", flex: 1, minWidth: 140 },
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
            openDeleteDialog(params.row.id);
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
          title="Hotels"
          searchValue={searchValue}
          onSearchChange={(value) => {
            setSearchParams((prev) => {
              const next = new URLSearchParams(prev);
              if (value) next.set("hotelName", value);
              else next.delete("hotelName");
              return next;
            });
          }}
          onSearchSubmit={() => {}}
          onCreateClick={openCreate}
        />

        <Box sx={{ mt: 3, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
            onRowClick={(params) => openEdit(params.row as HotelRow)}
          />
        </Box>

        <AdminEntityDrawer
          open={drawerOpen}
          mode={drawerMode}
          entity="hotels"
          title={drawerMode === "create" ? "Create Hotel" : "Edit Hotel"}
          initialValues={drawerInitialValues}
          onClose={() => setDrawerOpen(false)}
          onSubmit={handleSubmit}
          saving={saving}
        />
      </Box>
      <ConfirmActionDialog
        open={confirmOpen}
        title="Delete hotel"
        message="Are you sure you want to delete this hotel?"
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
