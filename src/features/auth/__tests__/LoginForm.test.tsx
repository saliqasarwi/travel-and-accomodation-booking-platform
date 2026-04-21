import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import LoginForm from "../components/LoginForm";

describe("LoginForm", () => {
  it("renders username, password, and login button", () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup();

    render(<LoginForm onSubmit={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText("Username is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  it("updates input values when typing", async () => {
    const user = userEvent.setup();

    render(<LoginForm onSubmit={vi.fn()} />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(usernameInput, "admin");
    await user.type(passwordInput, "1234");

    expect(usernameInput).toHaveValue("admin");
    expect(passwordInput).toHaveValue("1234");
  });

  it("calls onSubmit with entered values", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/username/i), "admin");
    await user.type(screen.getByLabelText(/password/i), "1234");
    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        userName: "admin",
        password: "1234",
      });
    });
  });

  it("shows external error message when provided", () => {
    render(<LoginForm onSubmit={vi.fn()} error="Invalid credentials" />);

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("shows loading text and disables button when isLoading is true", () => {
    render(<LoginForm onSubmit={vi.fn()} isLoading />);

    const button = screen.getByRole("button", { name: /signing in/i });

    expect(button).toBeDisabled();
    expect(button).toBeInTheDocument();
  });

  it("disables submit button while submitting", async () => {
    const user = userEvent.setup();

    const onSubmit = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          setTimeout(resolve, 100);
        })
    );

    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/username/i), "admin");
    await user.type(screen.getByLabelText(/password/i), "1234");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled();
  });
});
