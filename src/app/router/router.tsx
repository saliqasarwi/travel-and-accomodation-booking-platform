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
import AdminLayout from "@app/layout/AdminLayout";

import AdminHomePage from "@features/admin/pages/AdminHomePage";
import AdminCitiesPage from "@features/admin/pages/AdminCitiesPage";
import AdminHotelsPage from "@features/admin/pages/AdminHotelsPage";
import AdminRoomsPage from "@features/admin/pages/AdminRoomsPage";

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
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHomePage /> },
      { path: "cities", element: <AdminCitiesPage /> },
      { path: "hotels", element: <AdminHotelsPage /> },
      { path: "rooms", element: <AdminRoomsPage /> },
    ],
  },
]);
