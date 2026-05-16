import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SpecialRequestsStep from "../components/SpecialRequestsStep";
import type { SpecialRequests } from "../types/checkout.types";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "checkout.specialRequests": "Special requests",
        "checkout.specialRequestsHint": "Tell us anything important",
        "checkout.specialRequestsPlaceholder": "Write your notes",
      };

      return translations[key] ?? key;
    },
  }),
}));

const value: SpecialRequests = {
  notes: "Late check-in please",
};

describe("SpecialRequestsStep", () => {
  it("renders special requests field", () => {
    render(<SpecialRequestsStep value={value} onChange={vi.fn()} />);

    expect(screen.getByText("Special requests")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Write your notes")).toHaveValue(
      "Late check-in please"
    );
  });

  it("calls onChange when notes change", () => {
    const onChange = vi.fn();

    render(<SpecialRequestsStep value={value} onChange={onChange} />);

    fireEvent.change(screen.getByPlaceholderText("Write your notes"), {
      target: { value: "Need quiet room" },
    });

    expect(onChange).toHaveBeenCalledWith({
      notes: "Need quiet room",
    });
  });

  it("shows touched notes error", () => {
    render(
      <SpecialRequestsStep
        value={value}
        onChange={vi.fn()}
        errors={{ notes: "Too long" }}
        touched={{ notes: true }}
      />
    );

    expect(screen.getByText("Too long")).toBeInTheDocument();
  });

  it("does not show untouched notes error", () => {
    render(
      <SpecialRequestsStep
        value={value}
        onChange={vi.fn()}
        errors={{ notes: "Too long" }}
        touched={{ notes: false }}
      />
    );

    expect(screen.queryByText("Too long")).not.toBeInTheDocument();
  });

  it("calls onBlur when notes field loses focus", () => {
    const onBlur = vi.fn();

    render(
      <SpecialRequestsStep value={value} onChange={vi.fn()} onBlur={onBlur} />
    );

    fireEvent.blur(screen.getByPlaceholderText("Write your notes"));

    expect(onBlur).toHaveBeenCalled();
  });
});
