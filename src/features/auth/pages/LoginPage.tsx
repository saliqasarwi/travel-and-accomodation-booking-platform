import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Paper, Typography, Stack } from "@mui/material";
import { parseApiError } from "@shared/api";
import { useAuth } from "@app/providers/AuthContext";
import LoginForm from "../components/LoginForm";
import { authenticate } from "../api/auth.api";
import { useEffect } from "react";
import SplashScreen from "@shared/components/SplashScreen";
export default function LoginPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const fromPath =
    (location.state as { from?: Location })?.from?.pathname ?? null;

  async function handleSubmit(values: { userName: string; password: string }) {
    setError(null);
    setLoading(true);

    try {
      const res = await authenticate(values);
      setSession(res.authentication, res.userType);

      const isAdmin = res.userType === "Admin";

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
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);
  if (showSplash) {
    return <SplashScreen />;
  }
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 3, md: 6 },
        py: 4,
        backgroundImage:
          'linear-gradient(rgba(8, 20, 40, 0.45), rgba(8, 20, 40, 0.62)), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 4, md: 8 },
        }}
      >
        <Stack
          spacing={2}
          sx={{
            color: "#fff",
            maxWidth: 500,
            textAlign: { xs: "center", md: "left" },
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <Typography
            variant="overline"
            sx={{
              letterSpacing: 3,
              fontWeight: 700,
              opacity: 0.95,
              fontSize: "0.95rem",
            }}
          >
            Travelio
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              lineHeight: 1.05,
              fontSize: { xs: "2.2rem", sm: "2.8rem", md: "4rem" },
              maxWidth: 460,
              textWrap: "balance",
            }}
          >
            Discover stays worth remembering
          </Typography>

          <Typography
            variant="h6"
            sx={{
              opacity: 0.92,
              fontWeight: 400,
              lineHeight: 1.7,
              maxWidth: 460,
              fontSize: { xs: "1rem", md: "1.15rem" },
            }}
          >
            Sign in to manage your bookings and enjoy a smoother travelio
            experience.
          </Typography>
        </Stack>

        <Paper
          elevation={2}
          sx={{
            width: "100%",
            maxWidth: 480,
            p: { xs: 3, sm: 4 },
            borderRadius: 6,
            boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
            backgroundColor: "rgba(255,255,255,0.94)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.35)",
          }}
        >
          <Stack spacing={1.5} sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant="overline"
              sx={{
                letterSpacing: 2,
                color: "primary.main",
                fontWeight: 700,
                fontSize: "1.5rem",
              }}
            >
              Travelio
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2rem", sm: "2.4rem" },
              }}
            >
              Welcome back
            </Typography>
          </Stack>

          <LoginForm
            onSubmit={handleSubmit}
            isLoading={loading}
            error={error}
          />
        </Paper>
      </Box>
    </Box>
  );
}
