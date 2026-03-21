import {
  Box,
  Grid,
  Stack,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Rating,
  IconButton,
  Button,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { useCart } from "../useCart";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmActionDialog from "@shared/components/ConfirmActionDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function CartItemsList() {
  const { state, removeItem } = useCart();
  const items = state.items;
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <Box textAlign="center" py={6}>
        <Typography variant="h6" fontWeight={800}>
          Your cart is empty
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Add rooms to continue
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Explore hotels
        </Button>
      </Box>
    );
  }

  const openDeleteDialog = (itemId: string) => {
    setSelectedItemId(itemId);
    setConfirmOpen(true);
  };

  const handleCloseDialog = () => {
    setConfirmOpen(false);
    setSelectedItemId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedItemId == null) return;
    removeItem(selectedItemId);
    handleCloseDialog();
  };
  return (
    <>
      <Grid container spacing={4}>
        {items.map((item) => (
          <Grid key={item.id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 16px 32px rgba(15,23,42,0.10)",
                },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image={item.roomPhotoUrl}
                  alt={item.roomType}
                  sx={{
                    height: 180,
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: 14,
                    color: "white",
                    background:
                      "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
                  }}
                >
                  ${item.pricePerNight}
                </Box>
              </Box>

              <CardContent sx={{ p: 2 }}>
                <Stack spacing={1.2}>
                  <Typography variant="h6" fontWeight={800}>
                    {item.hotelName}
                  </Typography>

                  <Rating
                    value={item.starRating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />

                  <Typography variant="body2" color="text.secondary">
                    {item.roomType} • {item.cityName}
                  </Typography>

                  <Stack spacing={0.5}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarMonthIcon sx={{ fontSize: 16 }} />
                      <Typography variant="caption">
                        {item.checkInDate} → {item.checkOutDate}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <PeopleOutlineIcon sx={{ fontSize: 16 }} />
                      <Typography variant="caption">
                        {item.adults} adults • {item.children} children
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: 1 }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      color="primary.main"
                    >
                      ${item.pricePerNight * (item.numberOfRooms || 1)} total
                    </Typography>

                    <IconButton
                      color="error"
                      onClick={() => openDeleteDialog(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ConfirmActionDialog
        open={confirmOpen}
        title="Remove item"
        message="Are you sure you want to remove this item from the cart?"
        confirmText="Remove"
        confirmColor="error"
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
