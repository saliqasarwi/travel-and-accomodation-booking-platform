import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { PaidRounded } from "@mui/icons-material";
import { money } from "../utils/formatters";

type Props = { subtotal: number; discounts: number; total: number };

export default function TotalsCard({ subtotal, discounts, total }: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
          <PaidRounded />
          <Typography variant="h6" fontWeight={900}>
            Totals
          </Typography>
        </Stack>

        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary">Subtotal</Typography>
            <Typography fontWeight={800}>{money(subtotal)}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary">Discounts</Typography>
            <Typography fontWeight={800}>-{money(discounts)}</Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" fontWeight={900}>
              Total
            </Typography>
            <Typography variant="h6" fontWeight={900}>
              {money(total)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
