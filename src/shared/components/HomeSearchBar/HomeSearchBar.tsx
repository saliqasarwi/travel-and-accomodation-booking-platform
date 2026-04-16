import { Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { addDays, toIsoDate } from "@shared/utils/date";

import {
  Box,
  Button,
  Paper,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  SearchRounded,
  CalendarMonthRounded,
  PersonOutlineRounded,
  ChevronRightRounded,
} from "@mui/icons-material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import dayjs, { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";

import type { HomeSearchBarValues } from "./homeSearchBar.types";
import { homeSearchBarSchema } from "./homeSearchBar.schema";
import { formatDateRange, formatGuests } from "./homeSearchBar.utils";
import SearchBlock from "./SearchBlock";
import GuestRow from "./GuestRow";

export default function HomeSearchBar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const today = new Date();
  const defaultCheckIn = toIsoDate(today);
  const defaultCheckOut = toIsoDate(addDays(today, 1));

  const initialValues: HomeSearchBarValues = useMemo(
    () => ({
      city: searchParams.get("city") ?? "",
      checkInDate: searchParams.get("checkInDate") ?? defaultCheckIn,
      checkOutDate: searchParams.get("checkOutDate") ?? defaultCheckOut,
      adults: Number(searchParams.get("adults") ?? 2),
      children: Number(searchParams.get("children") ?? 0),
      numberOfRooms: Number(searchParams.get("numberOfRooms") ?? 1),
    }),
    [searchParams, defaultCheckIn, defaultCheckOut]
  );

  const [guestAnchorEl, setGuestAnchorEl] = useState<HTMLElement | null>(null);
  const [dateAnchorEl, setDateAnchorEl] = useState<HTMLElement | null>(null);

  const guestPopoverOpen = Boolean(guestAnchorEl);
  const datePopoverOpen = Boolean(dateAnchorEl);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik<HomeSearchBarValues>
        initialValues={initialValues}
        validationSchema={homeSearchBarSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          try {
            const params = new URLSearchParams({
              city: values.city.trim(),
              checkInDate: values.checkInDate,
              checkOutDate: values.checkOutDate,
              adults: String(values.adults),
              children: String(values.children),
              numberOfRooms: String(values.numberOfRooms),
            });

            navigate(`/search?${params.toString()}`);
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <>
            <Paper
              elevation={0}
              sx={{
                p: 0.75,
                bgcolor: "primary.50",
                border: "1px solid",
                borderColor: "primary.200",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    lg: "1.6fr 1.4fr 1.3fr auto",
                  },
                  gap: 1,
                }}
              >
                <SearchBlock
                  icon={<SearchRounded />}
                  label={t("search.destinationLabel")}
                  value={values.city || t("search.destinationFallback")}
                >
                  <TextField
                    fullWidth
                    variant="standard"
                    id="city"
                    name="city"
                    placeholder={t("search.destinationPlaceholder")}
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    slotProps={{
                      input: {
                        disableUnderline: true,
                        sx: {
                          fontSize: 16,
                          fontWeight: 700,
                          p: 0,
                        },
                      },
                    }}
                  />
                </SearchBlock>

                <SearchBlock
                  icon={<CalendarMonthRounded />}
                  label={t("search.checkInOut")}
                  value={formatDateRange(
                    values.checkInDate,
                    values.checkOutDate,
                    i18n.language
                  )}
                  onClick={(event) => setDateAnchorEl(event.currentTarget)}
                />

                <SearchBlock
                  icon={<PersonOutlineRounded />}
                  label={t("search.guestsAndRooms")}
                  value={formatGuests(
                    values.adults,
                    values.children,
                    values.numberOfRooms,
                    t
                  )}
                  onClick={(event) => setGuestAnchorEl(event.currentTarget)}
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    minHeight: 58,
                    px: 4,
                    fontWeight: 800,
                    fontSize: 18,
                    textTransform: "none",
                    boxShadow: "none",
                  }}
                >
                  {t("common.search")}
                </Button>
              </Box>
            </Paper>

            {(touched.city && errors.city) ||
            (touched.checkOutDate && errors.checkOutDate) ? (
              <Box sx={{ mt: 1, px: 1 }}>
                {touched.city && errors.city && (
                  <Typography variant="body2" color="error.main">
                    {errors.city}
                  </Typography>
                )}
                {touched.checkOutDate && errors.checkOutDate && (
                  <Typography variant="body2" color="error.main">
                    {errors.checkOutDate}
                  </Typography>
                )}
              </Box>
            ) : null}

            <Popover
              open={datePopoverOpen}
              anchorEl={dateAnchorEl}
              onClose={() => setDateAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    p: 2.5,
                    width: 760,
                    maxWidth: "96vw",
                  },
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                {t("search.selectDates")}
              </Typography>

              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                alignItems="flex-start"
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {t("search.checkIn")}
                  </Typography>

                  <DateCalendar
                    value={
                      values.checkInDate ? dayjs(values.checkInDate) : null
                    }
                    onChange={(newValue: Dayjs | null) => {
                      if (!newValue) return;
                      setFieldValue(
                        "checkInDate",
                        newValue.format("YYYY-MM-DD")
                      );

                      if (
                        values.checkOutDate &&
                        dayjs(values.checkOutDate).isBefore(newValue, "day")
                      ) {
                        setFieldValue(
                          "checkOutDate",
                          newValue.add(1, "day").format("YYYY-MM-DD")
                        );
                      }
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    pt: 6,
                    color: "text.secondary",
                  }}
                >
                  <ChevronRightRounded />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {t("search.checkOut")}
                  </Typography>

                  <DateCalendar
                    value={
                      values.checkOutDate ? dayjs(values.checkOutDate) : null
                    }
                    minDate={
                      values.checkInDate
                        ? dayjs(values.checkInDate).add(1, "day")
                        : undefined
                    }
                    onChange={(newValue: Dayjs | null) => {
                      if (!newValue) return;
                      setFieldValue(
                        "checkOutDate",
                        newValue.format("YYYY-MM-DD")
                      );
                    }}
                  />
                </Box>
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                justifyContent="space-between"
                sx={{ mt: 2 }}
              >
                <Typography color="text.secondary">
                  {formatDateRange(
                    values.checkInDate,
                    values.checkOutDate,
                    i18n.language
                  )}
                </Typography>

                <Button
                  variant="outlined"
                  onClick={() => setDateAnchorEl(null)}
                  sx={{ textTransform: "none" }}
                >
                  {t("search.done")}
                </Button>
              </Stack>
            </Popover>

            <Popover
              open={guestPopoverOpen}
              anchorEl={guestAnchorEl}
              onClose={() => setGuestAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    p: 2,
                    width: 320,
                  },
                },
              }}
            >
              <GuestRow
                label={t("search.adultsLabel")}
                value={values.adults}
                min={1}
                onDecrease={() => setFieldValue("adults", values.adults - 1)}
                onIncrease={() => setFieldValue("adults", values.adults + 1)}
              />

              <GuestRow
                label={t("search.childrenLabel")}
                value={values.children}
                min={0}
                onDecrease={() =>
                  setFieldValue("children", values.children - 1)
                }
                onIncrease={() =>
                  setFieldValue("children", values.children + 1)
                }
              />

              <GuestRow
                label={t("search.roomsSelector")}
                value={values.numberOfRooms}
                min={1}
                onDecrease={() =>
                  setFieldValue("numberOfRooms", values.numberOfRooms - 1)
                }
                onIncrease={() =>
                  setFieldValue("numberOfRooms", values.numberOfRooms + 1)
                }
              />

              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 1.5, textTransform: "none" }}
                onClick={() => setGuestAnchorEl(null)}
              >
                {t("search.done")}
              </Button>
            </Popover>
          </>
        )}
      </Formik>
    </LocalizationProvider>
  );
}
