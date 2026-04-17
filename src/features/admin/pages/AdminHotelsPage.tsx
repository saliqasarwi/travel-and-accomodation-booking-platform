import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, IconButton, Rating } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useTranslation } from "react-i18next";

import AdminToolbar from "../components/AdminToolbar";
import AdminEntityDrawer from "../components/AdminEntityDrawer";

import {
  getHotels,
  deleteHotel,
  createHotel,
  updateHotel,
} from "../api/admin.api";
import type { HotelFormValues, HotelRow } from "../types/admin.types";
import ConfirmActionDialog from "@shared/components/ConfirmActionDialog";
import { localizeField } from "@features/checkout/utils/localize";

const EMPTY_HOTEL: HotelFormValues = {
  hotelName: "",
  location: "",
  starRating: undefined,
  availableRooms: undefined,
};

export default function AdminHotelsPage() {
  const { t, i18n } = useTranslation();

  const [rows, setRows] = useState<HotelRow[]>([]);
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

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
      const data = await getHotels(
        searchValue ? { hotelName: searchValue } : undefined
      );
      setRows(data);
    } finally {
      setLoading(false);
    }
  }, [searchValue]);

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
      hotelName: localizeField(row.hotelName, i18n.language),
      location: localizeField(row.location, i18n.language),
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

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "hotelName",
        headerName: t("admin.hotelName"),
        flex: 1,
        minWidth: 180,
        renderCell: (params) =>
          localizeField(params.row.hotelName, i18n.language),
      },
      {
        field: "starRating",
        headerName: t("admin.starRating"),
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
      {
        field: "availableRooms",
        headerName: t("admin.availableRooms"),
        width: 140,
      },
      {
        field: "location",
        headerName: t("admin.location"),
        flex: 1,
        minWidth: 140,
        renderCell: (params) =>
          localizeField(params.row.location, i18n.language),
      },
      {
        field: "createdAt",
        headerName: t("admin.created"),
        flex: 1,
        minWidth: 170,
      },
      {
        field: "modifiedAt",
        headerName: t("admin.modified"),
        flex: 1,
        minWidth: 170,
      },
      {
        field: "actions",
        headerName: t("admin.actions"),
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
            <DeleteRoundedIcon />
          </IconButton>
        ),
      },
    ],
    [t, i18n.language]
  );

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <AdminToolbar
          title={t("admin.hotels")}
          searchValue={inputValue}
          onSearchChange={setInputValue}
          onSearchSubmit={() => setSearchValue(inputValue.trim())}
          onClearSearch={() => {
            setInputValue("");
            setSearchValue("");
          }}
          onCreateClick={openCreate}
          createLabel={t("common.create")}
        />

        <Box
          sx={{
            mt: 3,
            p: { xs: 1.5, md: 2 },
            borderRadius: 3,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
          }}
        >
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            loading={loading}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
            onRowClick={(params) => openEdit(params.row as HotelRow)}
            sx={{
              border: "none",
              bgcolor: "transparent",
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "transparent",
                borderBottom: "1px solid",
                borderColor: "divider",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: 800,
                color: "text.primary",
              },
              "& .MuiDataGrid-row": {
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              },
              "& .MuiDataGrid-row:hover": {
                bgcolor: "rgba(21,101,192,0.04)",
              },
              "& .MuiDataGrid-cell": {
                borderColor: "rgba(224,224,224,0.45)",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid",
                borderColor: "divider",
              },
            }}
          />
        </Box>

        <AdminEntityDrawer
          open={drawerOpen}
          mode={drawerMode}
          entity="hotels"
          title={
            drawerMode === "create"
              ? t("admin.createHotel")
              : t("admin.editHotel")
          }
          initialValues={drawerInitialValues}
          onClose={() => setDrawerOpen(false)}
          onSubmit={handleSubmit}
          saving={saving}
        />
      </Box>

      <ConfirmActionDialog
        open={confirmOpen}
        title={t("admin.deleteHotel")}
        message={t("admin.deleteHotelMessage")}
        confirmText={t("common.delete")}
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
