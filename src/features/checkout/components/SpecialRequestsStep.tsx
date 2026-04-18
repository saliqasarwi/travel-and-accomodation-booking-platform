import { Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import type { SpecialRequests } from "../types/checkout.types";
import type { FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
              {t("checkout.specialRequests")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("checkout.specialRequestsHint")}
            </Typography>
          </Stack>

          <TextField
            name="specialRequests.notes"
            fullWidth
            multiline
            minRows={3}
            placeholder={t("checkout.specialRequestsPlaceholder")}
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
