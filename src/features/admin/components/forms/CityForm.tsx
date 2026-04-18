import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Stack, TextField } from "@mui/material";
import type { CityFormValues } from "../../types/admin.types";
import type { FormikProps } from "formik";
import { useTranslation } from "react-i18next";

type Props = {
  initialValues: CityFormValues;
  onSubmit: (values: CityFormValues) => void | Promise<void>;
  innerRef?: React.Ref<FormikProps<CityFormValues>>;
};

const createCitySchema = (t: (key: string) => string) =>
  Yup.object({
    name: Yup.string().trim().required(t("validation.nameRequired")),
    country: Yup.string().trim().optional(),
    postOffice: Yup.string().trim().optional(),
    numberOfHotels: Yup.number()
      .min(0, t("validation.mustBeZeroOrMore"))
      .nullable()
      .transform((val, originalVal) => (originalVal === "" ? undefined : val))
      .optional(),
  });

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    bgcolor: "background.paper",
  },
};

export default function CityForm({ initialValues, onSubmit, innerRef }: Props) {
  const { t } = useTranslation();
  const citySchema = createCitySchema(t);

  return (
    <Formik<CityFormValues>
      innerRef={innerRef}
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
      }) => (
        <Form>
          <Stack spacing={2}>
            <TextField
              name="name"
              label={t("admin.name")}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              fullWidth
              required
              sx={fieldSx}
            />

            <TextField
              name="country"
              label={t("admin.country")}
              value={values.country ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.country && Boolean(errors.country)}
              helperText={touched.country && (errors.country as string)}
              fullWidth
              sx={fieldSx}
            />

            <TextField
              name="postOffice"
              label={t("admin.postOffice")}
              value={values.postOffice ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.postOffice && Boolean(errors.postOffice)}
              helperText={touched.postOffice && (errors.postOffice as string)}
              fullWidth
              sx={fieldSx}
            />

            <TextField
              name="numberOfHotels"
              label={t("admin.numberOfHotels")}
              type="number"
              slotProps={{ htmlInput: { min: 0 } }}
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
              sx={fieldSx}
            />
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
