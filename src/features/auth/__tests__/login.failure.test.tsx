import { describe, expect, it, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { AxiosError } from "axios";
import { renderAuthApp } from "@features/auth/test/renderAuthApp";

vi.mock("@features/auth/api/auth.api", () => ({
  authenticate: vi.fn(),
}));

import { authenticate } from "@features/auth/api/auth.api";

describe("Login - failure", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("shows error message when authentication fails", async () => {
    const axiosError = new AxiosError(
      "Request failed with status code 401",
      undefined,
      undefined,
      undefined,
      {
        status: 401,
        statusText: "Unauthorized",
        headers: {},
        config: {} as import("axios").InternalAxiosRequestConfig,
        data: { message: "Invalid user or password" },
      }
    );
    (authenticate as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      axiosError
    );

    renderAuthApp("/login");

    await userEvent.type(screen.getByLabelText(/username/i), "bad");
    await userEvent.type(screen.getByLabelText(/password/i), "bad");
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    // Error shown
    screen.debug();
    expect(
      await screen.findByText(/invalid user or password/i)
    ).toBeInTheDocument();

    // No session stored
    expect(localStorage.getItem("auth_token")).toBeNull();
    expect(localStorage.getItem("user_type")).toBeNull();

    // Still on login (button still exists)
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });
});
