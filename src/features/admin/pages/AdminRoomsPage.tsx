import { useCallback, useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminToolbar from "../components/AdminToolbar";
import { getRooms, deleteRoom } from "../api/admin.api";
import type { RoomRow } from "../types/admin.types";
import Chip from "@mui/material/Chip";

export default function AdminRoomsPage() {
  const [rows, setRows] = useState<RoomRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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

  const handleDelete = async (roomId: number) => {
    await deleteRoom(roomId);
    fetchRooms();
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
          onClick={() => handleDelete(params.row.roomId)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      <AdminToolbar
        title="Rooms"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={fetchRooms}
        onCreateClick={() => {
          console.log("Open create room form");
        }}
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
        />
      </Box>
    </Box>
  );
}
