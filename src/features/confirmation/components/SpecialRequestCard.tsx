import { Card, CardContent, Stack, Typography } from "@mui/material";
import { NotesRounded } from "@mui/icons-material";
import type { SpecialRequests } from "@features/checkout/types/checkout.types";
type Props = { notes?: SpecialRequests };

export default function SpecialRequestsCard({ notes }: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
          <NotesRounded />
          <Typography variant="h6" fontWeight={900}>
            Special requests
          </Typography>
        </Stack>

        <Typography color="text.secondary">
          {notes?.notes || "No special requests"}
        </Typography>
      </CardContent>
    </Card>
  );
}
