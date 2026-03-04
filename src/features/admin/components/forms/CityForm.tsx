import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Stack, TextField, Button } from "@mui/material";
import type { CityFormValues } from "../../types/admin.types";

type Props = {
  initialValues: CityFormValues;
  onSubmit: (values: CityFormValues) => void | Promise<void>;
  submitLabel?: string;
};

const citySchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  country: Yup.string().trim().optional(),
  postOffice: Yup.string().trim().optional(),
  numberOfHotels: Yup.number()
    .min(0, "Must be >= 0")
    .nullable()
    .transform((val, originalVal) => (originalVal === "" ? undefined : val))
    .optional(),
});

export default function CityForm({
  initialValues,
  onSubmit,
  submitLabel = "Save",
}: Props) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={citySchema}
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
              name="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              fullWidth
              required
            />

            <TextField
              name="country"
              label="Country"
              value={values.country ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.country && Boolean(errors.country)}
              helperText={touched.country && (errors.country as string)}
              fullWidth
            />

            <TextField
              name="postOffice"
              label="Post Office"
              value={values.postOffice ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.postOffice && Boolean(errors.postOffice)}
              helperText={touched.postOffice && (errors.postOffice as string)}
              fullWidth
            />

            <TextField
              name="numberOfHotels"
              label="Number of Hotels"
              type="number"
              slotProps={{
                htmlInput: { min: 0 },
              }}
              value={values.numberOfHotels ?? ""}
              onBlur={handleBlur}
              onChange={(e) =>
                setFieldValue(
                  "numberOfHotels",
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              error={touched.numberOfHotels && Boolean(errors.numberOfHotels)}
              helperText={
                touched.numberOfHotels && (errors.numberOfHotels as string)
              }
              fullWidth
            />

            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {submitLabel}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
