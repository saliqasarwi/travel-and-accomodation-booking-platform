import { Box, Typography } from "@mui/material";

export default function CheckoutHeader() {
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
        Checkout
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Complete your booking details and confirm your stay.
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
