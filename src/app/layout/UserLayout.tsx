import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@app/providers/AuthContext";
export default function UserLayout() {
  const { isAuthenticated, userType, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }
  return (
    <div>
      <header style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
        <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/checkout">Checkout</Link>
          <div>
            {isAuthenticated ? (
              <>
                <span>
                  Role: <b>{userType}</b>
                </span>
                <button onClick={handleLogout} style={{ marginLeft: "5px" }}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </nav>
      </header>

      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
