import { Card, CardContent, Stack, Typography, TextField } from "@mui/material";
import type { GuestInfo } from "../types/checkout.types";
import type { FormikErrors, FormikTouched } from "formik";

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
  const fieldError = (field: keyof GuestInfo) =>
    touched[field] ? errors[field] : undefined;

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack spacing={3}>
          <Stack spacing={0.5}>
            <Typography variant="h6" fontWeight={800}>
              Guest information
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please enter the primary guest details.
            </Typography>
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              name="guestInfo.firstName"
              label="First name"
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
              label="Last name"
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
              label="Email"
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
              label="Phone number"
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
