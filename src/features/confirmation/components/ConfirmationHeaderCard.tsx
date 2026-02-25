import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { CheckCircleRounded } from "@mui/icons-material";
import { formatDate } from "../utils/formatters";

type Props = {
  confirmationNumber: string;
  status: string;
  createdAt: string;
};

export default function ConfirmationHeaderCard({
  confirmationNumber,
  status,
  createdAt,
}: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ md: "center" }}
        >
          <Stack flex={1} spacing={0.5}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              flexWrap="wrap"
            >
              <Typography variant="h5" fontWeight={900}>
                Booking confirmed
              </Typography>
              <Chip
                icon={<CheckCircleRounded />}
                label={status}
                color="success"
                variant="outlined"
                sx={{ fontWeight: 700 }}
              />
            </Stack>

            <Typography variant="body2" color="text.secondary">
              Keep this confirmation for your records.
            </Typography>

            <Divider sx={{ my: 1.5 }} />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <Stack>
                <Typography variant="caption" color="text.secondary">
                  Confirmation number
                </Typography>
                <Typography fontWeight={900}>{confirmationNumber}</Typography>
              </Stack>

              <Stack>
                <Typography variant="caption" color="text.secondary">
                  Created
                </Typography>
                <Typography fontWeight={700}>
                  {formatDate(createdAt)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
