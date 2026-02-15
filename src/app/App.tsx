import { RouterProvider } from "react-router-dom";
import { router } from "@app/router/router";
import { AuthProvider } from "@app/providers/AuthProvider";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@shared/theme/theme";
import { CartProvider } from "@features/cart/CartContext";
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/*resets browser styles*/}
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
