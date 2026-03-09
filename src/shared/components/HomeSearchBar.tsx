import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { addDays, toIsoDate } from "@shared/utils/date";
import {
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

type Values = {
  city: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  numberOfRooms: number;
};

const schema: Yup.ObjectSchema<Values> = Yup.object({
  city: Yup.string().trim().required("City is required"),
  checkInDate: Yup.string().required("Check-in date is required"),
  checkOutDate: Yup.string()
    .required("Check-out date is required")
    .test(
      "after-checkin",
      "Check-out must be after check-in",
      function (checkOut) {
        const { checkInDate } = this.parent as Values;
        if (!checkInDate || !checkOut) return true;
        return checkOut > checkInDate;
      }
    ),
  adults: Yup.number().min(1, "At least 1 adult").required(),
  children: Yup.number().min(0, "Children cannot be negative").required(),
  numberOfRooms: Yup.number().min(1, "At least 1 room").required(),
});

export default function HomeSearchBar() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const today = new Date();
  const defaultCheckIn = toIsoDate(today);
  const defaultCheckOut = toIsoDate(addDays(today, 1));

  const initialValues: Values = {
    city: searchParams.get("city") ?? "",
    checkInDate: searchParams.get("checkInDate") ?? defaultCheckIn,
    checkOutDate: searchParams.get("checkOutDate") ?? defaultCheckOut,
    adults: Number(searchParams.get("adults") ?? 2),
    children: Number(searchParams.get("children") ?? 0),
    numberOfRooms: Number(searchParams.get("numberOfRooms") ?? 1),
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Search stays
      </Typography>

      <Formik<Values>
        initialValues={initialValues}
        validationSchema={schema}
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
        }) => (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 2,
              alignItems: "start",
            }}
          >
            <TextField
              fullWidth
              id="city"
              name="city"
              label="City"
              placeholder="Where are you going?"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.city && Boolean(errors.city)}
              helperText={touched.city && errors.city}
              sx={{ gridColumn: { xs: "span 1", md: "1 / -1" } }}
            />

            <TextField
              fullWidth
              id="checkInDate"
              name="checkInDate"
              label="Check-in"
              type="date"
              value={values.checkInDate}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.checkInDate && Boolean(errors.checkInDate)}
              helperText={touched.checkInDate && errors.checkInDate}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth
              id="checkOutDate"
              name="checkOutDate"
              label="Check-out"
              type="date"
              value={values.checkOutDate}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.checkOutDate && Boolean(errors.checkOutDate)}
              helperText={touched.checkOutDate && errors.checkOutDate}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              select
              fullWidth
              id="adults"
              name="adults"
              label="Adults"
              value={values.adults}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.adults && Boolean(errors.adults)}
              helperText={touched.adults && errors.adults}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <MenuItem key={n} value={n}>
                  {n}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              id="children"
              name="children"
              label="Children"
              value={values.children}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.children && Boolean(errors.children)}
              helperText={touched.children && errors.children}
            >
              {Array.from({ length: 11 }, (_, i) => i).map((n) => (
                <MenuItem key={n} value={n}>
                  {n}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              id="numberOfRooms"
              name="numberOfRooms"
              label="Rooms"
              value={values.numberOfRooms}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.numberOfRooms && Boolean(errors.numberOfRooms)}
              helperText={touched.numberOfRooms && errors.numberOfRooms}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <MenuItem key={n} value={n}>
                  {n}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ gridColumn: { xs: "span 1", md: "1 / -1" } }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
              >
                Search
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </Paper>
  );
}
