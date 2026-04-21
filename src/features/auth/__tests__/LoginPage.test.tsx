import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LoginPage from "../pages/LoginPage";

const mockNavigate = vi.fn();
const mockSetSession = vi.fn();
const mockAuthenticate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      state: null,
    }),
  };
});

vi.mock("@app/providers/AuthContext", () => ({
  useAuth: () => ({
    setSession: mockSetSession,
  }),
}));

vi.mock("../api/auth.api", () => ({
  authenticate: (...args: unknown[]) => mockAuthenticate(...args),
}));

vi.mock("@shared/api", () => ({
  parseApiError: (error: unknown) => ({
    message: error instanceof Error ? error.message : "Something went wrong",
  }),
}));

vi.mock("@shared/components/SplashScreen", () => ({
  default: () => <div>Splash Screen</div>,
}));

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders splash screen initially", () => {
    vi.useFakeTimers();

    render(<LoginPage />);

    expect(screen.getByText("Splash Screen")).toBeInTheDocument();
  });

  it("renders login page content after splash timeout", () => {
    vi.useFakeTimers();

    render(<LoginPage />);

    act(() => {
      vi.advanceTimersByTime(1800);
    });

    expect(screen.getByText("Welcome back")).toBeInTheDocument();
    expect(
      screen.getByText("Discover stays worth remembering")
    ).toBeInTheDocument();
  });

  it("logs in admin user and navigates to /admin", async () => {
    vi.useFakeTimers();

    mockAuthenticate.mockResolvedValue({
      authentication: "token-123",
      userType: "Admin",
    });

    render(<LoginPage />);

    act(() => {
      vi.advanceTimersByTime(1800);
    });

    vi.useRealTimers();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), "admin");
    await user.type(screen.getByLabelText(/password/i), "1234");
    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockAuthenticate).toHaveBeenCalledWith({
        userName: "admin",
        password: "1234",
      });
    });

    expect(mockSetSession).toHaveBeenCalledWith("token-123", "Admin");
    expect(mockNavigate).toHaveBeenCalledWith("/admin", { replace: true });
  });

  it("logs in normal user and navigates to home", async () => {
    vi.useFakeTimers();

    mockAuthenticate.mockResolvedValue({
      authentication: "token-456",
      userType: "User",
    });

    render(<LoginPage />);

    act(() => {
      vi.advanceTimersByTime(1800);
    });

    vi.useRealTimers();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), "user");
    await user.type(screen.getByLabelText(/password/i), "1234");
    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockAuthenticate).toHaveBeenCalledWith({
        userName: "user",
        password: "1234",
      });
    });

    expect(mockSetSession).toHaveBeenCalledWith("token-456", "User");
    expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
  });

  it("shows API error when login fails", async () => {
    vi.useFakeTimers();

    mockAuthenticate.mockRejectedValue(new Error("Invalid credentials"));

    render(<LoginPage />);

    act(() => {
      vi.advanceTimersByTime(1800);
    });

    vi.useRealTimers();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), "wrong");
    await user.type(screen.getByLabelText(/password/i), "wrong");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
    expect(mockSetSession).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
