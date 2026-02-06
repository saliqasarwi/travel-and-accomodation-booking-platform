import { describe, expect, it, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderAuthApp } from "@features/auth/test/renderAuthApp";
//replaces authenticate with a fake function I can control
//prevents real network calls during tests
vi.mock("@features/auth/api/auth.api", () => ({
  authenticate: vi.fn(),
}));

import { authenticate } from "@features/auth/api/auth.api";

describe("Login - user success", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("redirects to home after successful user login", async () => {
    (authenticate as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      //Simulates a successful login response from the backend
      authentication: "token123",
      userType: "User",
    });

    renderAuthApp("/login");

    await userEvent.type(screen.getByLabelText(/username/i), "user");
    await userEvent.type(screen.getByLabelText(/password/i), "user");
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    // test login and redirect
    expect(
      await screen.findByRole("heading", { name: /^home$/i })
    ).toBeInTheDocument();

    // Session persisted
    expect(localStorage.getItem("auth_token")).toBe("token123");
    expect(localStorage.getItem("user_type")).toBe("User");
  });
});
