import { Box, Button, Stack, Typography } from "@mui/material";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function EmptyBookingsState() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        p: { xs: 4, md: 6 },
        borderRadius: 4,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
        textAlign: "center",
      }}
    >
      <Stack spacing={2.5} alignItems="center">
        <Box
          sx={{
            width: 132,
            height: 132,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            position: "relative",
            background:
              "radial-gradient(circle at 30% 30%, rgba(21,101,192,0.14), rgba(15,157,148,0.10))",
          }}
        >
          <Box
            sx={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background:
                "linear-gradient(135deg, rgba(21,101,192,0.12) 0%, rgba(15,157,148,0.16) 100%)",
              color: "primary.main",
            }}
          >
            <EventNoteRoundedIcon sx={{ fontSize: 42 }} />
          </Box>

          <Box
            sx={{
              position: "absolute",
              right: 8,
              bottom: 8,
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              color: "white",
              background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
              boxShadow: "0 8px 18px rgba(21,101,192,0.25)",
            }}
          >
            <FlightTakeoffRoundedIcon sx={{ fontSize: 18 }} />
          </Box>
        </Box>

        <Stack spacing={1} alignItems="center">
          <Typography variant="h5" fontWeight={800}>
            {t("bookings.emptyStateTitle")}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 460,
              lineHeight: 1.7,
            }}
          >
            {t("bookings.emptyStateHint")}
          </Typography>
        </Stack>

        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            minWidth: 180,
            borderRadius: 2,
            fontWeight: 700,
            px: 3,
          }}
        >
          {t("bookings.exploreHotels")}
        </Button>
      </Stack>
    </Box>
  );
}
