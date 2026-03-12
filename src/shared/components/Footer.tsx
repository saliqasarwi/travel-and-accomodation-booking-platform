import { Box, Container, Grid, Link, Stack, Typography } from "@mui/material";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";

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
  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(240,247,255,0.95) 100%)",
        borderTop: "1px solid",
        borderColor: "rgba(21,101,192,0.10)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at top left, rgba(21,101,192,0.08), transparent 28%), radial-gradient(circle at bottom right, rgba(15,157,148,0.08), transparent 24%)",
        }}
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
                Discover the best hotels and destinations worldwide. Plan your
                next trip with ease, comfort, and unforgettable stays.
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
            <Typography sx={sectionTitleSx}>Company</Typography>
            <Stack spacing={1.2}>
              <Link href="#" underline="none" sx={footerLinkSx}>
                About
              </Link>
              <Link href="#" underline="none" sx={footerLinkSx}>
                Careers
              </Link>
              <Link href="#" underline="none" sx={footerLinkSx}>
                Blog
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography sx={sectionTitleSx}>Support</Typography>
            <Stack spacing={1.2}>
              <Link href="#" underline="none" sx={footerLinkSx}>
                Help Center
              </Link>
              <Link href="#" underline="none" sx={footerLinkSx}>
                Contact Us
              </Link>
              <Link href="#" underline="none" sx={footerLinkSx}>
                FAQs
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 3 }}>
            <Typography sx={sectionTitleSx}>Legal</Typography>
            <Stack spacing={1.2}>
              <Link href="#" underline="none" sx={footerLinkSx}>
                Privacy Policy
              </Link>
              <Link href="#" underline="none" sx={footerLinkSx}>
                Terms of Service
              </Link>
              <Link href="#" underline="none" sx={footerLinkSx}>
                Cookies
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: { xs: 4, md: 5 },
            pt: 2.5,
            borderTop: "1px solid",
            borderColor: "rgba(31,41,55,0.08)",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Travelio. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Link href="#" underline="none" sx={footerLinkSx}>
              Terms
            </Link>
            <Link href="#" underline="none" sx={footerLinkSx}>
              Privacy
            </Link>
            <Link href="#" underline="none" sx={footerLinkSx}>
              Support
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
