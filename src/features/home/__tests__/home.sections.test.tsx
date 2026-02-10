import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import * as homeApi from "../api/home.api";

describe("Home page sections", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders featured deals section with items", async () => {
    vi.spyOn(homeApi, "getFeaturedDeals").mockResolvedValue([
      { id: 1, hotelName: "Grand Plaza Hotel", city: "New York" },
    ]);

    vi.spyOn(homeApi, "getTrendingDestinations").mockResolvedValue([]);
    vi.spyOn(homeApi, "getRecentHotels").mockResolvedValue([]);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/FeaturedDeals/i)).toBeInTheDocument();
    expect(await screen.findByText(/Grand Plaza Hotel/i)).toBeInTheDocument();
  });

  it("renders trending destinations section with items", async () => {
    vi.spyOn(homeApi, "getFeaturedDeals").mockResolvedValue([]);

    vi.spyOn(homeApi, "getTrendingDestinations").mockResolvedValue([
      { id: 1, cityName: "Paris", country: "France" },
    ]);

    vi.spyOn(homeApi, "getRecentHotels").mockResolvedValue([]);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(
      await screen.findByText(/TrendingDestinations/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Paris/i)).toBeInTheDocument();
  });
});
