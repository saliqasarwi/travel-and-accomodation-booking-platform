import { NavLink, Outlet } from "react-router-dom";

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
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 240, borderRight: "1px solid #ddd" }}>
        <div style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
          <strong>Admin</strong>
        </div>

        <nav>
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
      </aside>

      <main style={{ flex: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
