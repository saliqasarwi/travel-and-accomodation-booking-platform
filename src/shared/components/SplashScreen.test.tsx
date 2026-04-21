import type React from "react";
import { render, screen, act, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import TravelSplash from "./SplashScreen";

vi.mock("@mui/material", async () => {
  const actual =
    await vi.importActual<typeof import("@mui/material")>("@mui/material");

  return {
    ...actual,
    Fade: ({
      in: inProp,
      children,
    }: {
      in: boolean;
      children: React.ReactNode;
    }) => (inProp ? <>{children}</> : null),
  };
});

describe("TravelSplash", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    cleanup();
  });

  it("renders the splash content initially", () => {
    render(<TravelSplash />);

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByText("Travelio")).toBeInTheDocument();
  });

  it("keeps the splash visible before 5 seconds", () => {
    render(<TravelSplash />);

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.getByText("Travelio")).toBeInTheDocument();
  });

  it("hides the splash after 5 seconds", () => {
    render(<TravelSplash />);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.queryByText("Travelio")).not.toBeInTheDocument();
  });

  it("clears timers on unmount", () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout");

    const { unmount } = render(<TravelSplash />);

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearTimeoutSpy.mockRestore();
  });
});
