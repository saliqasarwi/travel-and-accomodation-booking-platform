import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@app/providers/AuthContext";

export default function RequireAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, userType } = useAuth();
  const location = useLocation();

  // Not logged in -> go login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Logged in but not admin -> go home
  if (userType !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
