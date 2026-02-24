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
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
      }}
    >
      <CardContent>
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
            minRows={4}
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
