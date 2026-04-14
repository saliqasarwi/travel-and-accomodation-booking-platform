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
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../useCart";
import ConfirmActionDialog from "@shared/components/ConfirmActionDialog";
import { nightsBetween } from "@shared/utils/booking";
import { money } from "@shared/utils/formatters.ts";
import emptyCart from "@assets/empty-cart.webp";
import { useTranslation } from "react-i18next";

export default function CartItemsList() {
  const { state, removeItem } = useCart();
  const items = state.items;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const localized = (value: unknown) => {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") {
      const obj = value as Record<string, string | undefined>;
      return obj[i18n.language] ?? obj.en ?? obj.ar ?? "";
    }
    return "";
  };

  if (items.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "45vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Stack
          spacing={1.5}
          alignItems="center"
          textAlign="center"
          sx={{ maxWidth: 360 }}
        >
          <Box
            component="img"
            src={emptyCart}
            alt="Empty cart"
            sx={{
              width: 200,
              maxWidth: "100%",
              height: "auto",
              mx: "auto",
              mb: 0.5,
            }}
          />

          <Typography variant="h5" fontWeight={900}>
            {t("cart.emptyTitle")}
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 1.5 }}>
            {t("cart.emptyHint")}
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              minWidth: 180,
              borderRadius: 2,
              px: 3,
              py: 1.1,
              fontWeight: 700,
            }}
          >
            {t("cart.exploreHotels")}
          </Button>
        </Stack>
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
        {items.map((item) => {
          const roomsCount = item.numberOfRooms || 1;
          const nights = nightsBetween(item.checkInDate, item.checkOutDate);
          const itemTotal = item.pricePerNight * roomsCount * nights;

          return (
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
                    alt={localized(item.roomType)}
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
                    {money(item.pricePerNight)} / night
                  </Box>
                </Box>

                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={1.2}>
                    <Typography variant="h6" fontWeight={800}>
                      {localized(item.hotelName)}
                    </Typography>

                    <Rating
                      value={item.starRating}
                      precision={0.1}
                      readOnly
                      size="small"
                    />

                    <Typography variant="body2" color="text.secondary">
                      {localized(item.roomType)} • {localized(item.cityName)}
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

                      <Typography variant="caption" color="text.secondary">
                        {roomsCount} room{roomsCount !== 1 ? "s" : ""} •{" "}
                        {nights} night{nights !== 1 ? "s" : ""}
                      </Typography>
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
                        {money(itemTotal)} total
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
          );
        })}
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
