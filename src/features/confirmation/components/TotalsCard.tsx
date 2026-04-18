import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { PaidRounded } from "@mui/icons-material";
import { money } from "@shared/utils/formatters";
import { useTranslation } from "react-i18next";

type Props = { subtotal: number; discounts: number; total: number };

export default function TotalsCard({ subtotal, discounts, total }: Props) {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
          <PaidRounded />
          <Typography variant="h6" fontWeight={900}>
            {t("confirmation.totals")}
          </Typography>
        </Stack>

        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary">
              {t("confirmation.subtotal")}
            </Typography>
            <Typography fontWeight={800}>{money(subtotal)}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary">
              {t("confirmation.discounts")}
            </Typography>
            <Typography fontWeight={800}>-{money(discounts)}</Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" fontWeight={900}>
              {t("confirmation.total")}
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
