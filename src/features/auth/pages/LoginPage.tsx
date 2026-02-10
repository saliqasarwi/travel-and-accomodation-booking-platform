import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { parseApiError } from "@shared/api";
import { useAuth } from "@app/providers/AuthContext";
import LoginForm from "../components/LoginForm";
import { authenticate } from "../api/auth.api";
import { Container, Paper, Typography, Box } from "@mui/material";
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
      const isAdmin = res.userType === "Admin";
      //  role-based redirect + return-to
      if (isAdmin) {
        navigate(fromPath?.startsWith("/admin") ? fromPath : "/admin", {
          replace: true,
        });
      } else {
        navigate(fromPath ?? "/", { replace: true });
      }
    } catch (e) {
      setError(parseApiError(e).message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Login
        </Typography>

        <Box>
          <LoginForm
            onSubmit={handleSubmit}
            isLoading={loading}
            error={error}
          />
        </Box>
      </Paper>
    </Container>
  );
}
