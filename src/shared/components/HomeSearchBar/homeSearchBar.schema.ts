import * as Yup from "yup";
import i18n from "@shared/i18n/i18n";
import type { HomeSearchBarValues } from "./homeSearchBar.types";

export const homeSearchBarSchema: Yup.ObjectSchema<HomeSearchBarValues> =
  Yup.object({
    city: Yup.string().trim().required(i18n.t("validation.cityRequired")),

    checkInDate: Yup.string().required(i18n.t("validation.checkInRequired")),

    checkOutDate: Yup.string()
      .required(i18n.t("validation.checkOutRequired"))
      .test(
        "after-checkin",
        i18n.t("validation.checkOutAfterCheckIn"),
        function (checkOut) {
          const { checkInDate } = this.parent as HomeSearchBarValues;
          if (!checkInDate || !checkOut) return true;
          return checkOut > checkInDate;
        }
      ),

    adults: Yup.number()
      .min(1, i18n.t("validation.atLeastOneAdult"))
      .required(i18n.t("validation.adultsRequired")),

    children: Yup.number()
      .min(0, i18n.t("validation.childrenNegative"))
      .required(i18n.t("validation.childrenRequired")),

    numberOfRooms: Yup.number()
      .min(1, i18n.t("validation.atLeastOneRoom"))
      .required(i18n.t("validation.roomsRequired")),
  });
