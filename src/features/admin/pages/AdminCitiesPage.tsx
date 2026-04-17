import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useTranslation } from "react-i18next";

import AdminToolbar from "../components/AdminToolbar";
import AdminEntityDrawer from "../components/AdminEntityDrawer";
import {
  getCities,
  deleteCity,
  createCity,
  updateCity,
} from "../api/admin.api";
import type { CityFormValues, CityRow } from "../types/admin.types";
import ConfirmActionDialog from "@shared/components/ConfirmActionDialog";
import { localizeField } from "@features/checkout/utils/localize";

const EMPTY_CITY: CityFormValues = {
  name: "",
  country: "",
  postOffice: "",
  numberOfHotels: undefined,
};

export default function AdminCitiesPage() {
  const { t, i18n } = useTranslation();

  const [rows, setRows] = useState<CityRow[]>([]);
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerInitialValues, setDrawerInitialValues] =
    useState<CityFormValues>(EMPTY_CITY);
  const [saving, setSaving] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCities = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCities(
        searchValue ? { name: searchValue } : undefined
      );
      setRows(data);
    } finally {
      setLoading(false);
    }
  }, [searchValue]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const openCreate = () => {
    setDrawerMode("create");
    setSelectedId(null);
    setDrawerInitialValues(EMPTY_CITY);
    setDrawerOpen(true);
  };

  const openEdit = (row: CityRow) => {
    setDrawerMode("edit");
    setSelectedId(row.id);
    setDrawerInitialValues({
      name: localizeField(row.name, i18n.language),
      country: localizeField(row.country, i18n.language),
      postOffice: localizeField(row.postOffice, i18n.language),
      numberOfHotels: row.numberOfHotels,
    });
    setDrawerOpen(true);
  };

  const handleSubmit = async (values: CityFormValues) => {
    try {
      setSaving(true);

      if (drawerMode === "create") {
        await createCity(values);
      } else {
        if (selectedId == null) return;
        await updateCity(selectedId, values);
      }

      setDrawerOpen(false);
      await fetchCities();
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
      await deleteCity(selectedDeleteId);
      setConfirmOpen(false);
      setSelectedDeleteId(null);
      await fetchCities();
    } finally {
      setDeleting(false);
    }
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "name",
        headerName: t("admin.name"),
        flex: 1,
        minWidth: 160,
        renderCell: (params) => localizeField(params.row.name, i18n.language),
      },
      {
        field: "country",
        headerName: t("admin.country"),
        flex: 1,
        minWidth: 140,
        renderCell: (params) =>
          localizeField(params.row.country, i18n.language),
      },
      {
        field: "postOffice",
        headerName: t("admin.postOffice"),
        flex: 1,
        minWidth: 160,
        renderCell: (params) =>
          localizeField(params.row.postOffice, i18n.language),
      },
      {
        field: "numberOfHotels",
        headerName: t("admin.numberOfHotels"),
        width: 140,
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
        width: 90,
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
          title={t("admin.cities")}
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
            density="standard"
            rowHeight={52}
            columnHeaderHeight={52}
            onRowClick={(params) => openEdit(params.row as CityRow)}
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
          entity="cities"
          title={
            drawerMode === "create"
              ? t("admin.createCity")
              : t("admin.editCity")
          }
          initialValues={drawerInitialValues}
          onClose={() => setDrawerOpen(false)}
          onSubmit={handleSubmit}
          saving={saving}
        />
      </Box>

      <ConfirmActionDialog
        open={confirmOpen}
        title={t("admin.deleteCity")}
        message={t("admin.deleteCityMessage")}
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
