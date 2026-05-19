import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CheckoutPage from "../pages/CheckoutPage";
import type { CartItem } from "@features/cart/types/cart.types";

const mocks = vi.hoisted(() => ({
  navigate: vi.fn(),
  clearCart: vi.fn(),
  createBooking: vi.fn(),
  validateStep: vi.fn(),
  consoleError: vi.fn(),
}));

let mockItems: CartItem[] = [];

vi.mock("react-router-dom", () => ({
  useNavigate: () => mocks.navigate,
}));

vi.mock("@features/cart/useCart", () => ({
  useCart: () => ({
    state: {
      items: mockItems,
    },
    clearCart: mocks.clearCart,
  }),
}));

vi.mock("../api/checkout.api", () => ({
  createBooking: (...args: unknown[]) => mocks.createBooking(...args),
}));

vi.mock("../validation/checkoutSchemas", () => ({
  getStepSchema: () => ({
    validate: (...args: unknown[]) => mocks.validateStep(...args),
  }),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "checkout.emptyCart": "Your cart is empty",
        "checkout.confirmBooking": "Confirm booking",
        "checkout.confirmBookingMessage":
          "Are you sure you want to confirm this booking?",
        "checkout.back": "Back",
        "checkout.next": "Next",
        "common.cancel": "Cancel",
      };

      return translations[key] ?? key;
    },
  }),
}));

vi.mock("../components/CheckoutHeader", () => ({
  default: () => <div>Checkout Header</div>,
}));

vi.mock("../components/CheckoutStepper", () => ({
  default: ({ activeStep }: { activeStep: number }) => (
    <div>Checkout Stepper: {activeStep}</div>
  ),
}));

vi.mock("../components/BookingSummaryCard", () => ({
  default: () => <div>Booking Summary Card</div>,
}));

vi.mock("../components/CheckoutStepContent", () => ({
  default: ({ activeStep }: { activeStep: number }) => (
    <div>Checkout Step Content: {activeStep}</div>
  ),
}));

vi.mock("@shared/components/ConfirmActionDialog", () => ({
  default: ({
    open,
    title,
    message,
    confirmText,
    cancelText,
    onClose,
    onConfirm,
  }: {
    open: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onClose: () => void;
    onConfirm: () => void;
  }) =>
    open ? (
      <div role="dialog">
        <p>{title}</p>
        <p>{message}</p>
        <button data-testid="confirm-dialog-confirm" onClick={onConfirm}>
          {confirmText}
        </button>
        <button data-testid="confirm-dialog-cancel" onClick={onClose}>
          {cancelText}
        </button>
      </div>
    ) : null,
}));

const cartItemMock: CartItem = {
  id: "item-1",
  hotelId: 1,
  hotelName: "Cinema Hotel",
  cityName: "Jenin",
  starRating: 5,
  roomType: "Deluxe Room",
  roomPhotoUrl: "/room.jpg",
  checkInDate: "2026-04-22",
  checkOutDate: "2026-04-25",
  adults: 2,
  children: 1,
  numberOfRooms: 2,
  pricePerNight: 100,
  discount: 0,
};

describe("CheckoutPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockItems = [cartItemMock];

    mocks.validateStep.mockResolvedValue({});
    mocks.createBooking.mockResolvedValue({
      bookingId: 123,
      confirmationNumber: "CONF-123",
    });
  });

  it("renders empty cart warning when cart has no items", () => {
    mockItems = [];

    render(<CheckoutPage />);

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(screen.queryByText("Checkout Header")).not.toBeInTheDocument();
  });

  it("renders checkout layout when cart has items", () => {
    render(<CheckoutPage />);

    expect(screen.getByText("Checkout Header")).toBeInTheDocument();
    expect(screen.getByText("Checkout Stepper: 0")).toBeInTheDocument();
    expect(screen.getByText("Checkout Step Content: 0")).toBeInTheDocument();
    expect(screen.getByText("Booking Summary Card")).toBeInTheDocument();
  });

  it("moves to next steps when validation passes", async () => {
    render(<CheckoutPage />);

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(screen.getByText("Checkout Stepper: 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(screen.getByText("Checkout Stepper: 2")).toBeInTheDocument();
    });
  });

  it("does not move to next step when validation fails", async () => {
    const validationError = new Error("Validation failed");
    validationError.name = "ValidationError";
    Object.assign(validationError, {
      inner: [{ path: "field", message: "Required" }],
    });
    mocks.validateStep.mockRejectedValue(validationError);

    render(<CheckoutPage />);

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(screen.getByText("Checkout Stepper: 0")).toBeInTheDocument();
    });
  });

  it("goes back to previous step", async () => {
    render(<CheckoutPage />);

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(screen.getByText("Checkout Stepper: 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Back" }));

    await waitFor(() => {
      expect(screen.getByText("Checkout Stepper: 0")).toBeInTheDocument();
    });
  });

  it("opens confirm dialog on last step", async () => {
    render(<CheckoutPage />);

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(screen.getByText("Checkout Stepper: 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(screen.getByText("Checkout Stepper: 2")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Confirm booking" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to confirm this booking?")
    ).toBeInTheDocument();
  });

  it("closes confirm dialog when cancel is clicked", async () => {
    render(<CheckoutPage />);

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(screen.getByText("Checkout Stepper: 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(screen.getByText("Checkout Stepper: 2")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Confirm booking" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("confirm-dialog-cancel"));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("creates booking, clears cart, and navigates to confirmation page", async () => {
    render(<CheckoutPage />);

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(screen.getByText("Checkout Stepper: 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(screen.getByText("Checkout Stepper: 2")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Confirm booking" }));
    fireEvent.click(screen.getByTestId("confirm-dialog-confirm"));

    await waitFor(() => {
      expect(mocks.createBooking).toHaveBeenCalledWith({
        guestInfo: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        },
        paymentInfo: {
          method: "credit_card",
          cardNumber: "",
          expiry: "",
          cvv: "",
          cardholderName: "",
        },
        specialRequests: {
          notes: "",
        },
        items: [cartItemMock],
      });
    });

    expect(mocks.clearCart).toHaveBeenCalled();
    expect(mocks.navigate).toHaveBeenCalledWith("/confirmation/123");
  });

  it("logs error when booking creation fails", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(mocks.consoleError);

    mocks.createBooking.mockRejectedValue(new Error("Create booking failed"));

    render(<CheckoutPage />);

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(screen.getByText("Checkout Stepper: 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(screen.getByText("Checkout Stepper: 2")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Confirm booking" }));
    fireEvent.click(screen.getByTestId("confirm-dialog-confirm"));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    expect(mocks.clearCart).not.toHaveBeenCalled();
    expect(mocks.navigate).not.toHaveBeenCalledWith("/confirmation/123");

    consoleErrorSpy.mockRestore();
  });
});
