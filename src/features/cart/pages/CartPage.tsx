import { Box, Button, Stack, Typography } from "@mui/material";
import CartItemsList from "../components/CartItemsList";
import { useNavigate } from "react-router-dom";
import { useCart } from "../useCart";
import { useTranslation } from "react-i18next";

export default function CartPage() {
  const navigate = useNavigate();
  const { state } = useCart();
  const { t } = useTranslation();
  const items = state.items;

  return (
    <Stack sx={{ px: { xs: 2, md: 8 }, gap: 3 }}>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2rem", md: "2.5rem" },
            lineHeight: 1.05,
            background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 0.75,
          }}
        >
          {t("cart.title")}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {t("cart.subtitle")}
        </Typography>

        <Box
          sx={{
            width: 72,
            height: 4,
            borderRadius: 999,
            background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
          }}
        />
      </Box>

      <CartItemsList />

      {items.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/checkout")}
            sx={{
              minWidth: 220,
              borderRadius: 2,
              px: 4,
              fontWeight: 700,
              mt: 0,
            }}
          >
            Proceed to checkout
          </Button>
        </Box>
      )}
    </Stack>
  );
}
