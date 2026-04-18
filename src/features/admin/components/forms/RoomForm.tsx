import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Stack, TextField, Checkbox, FormControlLabel } from "@mui/material";
import type { RoomFormValues } from "../../types/admin.types";
import type { FormikProps } from "formik";
import { useTranslation } from "react-i18next";

type Props = {
  initialValues: RoomFormValues;
  onSubmit: (values: RoomFormValues) => void | Promise<void>;
  innerRef?: React.Ref<FormikProps<RoomFormValues>>;
};

const createRoomSchema = (t: (key: string) => string) =>
  Yup.object({
    roomNumber: Yup.number()
      .min(1, t("validation.roomNumberMin"))
      .nullable()
      .transform((val, originalVal) => (originalVal === "" ? undefined : val))
      .required(t("validation.roomNumberRequired")),
    adultCapacity: Yup.number()
      .min(0, t("validation.mustBeZeroOrMore"))
      .nullable()
      .transform((val, originalVal) => (originalVal === "" ? undefined : val))
      .optional(),
    childrenCapacity: Yup.number()
      .min(0, t("validation.mustBeZeroOrMore"))
      .nullable()
      .transform((val, originalVal) => (originalVal === "" ? undefined : val))
      .optional(),
    availability: Yup.boolean().optional(),
  });

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    bgcolor: "background.paper",
  },
};

export default function RoomForm({ initialValues, onSubmit, innerRef }: Props) {
  const { t } = useTranslation();
  const roomSchema = createRoomSchema(t);

  return (
    <Formik<RoomFormValues>
      innerRef={innerRef}
      initialValues={initialValues}
      validationSchema={roomSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <Form>
          <Stack spacing={2}>
            <TextField
              name="roomNumber"
              label={t("admin.roomNumber")}
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
              sx={fieldSx}
            />

            <TextField
              name="adultCapacity"
              label={t("admin.adults")}
              type="number"
              slotProps={{ htmlInput: { min: 0 } }}
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
              sx={fieldSx}
            />

            <TextField
              name="childrenCapacity"
              label={t("admin.children")}
              type="number"
              slotProps={{ htmlInput: { min: 0 } }}
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
              sx={fieldSx}
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
              label={t("admin.available")}
            />
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
