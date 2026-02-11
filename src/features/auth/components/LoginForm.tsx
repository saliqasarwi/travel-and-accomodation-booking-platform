import { Formik } from "formik";
import * as Yup from "yup";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
type Values = {
  userName: string;
  password: string;
};
type Props = {
  onSubmit: (values: Values) => Promise<void> | void;
  isLoading?: boolean;
  error?: string | null;
};
const schema = Yup.object({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});
export default function LoginForm({
  onSubmit,
  isLoading = false,
  error,
}: Props) {
  return (
    <Formik<Values>
      initialValues={{ userName: "", password: "" }}
      validationSchema={schema}
      onSubmit={async (values, helpers) => {
        helpers.setSubmitting(true);
        await onSubmit(values);
        helpers.setSubmitting(false);
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
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            {error ? <Alert severity="error">{error}</Alert> : null}
            <TextField
              id="userName"
              name="userName"
              label="Username"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="username"
              error={Boolean(touched.userName && errors.userName)}
              helperText={touched.userName ? errors.userName : ""}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="current-password"
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password ? errors.password : ""}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || isSubmitting}
              fullWidth
            >
              {isLoading || isSubmitting ? "Signing in…" : "Login"}
            </Button>
          </Stack>
        </Box>
      )}
    </Formik>
  );
}
