import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function CheckoutHeader() {
  const { t } = useTranslation();

  return (
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
        {t("checkout.title")}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        {t("checkout.subtitle")}
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
  );
}
