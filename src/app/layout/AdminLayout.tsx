import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@app/providers/AuthContext";
const linkStyle: React.CSSProperties = {
  display: "block",
  padding: "0.75rem 1rem",
  textDecoration: "none",
  color: "#111",
};

const activeLinkStyle: React.CSSProperties = {
  ...linkStyle,
  fontWeight: 700,
  background: "#f2f2f2",
};

export default function AdminLayout() {
  const { userType, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 240, borderRight: "1px solid #ddd" }}>
        <div style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
          <h3>Admin</h3>
          <p>
            Role: <b>{userType}</b>
          </p>
        </div>
        <nav
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <NavLink
            to="/admin/cities"
            style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
          >
            Manage Cities
          </NavLink>

          <NavLink
            to="/admin/hotels"
            style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
          >
            Manage Hotels
          </NavLink>

          <NavLink
            to="/admin/rooms"
            style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
          >
            Manage Rooms
          </NavLink>
        </nav>
        <button
          style={{ marginTop: "1rem", marginLeft: "10%" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      <main style={{ flex: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
