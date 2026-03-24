import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { CheckCircleRounded } from "@mui/icons-material";
import { formatDate } from "@shared/utils/formatters";

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
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
        background:
          "linear-gradient(180deg, rgba(21,101,192,0.04) 0%, rgba(255,255,255,1) 45%)",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={2}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            justifyContent="space-between"
            alignItems={{ sm: "center" }}
          >
            <Box>
              <Typography variant="h5" fontWeight={900}>
                Booking confirmed
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Keep this confirmation for your records.
              </Typography>
            </Box>

            <Chip
              icon={<CheckCircleRounded />}
              label={status}
              color="success"
              variant="outlined"
              sx={{ fontWeight: 700, width: "fit-content" }}
            />
          </Stack>

          <Divider />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 5 }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary">
                Confirmation number
              </Typography>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "1.1rem", md: "1.35rem" },
                }}
              >
                {confirmationNumber}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Created
              </Typography>
              <Typography fontWeight={700}>{formatDate(createdAt)}</Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
