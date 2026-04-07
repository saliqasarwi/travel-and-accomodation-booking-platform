import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import {
  setSearchParamsFromPatch,
  type SearchSort,
} from "../utils/searchParams";

type Props = {
  resultsCount: number;
};

export default function SearchSortBar({ resultsCount }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sort") ?? "recommended";

  const handleSortChange = (value: string) => {
    const next = setSearchParamsFromPatch(searchParams, {
      sort: value === "recommended" ? "recommended" : (value as SearchSort),
    });
    setSearchParams(next);
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      alignItems={{ xs: "stretch", sm: "center" }}
      justifyContent="space-between"
      sx={{
        mb: 3,
        p: 2.5,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          {resultsCount} stays found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Compare options and sort results to find your ideal stay.
        </Typography>
      </Box>

      <FormControl size="small" sx={{ minWidth: 220 }}>
        <InputLabel id="sort-results-label">Sort by</InputLabel>
        <Select
          labelId="sort-results-label"
          value={currentSort}
          label="Sort by"
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <MenuItem value="recommended">Recommended</MenuItem>
          <MenuItem value="price_asc">Price: low to high</MenuItem>
          <MenuItem value="price_desc">Price: high to low</MenuItem>
          <MenuItem value="rating_desc">Rating: high to low</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
