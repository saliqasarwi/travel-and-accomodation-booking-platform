import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridColumnVisibilityModel,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

import AdminToolbar from "../components/AdminToolbar";
import AdminEntityDrawer from "../components/AdminEntityDrawer";

import {
  getCities,
  deleteCity,
  createCity,
  updateCity,
} from "../api/admin.api";
import type { CityFormValues, CityRow } from "../types/admin.types";

const ALL_VISIBLE: GridColumnVisibilityModel = {
  name: true,
  country: true,
  postOffice: true,
  numberOfHotels: true,
  createdAt: true,
  modifiedAt: true,
  actions: true,
};

const EMPTY_CITY: CityFormValues = {
  name: "",
  country: "",
  postOffice: "",
  numberOfHotels: undefined,
};

export default function AdminCitiesPage() {
  const [rows, setRows] = useState<CityRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  //  drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerInitialValues, setDrawerInitialValues] =
    useState<CityFormValues>(EMPTY_CITY);
  const [saving, setSaving] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [colVisibility, setColVisibility] =
    useState<GridColumnVisibilityModel>(ALL_VISIBLE);

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

  useEffect(() => {
    if (isMobile) {
      setColVisibility({
        ...ALL_VISIBLE,
        country: false,
        postOffice: false,
        numberOfHotels: false,
        createdAt: false,
        modifiedAt: false,
      });
      return;
    }

    if (isTablet) {
      setColVisibility({
        ...ALL_VISIBLE,
        postOffice: false,
        createdAt: false,
        modifiedAt: false,
      });
      return;
    }

    setColVisibility(ALL_VISIBLE);
  }, [isMobile, isTablet]);

  const handleDelete = useCallback(
    async (id: number) => {
      await deleteCity(id);
      fetchCities();
    },
    [fetchCities]
  );

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
      name: row.name ?? "",
      country: row.country ?? "",
      postOffice: row.postOffice ?? "",
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

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "name", headerName: "Name", flex: 1, minWidth: 160 },
      { field: "country", headerName: "Country", flex: 1, minWidth: 140 },
      {
        field: "postOffice",
        headerName: "Post Office",
        flex: 1,
        minWidth: 160,
      },
      { field: "numberOfHotels", headerName: "# Hotels", width: 110 },
      { field: "createdAt", headerName: "Created", flex: 1, minWidth: 170 },
      { field: "modifiedAt", headerName: "Modified", flex: 1, minWidth: 170 },
      {
        field: "actions",
        headerName: "Actions",
        width: 90,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <IconButton
            color="error"
            onClick={(e) => {
              e.stopPropagation(); // prevent row click opening edit
              handleDelete(params.row.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
    ],
    [handleDelete]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <AdminToolbar
        title="Cities"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={fetchCities}
        onCreateClick={openCreate}
      />

      <Box
        sx={{
          mt: 3,
          width: "100%",
          minWidth: 0,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          columnVisibilityModel={colVisibility}
          onColumnVisibilityModelChange={setColVisibility}
          density={isMobile ? "compact" : "standard"}
          rowHeight={isMobile ? 36 : 52}
          columnHeaderHeight={isMobile ? 40 : 56}
          onRowClick={(params) => openEdit(params.row as CityRow)} //  edit on row click
          sx={{
            "& .MuiDataGrid-cell": { py: isMobile ? 0.5 : 1 },
          }}
        />
      </Box>

      <AdminEntityDrawer
        open={drawerOpen}
        mode={drawerMode}
        entity="cities"
        title={drawerMode === "create" ? "Create City" : "Edit City"}
        initialValues={drawerInitialValues}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
        saving={saving}
      />
    </Box>
  );
}
