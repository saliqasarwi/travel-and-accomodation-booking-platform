import { Formik } from "formik";
import * as Yup from "yup";
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
        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: "0.75rem", maxWidth: 360 }}
        >
          <div style={{ display: "grid", gap: "0.25rem" }}>
            <label htmlFor="userName">Username</label>
            <input
              id="userName"
              name="userName"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter username"
              autoComplete="username"
            />
            {touched.userName && errors.userName ? (
              <small style={{ color: "crimson" }}>{errors.userName}</small>
            ) : null}
          </div>

          <div style={{ display: "grid", gap: "0.25rem" }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter password"
              autoComplete="current-password"
            />
            {touched.password && errors.password ? (
              <small style={{ color: "crimson" }}>{errors.password}</small>
            ) : null}
          </div>

          <button type="submit" disabled={isLoading || isSubmitting}>
            {isLoading || isSubmitting ? "Signing in…" : "Login"}
          </button>
          {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
        </form>
      )}
    </Formik>
  );
}
