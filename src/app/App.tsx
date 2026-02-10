import { RouterProvider } from "react-router-dom";
import { router } from "@app/router/router";
import { AuthProvider } from "@app/providers/AuthProvider";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@shared/theme/theme";
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/*resets browser styles*/}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}
