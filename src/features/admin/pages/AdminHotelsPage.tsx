import { useEffect, useState } from "react";
import { Box, IconButton, Rating } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

import AdminToolbar from "../components/AdminToolbar";
import { getHotels, deleteHotel } from "../api/admin.api";
import type { HotelRow } from "../types/admin.types";

export default function AdminHotelsPage() {
  const [rows, setRows] = useState<HotelRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const data = await getHotels(
        searchValue ? { hotelName: searchValue } : undefined
      );
      setRows(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteHotel(id);
    fetchHotels();
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
        <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  return (
    <Box>
      <AdminToolbar
        title="Hotels"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={fetchHotels}
        onCreateClick={() => {
          console.log("Open create hotel form");
        }}
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
        />
      </Box>
    </Box>
  );
}
