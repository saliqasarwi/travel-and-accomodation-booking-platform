import {
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Box,
} from "@mui/material";
import type { PaymentInfo, PaymentMethod } from "../types/checkout.types";
import type { FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "react-i18next";

type Props = {
  value: PaymentInfo;
  onChange: (next: PaymentInfo) => void;
  errors?: FormikErrors<PaymentInfo>;
  touched?: FormikTouched<PaymentInfo>;
  onBlur?: (e: React.FocusEvent) => void;
};

export default function PaymentStep({
  value,
  onChange,
  errors = {},
  touched = {},
  onBlur,
}: Props) {
  const { t } = useTranslation();

  const setField = <K extends keyof PaymentInfo>(
    key: K,
    nextValue: PaymentInfo[K]
  ) => {
    onChange({ ...value, [key]: nextValue });
  };

  const handleMethodChange = (method: PaymentMethod) => {
    onChange({ ...value, method });
  };

  const fieldError = (field: keyof PaymentInfo) =>
    touched[field] ? (errors[field] as string | undefined) : undefined;

  const isCard = value.method === "credit_card";

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
              {t("checkout.paymentMethod")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("checkout.paymentMethodHint")}
            </Typography>
          </Stack>

          <Divider />

          <RadioGroup
            value={value.method}
            onChange={(e) =>
              handleMethodChange(e.target.value as PaymentMethod)
            }
          >
            <FormControlLabel
              value="credit_card"
              control={<Radio />}
              label={t("checkout.creditCard")}
            />
            <FormControlLabel
              value="pay_at_hotel"
              control={<Radio />}
              label={t("checkout.payAtHotel")}
            />
          </RadioGroup>

          {isCard ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <TextField
                name="paymentInfo.cardNumber"
                size="small"
                label={t("checkout.cardNumber")}
                placeholder="1234 5678 9012 3456"
                value={value.cardNumber}
                onChange={(e) => setField("cardNumber", e.target.value)}
                onBlur={onBlur}
                error={!!fieldError("cardNumber")}
                helperText={fieldError("cardNumber")}
              />

              <TextField
                name="paymentInfo.expiry"
                size="small"
                label={t("checkout.expiry")}
                placeholder="MM/YY"
                value={value.expiry}
                onChange={(e) => setField("expiry", e.target.value)}
                onBlur={onBlur}
                error={!!fieldError("expiry")}
                helperText={fieldError("expiry")}
              />

              <TextField
                name="paymentInfo.cvv"
                size="small"
                label={t("checkout.cvv")}
                placeholder="123"
                value={value.cvv}
                onChange={(e) => setField("cvv", e.target.value)}
                onBlur={onBlur}
                error={!!fieldError("cvv")}
                helperText={fieldError("cvv")}
              />

              <TextField
                name="paymentInfo.cardholderName"
                size="small"
                fullWidth
                label={t("checkout.cardholderName")}
                placeholder={t("checkout.nameOnCard")}
                value={value.cardholderName}
                onChange={(e) => setField("cardholderName", e.target.value)}
                onBlur={onBlur}
                error={!!fieldError("cardholderName")}
                helperText={fieldError("cardholderName")}
              />
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {t("checkout.payAtHotelHint")}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
