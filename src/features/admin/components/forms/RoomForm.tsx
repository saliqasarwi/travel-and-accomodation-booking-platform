import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Stack,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import type { RoomFormValues } from "../../types/admin.types";

type Props = {
  initialValues: RoomFormValues;
  onSubmit: (values: RoomFormValues) => void | Promise<void>;
  submitLabel?: string;
};

const roomSchema = Yup.object({
  roomNumber: Yup.number()
    .min(1, "Room number must be >= 1")
    .nullable()
    .transform((val, originalVal) => (originalVal === "" ? undefined : val))
    .required("Room number is required"),
  adultCapacity: Yup.number()
    .min(0, "Must be >= 0")
    .nullable()
    .transform((val, originalVal) => (originalVal === "" ? undefined : val))
    .optional(),
  childrenCapacity: Yup.number()
    .min(0, "Must be >= 0")
    .nullable()
    .transform((val, originalVal) => (originalVal === "" ? undefined : val))
    .optional(),
  availability: Yup.boolean().optional(),
});

export default function RoomForm({
  initialValues,
  onSubmit,
  submitLabel = "Save",
}: Props) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={roomSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form>
          <Stack spacing={2}>
            <TextField
              name="roomNumber"
              label="Room Number"
              type="number"
              value={values.roomNumber ?? ""}
              onBlur={handleBlur}
              onChange={(e) =>
                setFieldValue(
                  "roomNumber",
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              error={touched.roomNumber && Boolean(errors.roomNumber)}
              helperText={touched.roomNumber && (errors.roomNumber as string)}
              fullWidth
            />

            <TextField
              name="adultCapacity"
              label="Adults"
              type="number"
              inputProps={{ min: 0 }}
              value={values.adultCapacity ?? ""}
              onBlur={handleBlur}
              onChange={(e) =>
                setFieldValue(
                  "adultCapacity",
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              error={touched.adultCapacity && Boolean(errors.adultCapacity)}
              helperText={
                touched.adultCapacity && (errors.adultCapacity as string)
              }
              fullWidth
            />

            <TextField
              name="childrenCapacity"
              label="Children"
              type="number"
              slotProps={{
                htmlInput: { min: 0 },
              }}
              value={values.childrenCapacity ?? ""}
              onBlur={handleBlur}
              onChange={(e) =>
                setFieldValue(
                  "childrenCapacity",
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              error={
                touched.childrenCapacity && Boolean(errors.childrenCapacity)
              }
              helperText={
                touched.childrenCapacity && (errors.childrenCapacity as string)
              }
              fullWidth
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={values.availability ?? false}
                  onChange={(e) =>
                    setFieldValue("availability", e.target.checked)
                  }
                  name="availability"
                />
              }
              label="Available"
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
