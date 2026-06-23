import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { CartProvider } from "../CartProvider";
import { useCart } from "../useCart";
//component for testing
function TestConsumer() {
  const { state, totalItems, addItem, removeItem, clearCart } = useCart();

  const item = {
    hotelId: 1,
    hotelName: "Cinema Hotel",
    cityName: "Jenin",
    starRating: 5,
    roomType: "Deluxe",
    roomPhotoUrl: "/room.jpg",
    checkInDate: "2026-04-22",
    checkOutDate: "2026-04-25",
    adults: 2,
    children: 1,
    numberOfRooms: 1,
    pricePerNight: 150,
    discount: 0,
  };

  return (
    <div>
      <p>Total items: {totalItems}</p>
      <p>Items length: {state.items.length}</p>

      <button onClick={() => addItem(item)}>Add item</button>
      <button
        onClick={
          () => removeItem("1|Deluxe|2026-04-22|2026-04-25|2|1|1") //id
        }
      >
        Remove item
      </button>
      <button onClick={clearCart}>Clear cart</button>

      {state.items.map((cartItem) => (
        <p key={cartItem.id}>{cartItem.hotelName}</p>
      ))}
    </div>
  );
}

function renderProvider() {
  return render(
    <CartProvider>
      <TestConsumer />
    </CartProvider>
  );
}

describe("CartProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with empty cart", () => {
    renderProvider();

    expect(screen.getByText("Total items: 0")).toBeInTheDocument();
    expect(screen.getByText("Items length: 0")).toBeInTheDocument();
  });

  it("adds item to cart", () => {
    renderProvider();

    fireEvent.click(screen.getByRole("button", { name: "Add item" }));

    expect(screen.getByText("Total items: 1")).toBeInTheDocument();
    expect(screen.getByText("Cinema Hotel")).toBeInTheDocument();
  });

  it("does not add duplicate item", () => {
    renderProvider();

    fireEvent.click(screen.getByRole("button", { name: "Add item" }));
    fireEvent.click(screen.getByRole("button", { name: "Add item" }));

    expect(screen.getByText("Total items: 1")).toBeInTheDocument();
  });

  it("removes item from cart", () => {
    renderProvider();

    fireEvent.click(screen.getByRole("button", { name: "Add item" }));
    fireEvent.click(screen.getByRole("button", { name: "Remove item" }));

    expect(screen.getByText("Total items: 0")).toBeInTheDocument();
    expect(screen.queryByText("Cinema Hotel")).not.toBeInTheDocument();
  });

  it("loads initial state from localStorage", () => {
    localStorage.setItem(
      "travel_cart_v1",
      JSON.stringify({
        items: [
          {
            id: "saved-item",
            hotelId: 2,
            hotelName: "Saved Hotel",
            cityName: "Nablus",
            starRating: 4,
            roomType: "Standard",
            checkInDate: "2026-04-22",
            checkOutDate: "2026-04-25",
            adults: 2,
            children: 0,
            numberOfRooms: 1,
            pricePerNight: 100,
          },
        ],
      })
    );

    renderProvider();

    expect(screen.getByText("Total items: 1")).toBeInTheDocument();
    expect(screen.getByText("Saved Hotel")).toBeInTheDocument();
  });
});
