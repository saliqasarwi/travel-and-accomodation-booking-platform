import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCart } from "../useCart";

describe("useCart", () => {
  it("throws error when used outside CartProvider", () => {
    expect(() => renderHook(() => useCart())).toThrow(
      "useCart must be used within CartProvider"
    );
  });
});
