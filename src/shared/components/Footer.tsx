import { Box, Container, Grid, Link, Stack, Typography } from "@mui/material";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import { useTranslation } from "react-i18next";

const footerLinkSx = {
  color: "text.secondary",
  textDecoration: "none",
  fontSize: "0.95rem",
  transition: "color 0.2s ease, transform 0.2s ease",
  "&:hover": {
    color: "primary.main",
    transform: "translateX(2px)",
  },
};

const sectionTitleSx = {
  fontWeight: 800,
  color: "text.primary",
  mb: 1.5,
  fontSize: "1rem",
};

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={(theme) => ({
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle at top left, rgba(21,101,192,0.12), transparent 28%), radial-gradient(circle at bottom right, rgba(15,157,148,0.10), transparent 24%)"
              : "radial-gradient(circle at top left, rgba(21,101,192,0.08), transparent 28%), radial-gradient(circle at bottom right, rgba(15,157,148,0.08), transparent 24%)",
        })}
      />

      <Container
        maxWidth="lg"
        sx={{ position: "relative", py: { xs: 5, md: 7 } }}
      >
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background:
                      "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
                    color: "#fff",
                    boxShadow: "0 10px 24px rgba(21,101,192,0.22)",
                  }}
                >
                  <TravelExploreRoundedIcon />
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 900,
                    color: "text.primary",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Travelio
                </Typography>
              </Stack>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  maxWidth: 420,
                  lineHeight: 1.8,
                }}
              >
                {t("footer.brandDescription")}
              </Typography>

              <Box
                sx={{
                  width: 72,
                  height: 4,
                  borderRadius: 999,
                  background:
                    "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
                }}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography sx={sectionTitleSx}>{t("footer.company")}</Typography>
            <Stack spacing={1.2}>
              <Link href="#" underline="none" sx={footerLinkSx}>
                {t("footer.about")}
              </Link>
              <Link href="#" underline="none" sx={footerLinkSx}>
                {t("footer.careers")}
              </Link>
              <Link href="#" underline="none" sx={footerLinkSx}>
                {t("footer.blog")}
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography sx={sectionTitleSx}>{t("footer.support")}</Typography>
            <Stack spacing={1.2}>
              <Link href="#" underline="none" sx={footerLinkSx}>
                {t("footer.helpCenter")}
              </Link>
              <Link href="#" underline="none" sx={footerLinkSx}>
                {t("footer.contactUs")}
              </Link>
              <Link href="#" underline="none" sx={footerLinkSx}>
                {t("footer.faqs")}
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 3 }}>
            <Typography sx={sectionTitleSx}>{t("footer.legal")}</Typography>
            <Stack spacing={1.2}>
              <Link href="#" underline="none" sx={footerLinkSx}>
                {t("footer.privacyPolicy")}
              </Link>
              <Link href="#" underline="none" sx={footerLinkSx}>
                {t("footer.termsOfService")}
              </Link>
              <Link href="#" underline="none" sx={footerLinkSx}>
                {t("footer.cookies")}
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: { xs: 4, md: 5 },
            pt: 2.5,
            borderTop: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Travelio.{" "}
            {t("footer.allRightsReserved")}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Link href="#" underline="none" sx={footerLinkSx}>
              {t("footer.terms")}
            </Link>
            <Link href="#" underline="none" sx={footerLinkSx}>
              {t("footer.privacy")}
            </Link>
            <Link href="#" underline="none" sx={footerLinkSx}>
              {t("footer.support")}
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
