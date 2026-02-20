import { createBrowserRouter } from "react-router-dom";

import UserLayout from "@app/layout/UserLayout";

import LoginPage from "@features/auth/pages/LoginPage";
import HomePage from "@features/home/pages/HomePage";
import SearchResultsPage from "@features/search/pages/SearchResultsPage";
import HotelPage from "@features/hotel/pages/HotelPage";
import CheckoutPage from "@features/checkout/pages/CheckoutPage";
import ConfirmationPage from "@features/confirmation/pages/ConfirmationPage";
import NotFoundPage from "@shared/components/NotFoundPage";
import AdminLayout from "@app/layout/AdminLayout";

import AdminHomePage from "@features/admin/pages/AdminHomePage";
import AdminCitiesPage from "@features/admin/pages/AdminCitiesPage";
import AdminHotelsPage from "@features/admin/pages/AdminHotelsPage";
import AdminRoomsPage from "@features/admin/pages/AdminRoomsPage";
import RequireAuth from "@features/auth/guards/RequireAuth";
import RequireAdmin from "@features/auth/guards/RequireAdmin";
import CartPage from "@features/cart/pages/CartPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: (
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        ),
      },
      { path: "login", element: <LoginPage /> },
      {
        path: "search",
        element: (
          <RequireAuth>
            <SearchResultsPage />
          </RequireAuth>
        ),
      },
      {
        path: "hotels/:hotelId",
        element: (
          <RequireAuth>
            <HotelPage />
          </RequireAuth>
        ),
      },
      {
        path: "checkout",
        element: (
          <RequireAuth>
            <CheckoutPage />
          </RequireAuth>
        ),
      },
      {
        path: "confirmation/:bookingId",
        element: (
          <RequireAuth>
            <ConfirmationPage />
          </RequireAuth>
        ),
      },
      {
        path: "cart",
        element: (
          <RequireAuth>
            <CartPage />
          </RequireAuth>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <RequireAdmin>
        <AdminLayout />
      </RequireAdmin>
    ),
    children: [
      { index: true, element: <AdminHomePage /> },
      { path: "cities", element: <AdminCitiesPage /> },
      { path: "hotels", element: <AdminHotelsPage /> },
      { path: "rooms", element: <AdminRoomsPage /> },
    ],
  },
]);
