import { Outlet, Link } from "react-router-dom";

export function TestUserLayout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export function Home() {
  return <h1>Home</h1>;
}

export function Admin() {
  return <h1>Admin</h1>;
}
