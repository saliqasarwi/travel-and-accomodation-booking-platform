import { render, screen } from "@testing-library/react";
import App from "@app/App";

test("renders home page heading", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /^home$/i })).toBeInTheDocument();
});
