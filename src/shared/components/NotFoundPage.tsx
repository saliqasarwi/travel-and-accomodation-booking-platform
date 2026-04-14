import { Box, Button, Stack, Typography } from "@mui/material";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        px: 2,
        py: { xs: 6, md: 8 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 720,
          p: { xs: 3, sm: 4, md: 5 },
          borderRadius: 4,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)",
          textAlign: "center",
        }}
      >
        <Stack spacing={2.5} alignItems="center">
          <Box
            sx={{
              width: 136,
              height: 136,
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
                color: "primary.main",
                background:
                  "linear-gradient(135deg, rgba(21,101,192,0.12) 0%, rgba(15,157,148,0.16) 100%)",
              }}
            >
              <SearchOffRoundedIcon sx={{ fontSize: 42 }} />
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                px: 1.25,
                py: 0.5,
                borderRadius: 99,
                color: "white",
                fontWeight: 800,
                fontSize: 13,
                background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
                boxShadow: "0 8px 18px rgba(21,101,192,0.22)",
              }}
            >
              404
            </Box>
          </Box>

          <Stack spacing={1} alignItems="center">
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2rem", md: "2.6rem" },
                lineHeight: 1.05,
                background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("notFound.title")}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 520,
                lineHeight: 1.8,
              }}
            >
              {t("notFound.subtitle")}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              variant="contained"
              startIcon={<HomeRoundedIcon />}
              onClick={() => navigate("/")}
              sx={{
                minWidth: 180,
                borderRadius: 2,
                fontWeight: 700,
              }}
            >
              {t("common.backToHome")}
            </Button>

            <Button
              variant="outlined"
              startIcon={<ArrowBackRoundedIcon />}
              onClick={() => navigate(-1)}
              sx={{
                minWidth: 180,
                borderRadius: 2,
                fontWeight: 700,
              }}
            >
              {t("common.back")}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
