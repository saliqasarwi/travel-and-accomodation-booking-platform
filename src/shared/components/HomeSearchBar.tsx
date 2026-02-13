import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addDays, toIsoDate } from "@shared/utils/date";

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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
    <section
      style={{ border: "1px solid #ddd", borderRadius: 10, padding: "1rem" }}
    >
      <h2 style={{ marginTop: 0 }}>Search</h2>

      <Formik<Values>
        initialValues={initialValues}
        enableReinitialize // ✅ critical
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
          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "0.75rem",
              alignItems: "end",
            }}
          >
            <div style={{ gridColumn: "1 / -1" }}>
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                placeholder="Where are you going?"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "100%", padding: "0.6rem" }}
              />
              {touched.city && errors.city ? (
                <small style={{ color: "crimson" }}>{errors.city}</small>
              ) : null}
            </div>

            <div>
              <label htmlFor="checkInDate">Check-in</label>
              <input
                id="checkInDate"
                name="checkInDate"
                type="date"
                value={values.checkInDate}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "100%", padding: "0.6rem" }}
              />
              {touched.checkInDate && errors.checkInDate ? (
                <small style={{ color: "crimson" }}>{errors.checkInDate}</small>
              ) : null}
            </div>

            <div>
              <label htmlFor="checkOutDate">Check-out</label>
              <input
                id="checkOutDate"
                name="checkOutDate"
                type="date"
                value={values.checkOutDate}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "100%", padding: "0.6rem" }}
              />
              {touched.checkOutDate && errors.checkOutDate ? (
                <small style={{ color: "crimson" }}>
                  {errors.checkOutDate}
                </small>
              ) : null}
            </div>

            <div>
              <label htmlFor="adults">Adults</label>
              <select
                id="adults"
                name="adults"
                value={values.adults}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "100%", padding: "0.6rem" }}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              {touched.adults && errors.adults ? (
                <small style={{ color: "crimson" }}>{errors.adults}</small>
              ) : null}
            </div>

            <div>
              <label htmlFor="children">Children</label>
              <select
                id="children"
                name="children"
                value={values.children}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "100%", padding: "0.6rem" }}
              >
                {Array.from({ length: 11 }, (_, i) => i).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              {touched.children && errors.children ? (
                <small style={{ color: "crimson" }}>{errors.children}</small>
              ) : null}
            </div>

            <div>
              <label htmlFor="numberOfRooms">Rooms</label>
              <select
                id="numberOfRooms"
                name="numberOfRooms"
                value={values.numberOfRooms}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "100%", padding: "0.6rem" }}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              {touched.numberOfRooms && errors.numberOfRooms ? (
                <small style={{ color: "crimson" }}>
                  {errors.numberOfRooms}
                </small>
              ) : null}
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{ padding: "0.7rem 1rem" }}
              >
                Search
              </button>
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
}
