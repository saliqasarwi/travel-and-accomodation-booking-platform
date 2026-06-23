import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AdminToolbar from "../components/AdminToolbar";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, string>) => {
      const translations: Record<string, string> = {
        "admin.cities": "Cities",
        "admin.searchPlaceholder": `Search ${options?.entity ?? ""}`,
        "common.search": "Search",
        "common.clear": "Clear",
        "common.create": "Create",
      };

      return translations[key] ?? key;
    },
  }),
}));

describe("AdminToolbar", () => {
  it("renders title, search input, and action buttons", () => {
    render(
      <AdminToolbar
        title="admin.cities"
        searchValue=""
        onSearchChange={vi.fn()}
        onSearchSubmit={vi.fn()}
        onClearSearch={vi.fn()}
        onCreateClick={vi.fn()}
      />
    );

    expect(
      screen.getByRole("heading", { name: /cities/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/search admin.cities/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });

  it("calls handlers when user interacts with toolbar", async () => {
    const user = userEvent.setup();

    const onSearchChange = vi.fn();
    const onSearchSubmit = vi.fn();
    const onClearSearch = vi.fn();
    const onCreateClick = vi.fn();

    render(
      <AdminToolbar
        title="admin.cities"
        searchValue=""
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        onClearSearch={onClearSearch}
        onCreateClick={onCreateClick}
      />
    );

    await user.type(screen.getByPlaceholderText(/search/i), "Jenin");
    expect(onSearchChange).toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: /search/i }));
    expect(onSearchSubmit).toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: /clear/i }));
    expect(onClearSearch).toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: /create/i }));
    expect(onCreateClick).toHaveBeenCalled();
  });

  it("submits search when Enter is pressed", async () => {
    const user = userEvent.setup();
    const onSearchSubmit = vi.fn();

    render(
      <AdminToolbar
        title="admin.cities"
        searchValue=""
        onSearchChange={vi.fn()}
        onSearchSubmit={onSearchSubmit}
        onClearSearch={vi.fn()}
        onCreateClick={vi.fn()}
      />
    );

    await user.type(screen.getByPlaceholderText(/search/i), "{enter}");

    expect(onSearchSubmit).toHaveBeenCalled();
  });
});
