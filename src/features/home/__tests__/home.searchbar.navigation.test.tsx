import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  RouterProvider,
  createMemoryRouter,
  useLocation,
} from "react-router-dom";

import HomeSearchBar from "../../../shared/components/HomeSearchBar";

function SearchSpy() {
  const location = useLocation();
  return (
    <div>
      <h1>Search Results</h1>
      <div data-testid="search">{location.search}</div>
    </div>
  );
}

describe("HomeSearchBar navigation", () => {
  it("navigates to /search with correct query params", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(
      [
        { path: "/", element: <HomeSearchBar /> },
        { path: "/search", element: <SearchSpy /> },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);

    // Fill the form
    await user.type(screen.getByLabelText(/city/i), "Bali");
    await user.clear(screen.getByLabelText(/check-in/i));
    await user.type(screen.getByLabelText(/check-in/i), "2025-01-31");
    await user.clear(screen.getByLabelText(/check-out/i));
    await user.type(screen.getByLabelText(/check-out/i), "2025-02-01");

    await user.selectOptions(screen.getByLabelText(/adults/i), "2");
    await user.selectOptions(screen.getByLabelText(/children/i), "2");
    await user.selectOptions(screen.getByLabelText(/rooms/i), "1");

    // Submit
    await user.click(screen.getByRole("button", { name: /search/i }));

    // Assert we navigated
    expect(
      await screen.findByRole("heading", { name: /search results/i })
    ).toBeInTheDocument();

    const search = screen.getByTestId("search").textContent ?? "";
    const params = new URLSearchParams(
      search.startsWith("?") ? search.slice(1) : search
    );

    expect(params.get("city")).toBe("Bali");
    expect(params.get("checkInDate")).toBe("2025-01-31");
    expect(params.get("checkOutDate")).toBe("2025-02-01");
    expect(params.get("adults")).toBe("2");
    expect(params.get("children")).toBe("2");
    expect(params.get("numberOfRooms")).toBe("1");
  });
});
