import { createBrowserRouter } from "react-router-dom";

import UserLayout from "@app/layout/UserLayout";

import LoginPage from "@features/auth/pages/LoginPage";
import HomePage from "@features/home/pages/HomePage";
import SearchResultsPage from "@features/search/pages/SearchResultsPage";
import HotelPage from "@features/hotel/pages/HotelPage";
import CheckoutPage from "@features/checkout/pages/CheckoutPage";
import ConfirmationPage from "@features/confirmation/pages/ConfirmationPage";
import AdminPage from "@features/admin/pages/AdminPage";

import NotFoundPage from "@shared/components/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "search", element: <SearchResultsPage /> },
      { path: "hotels/:hotelId", element: <HotelPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "confirmation/:bookingId", element: <ConfirmationPage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);
