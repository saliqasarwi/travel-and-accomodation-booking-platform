import { Card, CardContent, Stack, Typography } from "@mui/material";
import { PersonRounded } from "@mui/icons-material";
import type { GuestInfo } from "@features/checkout/types/checkout.types";
import { useTranslation } from "react-i18next";

type Props = { guest?: GuestInfo };

export default function GuestInfoCard({ guest }: Props) {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
          <PersonRounded />
          <Typography variant="h6" fontWeight={900}>
            {t("confirmation.guestInformation")}
          </Typography>
        </Stack>

        <Stack spacing={1}>
          <Typography>
            <b>{t("confirmation.name")}:</b> {guest?.firstName}{" "}
            {guest?.lastName}
          </Typography>
          <Typography>
            <b>{t("confirmation.email")}:</b> {guest?.email}
          </Typography>
          <Typography>
            <b>{t("confirmation.phone")}:</b> {guest?.phone}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
