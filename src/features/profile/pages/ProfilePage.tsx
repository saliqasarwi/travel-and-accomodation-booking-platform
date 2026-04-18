import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  getProfile,
  updateProfile,
  type UserProfile,
} from "../api/profile.api";
import { useTranslation } from "react-i18next";

export default function ProfilePage() {
  const { t } = useTranslation();
  const [, setProfile] = useState<UserProfile>();
  const [form, setForm] = useState<UserProfile>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        setErrorMessage("");
        const data = await getProfile();
        setProfile(data);
        setForm(data);
      } catch (error) {
        console.error(error);
        setErrorMessage(t("profile.loadFailed"));
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [t]);

  const handleChange =
    (field: keyof UserProfile) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!form) return;
      setForm({
        ...form,
        [field]: event.target.value,
      });
    };

  async function handleSave() {
    if (!form) return;

    try {
      setSaving(true);
      setErrorMessage("");
      setSuccessMessage("");

      const updated = await updateProfile({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        country: form.country,
        city: form.city,
      });

      setProfile(updated);
      setForm(updated);
      setSuccessMessage(t("profile.updatedSuccessfully"));
    } catch (error) {
      console.error(error);
      setErrorMessage(t("profile.updateFailed"));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Box sx={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!form) {
    return <Alert severity="error">{t("profile.loadFailed")}</Alert>;
  }

  return (
    <Stack
      spacing={3}
      sx={{
        px: { xs: 2, md: 4, lg: 6 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2rem", md: "2.5rem" },
            lineHeight: 1.05,
            background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 0.75,
          }}
        >
          {t("profile.title")}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {t("profile.subtitle")}
        </Typography>

        <Box
          sx={{
            width: 72,
            height: 4,
            borderRadius: 999,
            background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
          }}
        />
      </Box>

      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Box
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        }}
      >
        <Stack spacing={2.5}>
          <Typography variant="h6" fontWeight={800}>
            {t("confirmation.guestInformation")}
          </Typography>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label={t("profile.firstName")}
              value={form.firstName ?? ""}
              onChange={handleChange("firstName")}
              fullWidth
              size="small"
            />
            <TextField
              label={t("profile.lastName")}
              value={form.lastName ?? ""}
              onChange={handleChange("lastName")}
              fullWidth
              size="small"
            />
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label={t("profile.email")}
              value={form.email ?? ""}
              onChange={handleChange("email")}
              fullWidth
              size="small"
            />
            <TextField
              label={t("profile.phone")}
              value={form.phone ?? ""}
              onChange={handleChange("phone")}
              fullWidth
              size="small"
            />
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label={t("admin.country")}
              value={form.country ?? ""}
              onChange={handleChange("country")}
              fullWidth
              size="small"
            />
            <TextField
              label={t("profile.city")}
              value={form.city ?? ""}
              onChange={handleChange("city")}
              fullWidth
              size="small"
            />
          </Stack>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={saving}
              sx={{
                minWidth: 180,
                fontWeight: 700,
                borderRadius: 2,
              }}
            >
              {saving ? t("common.loading") : t("profile.saveChanges")}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
