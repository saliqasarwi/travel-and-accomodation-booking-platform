import * as Yup from "yup";
import type { HomeSearchBarValues } from "./homeSearchBar.types";

export const homeSearchBarSchema: Yup.ObjectSchema<HomeSearchBarValues> =
  Yup.object({
    city: Yup.string().trim().required("City is required"),
    checkInDate: Yup.string().required("Check-in date is required"),
    checkOutDate: Yup.string()
      .required("Check-out date is required")
      .test(
        "after-checkin",
        "Check-out must be after check-in",
        function (checkOut) {
          const { checkInDate } = this.parent as HomeSearchBarValues;
          if (!checkInDate || !checkOut) return true;
          return checkOut > checkInDate;
        }
      ),
    adults: Yup.number().min(1, "At least 1 adult").required(),
    children: Yup.number().min(0, "Children cannot be negative").required(),
    numberOfRooms: Yup.number().min(1, "At least 1 room").required(),
  });
