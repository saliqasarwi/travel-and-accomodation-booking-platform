import { Card, CardContent, Stack, Typography, TextField } from "@mui/material";
import type { GuestInfo } from "../types/checkout.types";

type Props = {
  value: GuestInfo;
  onChange: (value: GuestInfo) => void;
};

export default function GuestInfoStep({ value, onChange }: Props) {
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
              label="First name"
              value={value.firstName}
              onChange={(e) =>
                onChange({ ...value, firstName: e.target.value })
              }
              fullWidth
              required
            />

            <TextField
              label="Last name"
              value={value.lastName}
              onChange={(e) => onChange({ ...value, lastName: e.target.value })}
              fullWidth
              required
            />
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="Email"
              value={value.email}
              onChange={(e) => onChange({ ...value, email: e.target.value })}
              fullWidth
              required
            />

            <TextField
              label="Phone number"
              value={value.phone}
              onChange={(e) => onChange({ ...value, phone: e.target.value })}
              fullWidth
              required
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
