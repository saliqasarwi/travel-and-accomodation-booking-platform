import { Link as RouterLink, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Stack,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HotelIcon from "@mui/icons-material/Hotel";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "@app/providers/AuthContext";
import { useColorMode } from "@app/providers/ColorModeProvider";
import LanguageSwitcher from "@shared/components/LanguageSwitcher";

const drawerWidth = 260;
const collapsedWidth = 72;

export default function AdminLayout() {
  const { userType, logout } = useAuth();
  const { mode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 3 } }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>

            <Typography variant="h6" fontWeight={700}>
              {t("admin.panel")}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
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

            <IconButton onClick={handleMenuOpen} sx={{ p: 0.5 }}>
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  bgcolor: "primary.main",
                  fontWeight: 600,
                }}
              >
                {userType?.charAt(0) || "A"}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem disabled sx={{ opacity: 0.8 }}>
                {t("admin.signedInAsAdmin")}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                <LogoutIcon sx={{ mr: 1.5 }} fontSize="small" />
                {t("nav.logout")}
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          [`& .MuiDrawer-paper`]: {
            width: open ? drawerWidth : collapsedWidth,
            overflowX: "hidden",
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: 220,
              }),
            boxSizing: "border-box",
            borderRight: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          },
        }}
      >
        <Toolbar />
        <List sx={{ pt: 2, px: open ? 2 : 1 }}>
          <ListItemButton
            component={RouterLink}
            to="/admin/cities"
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon>
              <LocationCityIcon />
            </ListItemIcon>
            <ListItemText
              primary={t("admin.cities")}
              sx={{ opacity: open ? 1 : 0, transition: "opacity 0.2s" }}
            />
          </ListItemButton>

          <ListItemButton
            component={RouterLink}
            to="/admin/hotels"
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon>
              <HotelIcon />
            </ListItemIcon>
            <ListItemText
              primary={t("admin.hotels")}
              sx={{ opacity: open ? 1 : 0, transition: "opacity 0.2s" }}
            />
          </ListItemButton>

          <ListItemButton
            component={RouterLink}
            to="/admin/rooms"
            sx={{ borderRadius: 2 }}
          >
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText
              primary={t("admin.rooms")}
              sx={{ opacity: open ? 1 : 0, transition: "opacity 0.2s" }}
            />
          </ListItemButton>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          mt: 8,
          bgcolor: "background.default",
          minWidth: 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
