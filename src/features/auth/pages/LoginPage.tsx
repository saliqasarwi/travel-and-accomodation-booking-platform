import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { login } from "../api/auth.api";
import { parseApiError } from "@shared/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function handleSubmit(values: { userName: string; password: string }) {
    setError(null);
    setLoading(true);
    try {
      const res = await login(values);
      localStorage.setItem("auth_token", res.authentication);
      localStorage.setItem("user_type", res.userType);
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
