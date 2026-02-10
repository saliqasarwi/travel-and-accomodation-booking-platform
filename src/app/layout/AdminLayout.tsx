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
} from "@mui/material";
import { useAuth } from "@app/providers/AuthContext";

const drawerWidth = 240;

export default function AdminLayout() {
  const { userType, logout } = useAuth();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
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
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItemButton component={RouterLink} to="/admin">
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton component={RouterLink} to="/admin/cities">
            <ListItemText primary="Cities" />
          </ListItemButton>

          <ListItemButton component={RouterLink} to="/admin/hotels">
            <ListItemText primary="Hotels" />
          </ListItemButton>

          <ListItemButton component={RouterLink} to="/admin/rooms">
            <ListItemText primary="Rooms" />
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
