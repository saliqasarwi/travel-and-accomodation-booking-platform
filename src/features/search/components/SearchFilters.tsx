import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  Slider,
  TextField,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

import {
  setSearchParamsFromPatch,
  type SearchQuery,
} from "../utils/searchParams";
import { fetchAmenities, fetchSearchResults } from "../api/search.api";
import type { Amenity, HotelSearchItem } from "../types/types";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function SearchFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const PRICE_MIN = 0;
  const PRICE_MAX = 1000;
  const PRICE_STEP = 10;

  const updateParams = useCallback(
    (patch: Partial<SearchQuery>) => {
      const next = setSearchParamsFromPatch(searchParams, patch);
      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  const selectedStars = useMemo<number[]>(() => {
    const v = searchParams.get("stars");
    return v ? v.split(",").map(Number).filter(Number.isFinite) : [];
  }, [searchParams]);

  const selectedAmenities = useMemo<number[]>(() => {
    const v = searchParams.get("amenities");
    return v ? v.split(",").map(Number).filter(Number.isFinite) : [];
  }, [searchParams]);

  const selectedRoomType = searchParams.get("roomType") ?? "";

  const minFromUrl = searchParams.get("minPrice");
  const maxFromUrl = searchParams.get("maxPrice");

  const priceRange = useMemo<[number, number]>(() => {
    const min = minFromUrl ? Number(minFromUrl) : PRICE_MIN;
    const max = maxFromUrl ? Number(maxFromUrl) : PRICE_MAX;

    const safeMin = Number.isFinite(min)
      ? clamp(min, PRICE_MIN, PRICE_MAX)
      : PRICE_MIN;
    const safeMax = Number.isFinite(max)
      ? clamp(max, PRICE_MIN, PRICE_MAX)
      : PRICE_MAX;

    return safeMin <= safeMax ? [safeMin, safeMax] : [safeMax, safeMin];
  }, [minFromUrl, maxFromUrl, PRICE_MIN, PRICE_MAX]);

  // ---------------- Amenities
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [amenitiesLoading, setAmenitiesLoading] = useState(false);
  const [amenitiesError, setAmenitiesError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAmenities() {
      try {
        setAmenitiesLoading(true);
        setAmenitiesError(null);

        const list = await fetchAmenities(controller.signal);
        setAmenities(list);
      } catch (err) {
        if (
          typeof err === "object" &&
          err !== null &&
          "name" in err &&
          (err as { name?: unknown }).name === "AbortError"
        )
          return;
        setAmenitiesError("Failed to load amenities");
      } finally {
        setAmenitiesLoading(false);
      }
    }

    loadAmenities();
    return () => controller.abort();
  }, []);

  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [roomTypesLoading, setRoomTypesLoading] = useState(false);
  const [roomTypesError, setRoomTypesError] = useState<string | null>(null);

  const city = searchParams.get("city") ?? undefined;
  const checkInDate = searchParams.get("checkInDate") ?? undefined;
  const checkOutDate = searchParams.get("checkOutDate") ?? undefined;
  const adults = searchParams.get("adults")
    ? Number(searchParams.get("adults"))
    : undefined;
  const children = searchParams.get("children")
    ? Number(searchParams.get("children"))
    : undefined;
  const numberOfRooms = searchParams.get("numberOfRooms")
    ? Number(searchParams.get("numberOfRooms"))
    : undefined;

  useEffect(() => {
    const controller = new AbortController();

    async function loadRoomTypes() {
      try {
        setRoomTypesLoading(true);
        setRoomTypesError(null);

        const baseResults: HotelSearchItem[] = await fetchSearchResults(
          { city, checkInDate, checkOutDate, adults, children, numberOfRooms },
          controller.signal
        );

        const types = Array.from(
          new Set(
            baseResults
              .map((r) => r.roomType)
              .filter(
                (t): t is string => typeof t === "string" && t.trim().length > 0
              )
          )
        ).sort((a, b) => a.localeCompare(b));

        setRoomTypes(types);
      } catch (err) {
        if (
          typeof err === "object" &&
          err !== null &&
          "name" in err &&
          (err as { name?: unknown }).name === "AbortError"
        )
          return;
        setRoomTypesError("Failed to load room types");
      } finally {
        setRoomTypesLoading(false);
      }
    }

    loadRoomTypes();
    return () => controller.abort();
  }, [city, checkInDate, checkOutDate, adults, children, numberOfRooms]);

  const handleSliderChange = (_: Event, value: number | number[]) => {
    const [min, max] = value as number[];
    updateParams({
      minPrice: min === PRICE_MIN ? undefined : min,
      maxPrice: max === PRICE_MAX ? undefined : max,
    });
  };

  const handleMinInput = (raw: string) => {
    const n = raw === "" ? undefined : Number(raw);
    if (n === undefined) return updateParams({ minPrice: undefined });
    if (!Number.isFinite(n)) return;

    const nextMin = clamp(n, PRICE_MIN, priceRange[1]);
    updateParams({ minPrice: nextMin === PRICE_MIN ? undefined : nextMin });
  };

  const handleMaxInput = (raw: string) => {
    const n = raw === "" ? undefined : Number(raw);
    if (n === undefined) return updateParams({ maxPrice: undefined });
    if (!Number.isFinite(n)) return;

    const nextMax = clamp(n, priceRange[0], PRICE_MAX);
    updateParams({ maxPrice: nextMax === PRICE_MAX ? undefined : nextMax });
  };

  const toggleStar = (star: number) => {
    const next = selectedStars.includes(star)
      ? selectedStars.filter((s) => s !== star)
      : [...selectedStars, star].sort((a, b) => a - b);

    updateParams({ stars: next });
  };

  const toggleAmenity = (id: number) => {
    const next = selectedAmenities.includes(id)
      ? selectedAmenities.filter((a) => a !== id)
      : [...selectedAmenities, id].sort((a, b) => a - b);

    updateParams({ amenities: next });
  };

  return (
    <Box sx={{ width: { xs: "100%", md: 320 }, flexShrink: 0 }}>
      <Stack
        spacing={3}
        sx={{
          p: 2,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Filters
        </Typography>

        <Divider />
        <Box>
          <Typography fontWeight={700} sx={{ mb: 2 }}>
            Your budget (per night)
          </Typography>

          <Slider
            value={priceRange}
            onChange={handleSliderChange}
            valueLabelDisplay="off"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={PRICE_STEP}
            disableSwap
          />

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                fontWeight={700}
                sx={{ letterSpacing: 1 }}
              >
                MIN
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={searchParams.get("minPrice") ?? ""}
                onChange={(e) => handleMinInput(e.target.value)}
                placeholder={`${PRICE_MIN}`}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">USD</InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                fontWeight={700}
                sx={{ letterSpacing: 1 }}
              >
                MAX
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={searchParams.get("maxPrice") ?? ""}
                onChange={(e) => handleMaxInput(e.target.value)}
                placeholder={`${PRICE_MAX}`}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">USD</InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </Stack>
        </Box>

        <Divider />
        <Box>
          <Typography fontWeight={700} sx={{ mb: 1 }}>
            Star rating
          </Typography>

          <FormGroup>
            {[5, 4, 3, 2, 1].map((star) => (
              <FormControlLabel
                key={star}
                control={
                  <Checkbox
                    checked={selectedStars.includes(star)}
                    onChange={() => toggleStar(star)}
                  />
                }
                label={<Rating value={star} readOnly size="small" />}
              />
            ))}
          </FormGroup>
        </Box>

        <Divider />
        <Box>
          <Typography fontWeight={700} sx={{ mb: 1 }}>
            Room type
          </Typography>

          {roomTypesLoading ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <CircularProgress size={18} />
              <Typography variant="body2" color="text.secondary">
                Loading room types…
              </Typography>
            </Stack>
          ) : roomTypesError ? (
            <Alert severity="error">{roomTypesError}</Alert>
          ) : (
            <FormControl fullWidth size="small">
              <InputLabel id="roomType-label">Room type</InputLabel>
              <Select
                labelId="roomType-label"
                label="Room type"
                value={selectedRoomType}
                onChange={(e) =>
                  updateParams({ roomType: e.target.value || undefined })
                }
              >
                <MenuItem value="">All</MenuItem>
                {roomTypes.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>

        <Divider />

        <Box>
          <Typography fontWeight={700} sx={{ mb: 1 }}>
            Amenities
          </Typography>

          {amenitiesLoading ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <CircularProgress size={18} />
              <Typography variant="body2" color="text.secondary">
                Loading amenities…
              </Typography>
            </Stack>
          ) : amenitiesError ? (
            <Alert severity="error">{amenitiesError}</Alert>
          ) : (
            <FormGroup>
              {amenities.map((a) => (
                <FormControlLabel
                  key={a.id}
                  control={
                    <Checkbox
                      checked={selectedAmenities.includes(a.id)}
                      onChange={() => toggleAmenity(a.id)}
                    />
                  }
                  label={a.name}
                />
              ))}
            </FormGroup>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
