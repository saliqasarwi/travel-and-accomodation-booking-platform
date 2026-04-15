import { Card, CardContent, Stack, Typography, TextField } from "@mui/material";
import type { GuestInfo } from "../types/checkout.types";
import type { FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "react-i18next";

type Props = {
  value: GuestInfo;
  onChange: (value: GuestInfo) => void;
  errors?: FormikErrors<GuestInfo>;
  touched?: FormikTouched<GuestInfo>;
  onBlur?: (e: React.FocusEvent) => void;
};

export default function GuestInfoStep({
  value,
  onChange,
  errors = {},
  touched = {},
  onBlur,
}: Props) {
  const { t } = useTranslation();

  const fieldError = (field: keyof GuestInfo) =>
    touched[field] ? errors[field] : undefined;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="h6" fontWeight={800}>
              {t("checkout.guestInformation")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("checkout.guestInformationHint")}
            </Typography>
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              name="guestInfo.firstName"
              label={t("checkout.firstName")}
              size="small"
              value={value.firstName}
              onChange={(e) =>
                onChange({ ...value, firstName: e.target.value })
              }
              onBlur={onBlur}
              error={!!fieldError("firstName")}
              helperText={fieldError("firstName")}
              fullWidth
              required
            />

            <TextField
              name="guestInfo.lastName"
              label={t("checkout.lastName")}
              size="small"
              value={value.lastName}
              onChange={(e) => onChange({ ...value, lastName: e.target.value })}
              onBlur={onBlur}
              error={!!fieldError("lastName")}
              helperText={fieldError("lastName")}
              fullWidth
              required
            />
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              name="guestInfo.email"
              label={t("checkout.email")}
              size="small"
              value={value.email}
              onChange={(e) => onChange({ ...value, email: e.target.value })}
              onBlur={onBlur}
              error={!!fieldError("email")}
              helperText={fieldError("email")}
              fullWidth
              required
            />

            <TextField
              name="guestInfo.phone"
              label={t("checkout.phone")}
              size="small"
              value={value.phone}
              onChange={(e) => onChange({ ...value, phone: e.target.value })}
              onBlur={onBlur}
              error={!!fieldError("phone")}
              helperText={fieldError("phone")}
              fullWidth
              required
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
