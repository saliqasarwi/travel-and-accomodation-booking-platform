import { Outlet, Link } from "react-router-dom";

export default function UserLayout() {
  return (
    <div>
      <header style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
        <nav style={{ display: "flex", gap: "1rem" }}>
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/checkout">Checkout</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
