import { Link as RouterLink, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useState } from "react";
import { useAuth } from "@app/providers/AuthContext";

const drawerWidth = 240;
const collapsedWidth = 72;
export default function AdminLayout() {
  const { userType, logout } = useAuth();
  const [open, setOpen] = useState(true);
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ width: "100%" }}
          >
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Collapse navigation" : "Expand navigation"}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>

            <Typography variant="h6" noWrap>
              Admin Panel
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Typography variant="body2">
              Role: <b>{userType}</b>
            </Typography>

            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
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
                duration: theme.transitions.duration.shortest,
              }),
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List sx={{ px: 1 }}>
          <ListItemButton component={RouterLink} to="/admin/cities">
            <ListItemText primary="Cities" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>

          <ListItemButton component={RouterLink} to="/admin/hotels">
            <ListItemText primary="Hotels" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>

          <ListItemButton component={RouterLink} to="/admin/rooms">
            <ListItemText primary="Rooms" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
