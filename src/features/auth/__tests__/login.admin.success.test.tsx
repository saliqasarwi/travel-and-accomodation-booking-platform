import { describe, expect, it, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderAuthApp } from "@features/auth/test/renderAuthApp";

vi.mock("@features/auth/api/auth.api", () => ({
  authenticate: vi.fn(),
}));

import { authenticate } from "@features/auth/api/auth.api";

describe("Login - admin success", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("redirects to admin after successful admin login", async () => {
    (authenticate as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      authentication: "admintoken",
      userType: "Admin",
    });

    renderAuthApp("/login");

    await userEvent.type(screen.getByLabelText(/username/i), "admin");
    await userEvent.type(screen.getByLabelText(/password/i), "admin");
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByRole("heading", { name: /^admin$/i })
    ).toBeInTheDocument();
    expect(localStorage.getItem("auth_token")).toBe("admintoken");
    expect(localStorage.getItem("user_type")).toBe("Admin");
  });
});
