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
import { useTranslation } from "react-i18next";
import {
  setSearchParamsFromPatch,
  type SearchSort,
} from "../utils/searchParams";

type Props = {
  resultsCount: number;
};

export default function SearchSortBar({ resultsCount }: Props) {
  const { t } = useTranslation();
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
          {t("search.resultsFound", { count: resultsCount })}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("search.compareAndSort")}
        </Typography>
      </Box>

      <FormControl size="small" sx={{ minWidth: 220 }}>
        <InputLabel id="sort-results-label">{t("search.sortBy")}</InputLabel>
        <Select
          labelId="sort-results-label"
          value={currentSort}
          label={t("search.sortBy")}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <MenuItem value="recommended">{t("search.recommended")}</MenuItem>
          <MenuItem value="price_asc">{t("search.priceLowToHigh")}</MenuItem>
          <MenuItem value="price_desc">{t("search.priceHighToLow")}</MenuItem>
          <MenuItem value="rating_desc">{t("search.ratingHighToLow")}</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
