import { Outlet } from "react-router-dom";

export default function AppShell() {
  return (
    <div>
      {/* Shell (navbar/side nav) will go here later */}
      <Outlet />
    </div>
  );
}
