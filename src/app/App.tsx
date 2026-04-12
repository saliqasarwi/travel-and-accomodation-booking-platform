import { RouterProvider } from "react-router-dom";
import { router } from "@app/router/router";
import { AuthProvider } from "@app/providers/AuthProvider";
import { CssBaseline } from "@mui/material";
import { CartProvider } from "@features/cart/CartProvider";
import { ColorModeProvider } from "@app/providers/ColorModeProvider";
import "@shared/i18n/i18n";

export default function App() {
  return (
    <ColorModeProvider>
      <CssBaseline />
      {/*resets browser styles*/}
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </ColorModeProvider>
  );
}
