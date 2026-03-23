import { Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import type { SpecialRequests } from "../types/checkout.types";
import type { FormikErrors, FormikTouched } from "formik";

type Props = {
  value: SpecialRequests;
  onChange: (next: SpecialRequests) => void;
  errors?: FormikErrors<SpecialRequests>;
  touched?: FormikTouched<SpecialRequests>;
  onBlur?: (e: React.FocusEvent) => void;
};

export default function SpecialRequestsStep({
  value,
  onChange,
  errors = {},
  touched = {},
  onBlur,
}: Props) {
  const fieldError = (field: keyof SpecialRequests) =>
    touched[field] ? (errors[field] as string | undefined) : undefined;

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
              Special requests
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Let the hotel know about any special needs or remarks.
            </Typography>
          </Stack>

          <TextField
            name="specialRequests.notes"
            fullWidth
            multiline
            minRows={3}
            placeholder="Add your special requests..."
            value={value.notes}
            onChange={(e) => onChange({ ...value, notes: e.target.value })}
            onBlur={onBlur}
            error={!!fieldError("notes")}
            helperText={fieldError("notes")}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
