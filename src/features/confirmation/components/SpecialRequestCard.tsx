import { Card, CardContent, Stack, Typography } from "@mui/material";
import { NotesRounded } from "@mui/icons-material";
import type { SpecialRequests } from "@features/checkout/types/checkout.types";
import { useTranslation } from "react-i18next";

type Props = { notes?: SpecialRequests };

export default function SpecialRequestsCard({ notes }: Props) {
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
          <NotesRounded />
          <Typography variant="h6" fontWeight={900}>
            {t("confirmation.specialRequests")}
          </Typography>
        </Stack>

        <Typography color="text.secondary">
          {notes?.notes || t("confirmation.noSpecialRequests")}
        </Typography>
      </CardContent>
    </Card>
  );
}
