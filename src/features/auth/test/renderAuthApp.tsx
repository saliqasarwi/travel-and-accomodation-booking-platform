import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { AuthProvider } from "@app/providers/AuthProvider";
import LoginPage from "@features/auth/pages/LoginPage";
import RequireAdmin from "@features/auth/guards/RequireAdmin";
import { Home, Admin, TestUserLayout } from "./TestRoutes";

export function renderAuthApp(initialPath = "/login") {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <TestUserLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "login", element: <LoginPage /> },
        ],
      },
      {
        path: "/admin",
        element: (
          <RequireAdmin>
            <Admin />
          </RequireAdmin>
        ),
      },
    ],
    { initialEntries: [initialPath] }
  );

  return render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
