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
} from "@mui/material";
import type { PaymentInfo, PaymentMethod } from "../types/checkout.types";

type Props = {
  value: PaymentInfo;
  onChange: (next: PaymentInfo) => void;
};

export default function PaymentStep({ value, onChange }: Props) {
  const setField = <K extends keyof PaymentInfo>(
    key: K,
    nextValue: PaymentInfo[K]
  ) => {
    onChange({ ...value, [key]: nextValue });
  };

  const handleMethodChange = (method: PaymentMethod) => {
    onChange({ ...value, method });
  };

  const isCard = value.method === "credit_card";

  return (
    <Card
      elevation={0}
      sx={{ borderRadius: 3, border: 1, borderColor: "divider" }}
    >
      <CardContent>
        <Stack spacing={2.5}>
          <Stack spacing={0.5}>
            <Typography variant="h6" fontWeight={800}>
              Payment method
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Choose how you’d like to pay.
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
              label="Credit card"
            />
            <FormControlLabel
              value="pay_at_hotel"
              control={<Radio />}
              label="Pay at hotel"
            />
          </RadioGroup>

          {isCard && (
            <Stack spacing={2}>
              <TextField
                label="Card number"
                placeholder="1234 5678 9012 3456"
                value={value.cardNumber}
                onChange={(e) => setField("cardNumber", e.target.value)}
                fullWidth
              />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Expiry"
                  placeholder="MM/YY"
                  value={value.expiry}
                  onChange={(e) => setField("expiry", e.target.value)}
                  fullWidth
                />
                <TextField
                  label="CVV"
                  placeholder="123"
                  value={value.cvv}
                  onChange={(e) => setField("cvv", e.target.value)}
                  fullWidth
                />
              </Stack>

              <TextField
                label="Cardholder name"
                placeholder="Name on card"
                value={value.cardholderName}
                onChange={(e) => setField("cardholderName", e.target.value)}
                fullWidth
              />
            </Stack>
          )}

          {!isCard && (
            <Typography variant="body2" color="text.secondary">
              You’ll pay during check-in. No card details needed now.
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
