import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Stack, TextField, Button } from "@mui/material";
import type { HotelFormValues } from "../../types/admin.types";
import type { FormikProps } from "formik";

type Props = {
  initialValues: HotelFormValues;
  onSubmit: (values: HotelFormValues) => void | Promise<void>;
  submitLabel?: string;

  //  allow drawer to submit from outside
  innerRef?: React.Ref<FormikProps<HotelFormValues>>;
};

const hotelSchema = Yup.object({
  hotelName: Yup.string().trim().required("Hotel name is required"),
  location: Yup.string().trim().optional(),
  starRating: Yup.number()
    .min(1, "Min is 1")
    .max(5, "Max is 5")
    .nullable()
    .transform((val, originalVal) => (originalVal === "" ? undefined : val))
    .optional(),
  availableRooms: Yup.number()
    .min(0, "Must be >= 0")
    .nullable()
    .transform((val, originalVal) => (originalVal === "" ? undefined : val))
    .optional(),
});

export default function HotelForm({
  initialValues,
  onSubmit,
  submitLabel = "Save",
  innerRef,
}: Props) {
  return (
    <Formik<HotelFormValues>
      innerRef={innerRef}
      initialValues={initialValues}
      validationSchema={hotelSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form>
          <Stack spacing={2}>
            <TextField
              name="hotelName"
              label="Hotel Name"
              value={values.hotelName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.hotelName && Boolean(errors.hotelName)}
              helperText={touched.hotelName && errors.hotelName}
              fullWidth
              required
            />

            <TextField
              name="location"
              label="Location"
              value={values.location ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.location && Boolean(errors.location)}
              helperText={touched.location && (errors.location as string)}
              fullWidth
            />

            <TextField
              name="starRating"
              label="Star Rating"
              type="number"
              slotProps={{ htmlInput: { min: 1, max: 5 } }}
              value={values.starRating ?? ""}
              onBlur={handleBlur}
              onChange={(e) =>
                setFieldValue(
                  "starRating",
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              error={touched.starRating && Boolean(errors.starRating)}
              helperText={touched.starRating && (errors.starRating as string)}
              fullWidth
            />

            <TextField
              name="availableRooms"
              label="Available Rooms"
              type="number"
              slotProps={{ htmlInput: { min: 0 } }}
              value={values.availableRooms ?? ""}
              onBlur={handleBlur}
              onChange={(e) =>
                setFieldValue(
                  "availableRooms",
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              error={touched.availableRooms && Boolean(errors.availableRooms)}
              helperText={
                touched.availableRooms && (errors.availableRooms as string)
              }
              fullWidth
            />

            {/* optional in-form submit */}
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {submitLabel}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
