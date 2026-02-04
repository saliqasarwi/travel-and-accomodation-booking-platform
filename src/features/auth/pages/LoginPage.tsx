import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseApiError } from "@shared/api";
import { setAuthSession } from "../utils/authStorage";
import LoginForm from "../components/LoginForm";
import { authenticate } from "../api/auth.api";
export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function handleSubmit(values: { userName: string; password: string }) {
    setError(null);
    setLoading(true);
    try {
      const res = await authenticate(values);
      setAuthSession(res.authentication, res.userType);
      navigate(res.userType === "Admin" ? "/admin" : "/");
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
