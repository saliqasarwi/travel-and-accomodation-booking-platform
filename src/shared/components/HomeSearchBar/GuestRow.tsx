import { Box, IconButton, Stack, Typography } from "@mui/material";
import { AddRounded, RemoveRounded } from "@mui/icons-material";

type GuestRowProps = {
  label: string;
  value: number;
  min: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export default function GuestRow({
  label,
  value,
  min,
  onDecrease,
  onIncrease,
}: GuestRowProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 1.25 }}
    >
      <Typography sx={{ fontWeight: 600 }}>{label}</Typography>

      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton
          onClick={onDecrease}
          disabled={value <= min}
          sx={{
            width: 36,
            height: 36,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <RemoveRounded fontSize="small" />
        </IconButton>

        <Box sx={{ minWidth: 28, textAlign: "center", fontWeight: 700 }}>
          {value}
        </Box>

        <IconButton
          onClick={onIncrease}
          sx={{
            width: 36,
            height: 36,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <AddRounded fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  );
}
