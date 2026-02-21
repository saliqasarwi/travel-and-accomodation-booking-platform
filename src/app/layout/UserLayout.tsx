import { Outlet, Link as RouterLink } from "react-router-dom";
import { useAuth } from "@app/providers/AuthContext";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import { useCart } from "@features/cart/useCart";
export default function UserLayout() {
  const { totalItems } = useCart();
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
          <Box sx={{ flexGrow: 1 }} />
          {isAuthenticated ? (
            <>
              <IconButton component={RouterLink} to="/cart">
                <Badge badgeContent={totalItems} color="primary">
                  <ShoppingBasketIcon />
                </Badge>
              </IconButton>
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
