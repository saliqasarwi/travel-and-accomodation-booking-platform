import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HotelGallery from "../components/HotelGallery";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => {
      if (key === "hotel.hotelMainImageAlt") return "Hotel main image";
      if (key === "hotel.thumbnailAlt") return `Thumbnail ${options?.index}`;
      if (key === "hotel.hotelImageAlt") return `Hotel image ${options?.index}`;
      return key;
    },
  }),
}));

const galleryItems = [
  { url: "/hotel-1.jpg" },
  { url: "/hotel-2.jpg" },
  { url: "/hotel-3.jpg" },
];

describe("HotelGallery", () => {
  it("renders main image and thumbnails", () => {
    render(<HotelGallery items={galleryItems} />);

    expect(screen.getByAltText("Hotel main image")).toBeInTheDocument();
    expect(screen.getByAltText("Thumbnail 1")).toBeInTheDocument();
    expect(screen.getByAltText("Thumbnail 2")).toBeInTheDocument();
    expect(screen.getByAltText("Thumbnail 3")).toBeInTheDocument();
  });

  it("changes main image when thumbnail is clicked", () => {
    render(<HotelGallery items={galleryItems} />);

    fireEvent.click(screen.getByAltText("Thumbnail 2"));

    expect(screen.getByAltText("Hotel main image")).toHaveAttribute(
      "src",
      "/hotel-2.jpg"
    );
  });

  it("opens dialog when main image is clicked", () => {
    render(<HotelGallery items={galleryItems} />);

    fireEvent.click(screen.getByAltText("Hotel main image"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByAltText("Hotel image 1")).toBeInTheDocument();
  });

  it("closes dialog when close button is clicked", async () => {
    render(<HotelGallery items={galleryItems} />);

    fireEvent.click(screen.getByAltText("Hotel main image"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
  });

  it("goes to next image when next button is clicked", () => {
    render(<HotelGallery items={galleryItems} />);

    fireEvent.click(screen.getByAltText("Hotel main image"));

    const buttons = screen.getAllByRole("button");
    const nextButton = buttons[2];

    fireEvent.click(nextButton);

    expect(screen.getByAltText("Hotel image 2")).toHaveAttribute(
      "src",
      "/hotel-2.jpg"
    );
  });

  it("goes to previous image and wraps to last image", () => {
    render(<HotelGallery items={galleryItems} />);

    fireEvent.click(screen.getByAltText("Hotel main image"));

    const buttons = screen.getAllByRole("button");
    const previousButton = buttons[1];

    fireEvent.click(previousButton);

    expect(screen.getByAltText("Hotel image 3")).toHaveAttribute(
      "src",
      "/hotel-3.jpg"
    );
  });

  it("handles keyboard navigation inside dialog", () => {
    render(<HotelGallery items={galleryItems} />);

    fireEvent.click(screen.getByAltText("Hotel main image"));

    fireEvent.keyDown(window, { key: "ArrowRight" });

    expect(screen.getByAltText("Hotel image 2")).toHaveAttribute(
      "src",
      "/hotel-2.jpg"
    );

    fireEvent.keyDown(window, { key: "ArrowLeft" });

    expect(screen.getByAltText("Hotel image 1")).toHaveAttribute(
      "src",
      "/hotel-1.jpg"
    );
  });

  it("closes dialog when Escape key is pressed", async () => {
    render(<HotelGallery items={galleryItems} />);

    fireEvent.click(screen.getByAltText("Hotel main image"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
  });
  it("does not render navigation buttons when there is only one image", () => {
    render(<HotelGallery items={[{ url: "/hotel-1.jpg" }]} />);

    fireEvent.click(screen.getByAltText("Hotel main image"));

    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(1);
  });
});
