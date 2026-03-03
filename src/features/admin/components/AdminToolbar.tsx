import { Button, Stack, TextField, Typography } from "@mui/material";

type Props = {
  title: string;
  searchValue: string;
  onSearchChange: (v: string) => void;
  onSearchSubmit?: () => void;
  onCreateClick: () => void;
  createLabel?: string;
};

export default function AdminToolbar({
  title,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onCreateClick,
  createLabel = "Create",
}: Props) {
  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">{title}</Typography>

        <Button variant="contained" onClick={onCreateClick}>
          {createLabel}
        </Button>
      </Stack>

      {/* Search Row */}
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          fullWidth
          label="Search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearchSubmit?.();
            }
          }}
        />

        <Button variant="outlined" onClick={onSearchSubmit}>
          Search
        </Button>
      </Stack>
    </Stack>
  );
}
