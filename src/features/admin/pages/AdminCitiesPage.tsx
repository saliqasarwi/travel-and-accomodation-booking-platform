import { useEffect, useMemo, useState } from "react";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridColumnVisibilityModel,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

import AdminToolbar from "../components/AdminToolbar";
import { getCities, deleteCity } from "../api/admin.api";
import type { CityRow } from "../types/admin.types";

const ALL_VISIBLE: GridColumnVisibilityModel = {
  name: true,
  country: true,
  postOffice: true,
  numberOfHotels: true,
  createdAt: true,
  modifiedAt: true,
  actions: true,
};

export default function AdminCitiesPage() {
  const [rows, setRows] = useState<CityRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // < 600
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600-899

  const [colVisibility, setColVisibility] =
    useState<GridColumnVisibilityModel>(ALL_VISIBLE);

  const fetchCities = async () => {
    try {
      setLoading(true);
      const data = await getCities(
        searchValue ? { name: searchValue } : undefined
      );
      setRows(data);
    } finally {
      setLoading(false);
    }
  };

  // fetch once
  useEffect(() => {
    fetchCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // responsive visibility model (mobile/tablet/desktop)
  useEffect(() => {
    if (isMobile) {
      // Mobile: only name + actions
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
      // Tablet: name + country + #hotels + actions
      setColVisibility({
        ...ALL_VISIBLE,
        postOffice: false,
        createdAt: false,
        modifiedAt: false,
      });
      return;
    }

    // Desktop: all columns
    setColVisibility(ALL_VISIBLE);
  }, [isMobile, isTablet]);

  const handleDelete = async (id: number) => {
    await deleteCity(id);
    fetchCities();
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
      { field: "createdAt", headerName: "Created", flex: 1, minWidth: 160 },
      { field: "modifiedAt", headerName: "Modified", flex: 1, minWidth: 160 },
      {
        field: "actions",
        headerName: "Actions",
        width: 90,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        ),
      },
    ],
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <AdminToolbar
        title="Cities"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={fetchCities}
        onCreateClick={() => console.log("Open create city form")}
      />

      {/* DataGrid needs a height (or autoHeight) */}
      <Box
        sx={{
          mt: 3,
          width: "100%",
          minWidth: 0,
          height: { xs: 420, sm: 520, md: 620 },
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
          sx={{
            "& .MuiDataGrid-cell": { py: isMobile ? 0.5 : 1 },
          }}
        />
      </Box>
    </Box>
  );
}
