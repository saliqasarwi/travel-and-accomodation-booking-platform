import { Card, CardContent, Stack, Typography } from "@mui/material";
import { PersonRounded } from "@mui/icons-material";
import type { GuestInfo } from "@features/checkout/types/checkout.types";

type Props = { guest?: GuestInfo };

export default function GuestInfoCard({ guest }: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
          <PersonRounded />
          <Typography variant="h6" fontWeight={900}>
            Guest information
          </Typography>
        </Stack>

        <Stack spacing={0.75}>
          <Typography>
            <b>Name:</b> {guest?.firstName} {guest?.lastName}
          </Typography>
          <Typography>
            <b>Email:</b> {guest?.email}
          </Typography>
          <Typography>
            <b>Phone:</b> {guest?.phone}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
