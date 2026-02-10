import { Outlet, Link as RouterLink } from "react-router-dom";
import { useAuth } from "@app/providers/AuthContext";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Typography,
} from "@mui/material";
export default function UserLayout() {
  const { isAuthenticated, userType, logout } = useAuth();
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ gap: 1 }}>
          <Button component={RouterLink} to="/">
            Home
          </Button>
          <Button component={RouterLink} to="/search">
            Search
          </Button>
          <Button component={RouterLink} to="/checkout">
            Checkout
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          {isAuthenticated ? (
            <>
              <Typography variant="body2" sx={{ mr: 1 }}>
                Role: <b>{userType}</b>
              </Typography>

              <Button onClick={logout} variant="contained">
                Logout
              </Button>
            </>
          ) : (
            <Button component={RouterLink} to="/login" variant="contained">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
