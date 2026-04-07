import { Button, Stack, TextField, Typography, Box } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
type Props = {
  title: string;
  searchValue: string;
  onSearchChange: (v: string) => void;
  onSearchSubmit?: () => void;
  onClearSearch?: () => void;
  onCreateClick: () => void;
  createLabel?: string;
};

export default function AdminToolbar({
  title,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onClearSearch,
  onCreateClick,
  createLabel = "Create",
}: Props) {
  return (
    <Stack spacing={2.5}>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.8rem", md: "2rem" },
            lineHeight: 1.05,
            color: "text.primary",
            mb: 0.75,
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            width: 64,
            height: 4,
            borderRadius: 999,
            background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
          }}
        />
      </Box>

      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={1.5}
        alignItems={{ xs: "stretch", lg: "center" }}
        justifyContent="space-between"
      >
        <TextField
          fullWidth
          placeholder={`Search ${title.toLowerCase()}...`}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearchSubmit?.();
            }
          }}
          sx={{
            minWidth: { xs: "100%", lg: 420 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 999,
              bgcolor: "background.paper",
            },
          }}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.25}
          sx={{ width: { xs: "100%", lg: "auto" } }}
        >
          <Button
            variant="outlined"
            startIcon={<SearchRoundedIcon />}
            onClick={onSearchSubmit}
            sx={{
              borderRadius: 999,
              fontWeight: 700,
              minWidth: 120,
            }}
          >
            Search
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            startIcon={<ClearRoundedIcon />}
            onClick={onClearSearch}
            sx={{
              borderRadius: 999,
              fontWeight: 700,
              minWidth: 110,
            }}
          >
            Clear
          </Button>

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={onCreateClick}
            sx={{
              borderRadius: 999,
              fontWeight: 700,
              minWidth: 120,
            }}
          >
            {createLabel}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
