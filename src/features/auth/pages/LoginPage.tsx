import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { parseApiError } from "@shared/api";
import { useAuth } from "@app/providers/AuthContext";
import LoginForm from "../components/LoginForm";
import { authenticate } from "../api/auth.api";
export default function LoginPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // if redirected here, I store where the user wanted to go
  const fromPath =
    (location.state as { from?: Location })?.from?.pathname ?? null;
  async function handleSubmit(values: { userName: string; password: string }) {
    setError(null);
    setLoading(true);
    try {
      const res = await authenticate(values);
      setSession(res.authentication, res.userType);
      //  role-based redirect + return-to
      if (fromPath) {
        navigate(fromPath, { replace: true });
      } else {
        navigate(res.userType === "Admin" ? "/admin" : "/", { replace: true });
      }
    } catch (e) {
      setError(parseApiError(e).message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={handleSubmit} isLoading={loading} error={error} />
    </div>
  );
}
