import { Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import type { SpecialRequests } from "../types/checkout.types";

type Props = {
  value: SpecialRequests;
  onChange: (next: SpecialRequests) => void;
};

export default function SpecialRequestsStep({ value, onChange }: Props) {
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
            fullWidth
            multiline
            minRows={4}
            placeholder="Add your special requests..."
            value={value.notes}
            onChange={(e) => onChange({ ...value, notes: e.target.value })}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
