import { Outlet, Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Divider,
} from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { GridSearchIcon } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

import { useCart } from "@features/cart/useCart";
import { useAuth } from "@app/providers/AuthContext";
import { useColorMode } from "@app/providers/ColorModeProvider";
import Footer from "@shared/components/Footer";
import LanguageSwitcher from "@shared/components/LanguageSwitcher";

export default function UserLayout() {
  const { totalItems } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const { mode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const profileMenuOpen = Boolean(anchorEl);

  const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseProfileMenu();
    logout();
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          backdropFilter: "blur(10px)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 72 }}>
            <Stack
              component={RouterLink}
              to="/"
              direction="row"
              spacing={1.25}
              alignItems="center"
              sx={{
                textDecoration: "none",
                color: "text.primary",
                mr: 3,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  boxShadow: 2,
                }}
              >
                <FlightTakeoffRoundedIcon fontSize="small" />
              </Box>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  letterSpacing: 1.2,
                  lineHeight: 1,
                }}
              >
                Travelio
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title={t("nav.home")}>
                <IconButton component={RouterLink} to="/" color="inherit">
                  <HomeRoundedIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={t("nav.search")}>
                <IconButton component={RouterLink} to="/search" color="inherit">
                  <GridSearchIcon />
                </IconButton>
              </Tooltip>
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            {isAuthenticated && (
              <Tooltip title={t("nav.cart")}>
                <IconButton component={RouterLink} to="/cart" color="inherit">
                  <Badge badgeContent={totalItems} color="primary">
                    <LocalMallOutlinedIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            <LanguageSwitcher />

            <Tooltip
              title={mode === "light" ? t("theme.dark") : t("theme.light")}
            >
              <IconButton onClick={toggleColorMode} color="inherit">
                {mode === "light" ? (
                  <DarkModeRoundedIcon />
                ) : (
                  <LightModeRoundedIcon />
                )}
              </IconButton>
            </Tooltip>

            <Box sx={{ ml: 1.5 }}>
              {isAuthenticated ? (
                <>
                  <Tooltip title={t("nav.profile")}>
                    <IconButton onClick={handleOpenProfileMenu} color="inherit">
                      <Avatar
                        sx={{
                          width: 38,
                          height: 38,
                          bgcolor: "primary.light",
                          color: "primary.contrastText",
                          fontWeight: 700,
                        }}
                      >
                        S
                      </Avatar>
                    </IconButton>
                  </Tooltip>

                  <Menu
                    anchorEl={anchorEl}
                    open={profileMenuOpen}
                    onClose={handleCloseProfileMenu}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    slotProps={{
                      paper: {
                        sx: {
                          mt: 1,
                          minWidth: 190,
                          borderRadius: 3,
                          boxShadow: 6,
                          overflow: "visible",
                          "&:before": {
                            content: '""',
                            position: "absolute",
                            top: -8,
                            right: 16,
                            width: 16,
                            height: 16,
                            bgcolor: "background.paper",
                            transform: "rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                  >
                    <Box sx={{ px: 2, py: 1.5 }}>
                      <Typography variant="subtitle2" fontWeight={700}>
                        Sali
                      </Typography>
                    </Box>

                    <Divider />

                    <MenuItem
                      component={RouterLink}
                      to="/profile"
                      onClick={handleCloseProfileMenu}
                    >
                      {t("nav.profile")}
                    </MenuItem>

                    <MenuItem
                      component={RouterLink}
                      to="/bookings"
                      onClick={handleCloseProfileMenu}
                    >
                      {t("nav.bookings")}
                    </MenuItem>

                    <MenuItem onClick={handleLogout}>
                      {t("nav.logout")}
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <IconButton
                  component={RouterLink}
                  to="/login"
                  color="inherit"
                  aria-label={t("auth.login")}
                >
                  <PersonOutlineRoundedIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ py: 2 }}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
