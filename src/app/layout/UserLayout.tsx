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

import { useCart } from "@features/cart/useCart";
import { useAuth } from "@app/providers/AuthContext";
import Footer from "@shared/components/Footer.tsx";
import { GridSearchIcon } from "@mui/x-data-grid";

export default function UserLayout() {
  const { totalItems } = useCart();
  const { isAuthenticated, logout } = useAuth();

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
              <Tooltip title="Home">
                <IconButton component={RouterLink} to="/" color="inherit">
                  <HomeRoundedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Search">
                <IconButton component={RouterLink} to="/search" color="inherit">
                  <GridSearchIcon />
                </IconButton>
              </Tooltip>
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            {isAuthenticated && (
              <Tooltip title="Cart">
                <IconButton component={RouterLink} to="/cart" color="inherit">
                  <Badge badgeContent={totalItems} color="primary">
                    <LocalMallOutlinedIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            <Box sx={{ ml: 1.5 }}>
              {isAuthenticated ? (
                <>
                  <Tooltip title="Profile">
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
                    PaperProps={{
                      sx: {
                        mt: 1,
                        minWidth: 190,
                        borderRadius: 3,
                        overflow: "visible",
                        boxShadow: 6,
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
                    }}
                  >
                    <Box sx={{ px: 2, py: 1.5 }}>
                      <Typography variant="subtitle2" fontWeight={700}>
                        Sali
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        My account
                      </Typography>
                    </Box>

                    <Divider />

                    <MenuItem
                      component={RouterLink}
                      to="/profile"
                      onClick={handleCloseProfileMenu}
                    >
                      Profile
                    </MenuItem>

                    <MenuItem
                      component={RouterLink}
                      to="/bookings"
                      onClick={handleCloseProfileMenu}
                    >
                      My Bookings
                    </MenuItem>

                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <IconButton
                  component={RouterLink}
                  to="/login"
                  color="inherit"
                  aria-label="Login"
                >
                  <PersonOutlineRoundedIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container component="main">
        <Outlet />
        <Footer />
      </Container>
    </Box>
  );
}
