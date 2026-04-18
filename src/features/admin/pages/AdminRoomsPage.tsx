import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, IconButton, Chip } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useTranslation } from "react-i18next";

import AdminToolbar from "../components/AdminToolbar";
import AdminEntityDrawer from "../components/AdminEntityDrawer";
import { getRooms, deleteRoom, createRoom, updateRoom } from "../api/admin.api";
import type { RoomFormValues, RoomRow } from "../types/admin.types";
import ConfirmActionDialog from "@shared/components/ConfirmActionDialog";

const EMPTY_ROOM: RoomFormValues = {
  roomNumber: undefined,
  adultCapacity: undefined,
  childrenCapacity: undefined,
  availability: false,
};

export default function AdminRoomsPage() {
  const { t } = useTranslation();

  const [rows, setRows] = useState<RoomRow[]>([]);
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerInitialValues, setDrawerInitialValues] =
    useState<RoomFormValues>(EMPTY_ROOM);
  const [saving, setSaving] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getRooms(
        searchValue ? { roomNumber: searchValue } : undefined
      );
      setRows(data);
    } finally {
      setLoading(false);
    }
  }, [searchValue]);

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

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "roomNumber",
        headerName: t("admin.roomNumber"),
        flex: 1,
        minWidth: 80,
      },
      {
        field: "availability",
        headerName: t("admin.availability"),
        width: 160,
        sortable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const isAvailable = Boolean(params.value);
          return (
            <Chip
              size="small"
              label={
                isAvailable ? t("admin.available") : t("admin.notAvailable")
              }
              color={isAvailable ? "success" : "default"}
              variant={isAvailable ? "filled" : "outlined"}
            />
          );
        },
      },
      {
        field: "adultCapacity",
        headerName: t("admin.adults"),
        width: 120,
      },
      {
        field: "childrenCapacity",
        headerName: t("admin.children"),
        width: 120,
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
              openDeleteDialog(params.row.roomId);
            }}
          >
            <DeleteRoundedIcon />
          </IconButton>
        ),
      },
    ],
    [t]
  );

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <AdminToolbar
          title={t("admin.rooms")}
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
            getRowId={(row) => row.roomId}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
            onRowClick={(params) => openEdit(params.row as RoomRow)}
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
          entity="rooms"
          title={
            drawerMode === "create"
              ? t("admin.createRoom")
              : t("admin.editRoom")
          }
          initialValues={drawerInitialValues}
          onClose={() => setDrawerOpen(false)}
          onSubmit={handleSubmit}
          saving={saving}
        />
      </Box>

      <ConfirmActionDialog
        open={confirmOpen}
        title={t("admin.deleteRoom")}
        message={t("admin.deleteRoomMessage")}
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
