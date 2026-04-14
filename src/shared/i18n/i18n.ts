import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      common: {
        search: "Search",
        clear: "Clear",
        create: "Create",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        loading: "Loading...",
        backToHome: "Back to Home",
        printBooking: "Print Booking",
        viewDetails: "View details",
        darkMode: "Dark mode",
        lightMode: "Light mode",
        myAccount: "My account",
        back: "Back",
      },

      nav: {
        home: "Home",
        search: "Search",
        cart: "Cart",
        profile: "Profile",
        bookings: "My Bookings",
        logout: "Logout",
        login: "Login",
      },

      admin: {
        panel: "Admin Panel",
        signedInAsAdmin: "Signed in as admin",

        cities: "Cities",
        hotels: "Hotels",
        rooms: "Rooms",

        createCity: "Create City",
        editCity: "Edit City",
        deleteCity: "Delete city",
        deleteCityMessage: "Are you sure you want to delete this city?",

        createHotel: "Create Hotel",
        editHotel: "Edit Hotel",
        deleteHotel: "Delete hotel",
        deleteHotelMessage: "Are you sure you want to delete this hotel?",

        createRoom: "Create Room",
        editRoom: "Edit Room",
        deleteRoom: "Delete room",
        deleteRoomMessage: "Are you sure you want to delete this room?",

        name: "Name",
        country: "Country",
        postOffice: "Post Office",
        numberOfHotels: "Number of Hotels",

        hotelName: "Hotel Name",
        location: "Location",
        starRating: "Star Rating",
        availableRooms: "Available Rooms",

        roomNumber: "Room Number",
        adults: "Adults",
        children: "Children",
        availability: "Availability",
        available: "Available",
        notAvailable: "Not available",

        created: "Created",
        modified: "Modified",
        actions: "Actions",

        searchPlaceholder: "Search {{entity}}...",
      },

      profile: {
        title: "Profile",
        subtitle: "Manage your personal information.",
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        phone: "Phone",
        city: "City",
        country: "Country",
        saveChanges: "Save changes",
        updatedSuccessfully: "Profile updated successfully.",
        loadFailed: "Failed to load profile.",
        updateFailed: "Failed to update profile.",
        personalInformation: "Personal information",
        notFound: "Profile not found.",
      },

      bookings: {
        title: "My Bookings",
        subtitle: "Review your confirmed bookings.",
        noBookings: "No bookings yet",
        noBookingsHint: "When you make a booking, it will appear here.",
        emptyStateTitle: "No bookings yet",
        emptyStateHint:
          "Your confirmed trips will appear here. Start exploring destinations and book your next stay with Travelio.",
        exploreHotels: "Explore hotels",
        loadFailed: "Failed to load bookings.",
        statusConfirmed: "Confirmed",
        createdLabel: "Created",
        bookingFallbackTitle: "Booking",
        roomSelection: "room selection",
        roomSelections: "room selections",
      },

      confirmation: {
        title: "Confirmation",
        subtitle: "Your booking has been confirmed successfully.",
        bookingConfirmed: "Booking confirmed",
        keepForRecords: "Keep this confirmation for your records.",
        confirmationNumber: "Confirmation number",
        created: "Created",
        hotelAndRooms: "Hotel & Rooms",
        guestInformation: "Guest information",
        specialRequests: "Special requests",
        totals: "Totals",
        subtotal: "Subtotal",
        discounts: "Discounts",
        total: "Total",
        name: "Name",
        email: "Email",
        phone: "Phone",
        noSpecialRequests: "No special requests",
        nightsLabel: "night(s)",
        totalLabel: "total",
        rateLabel: "Rate",
        roomsLabel: "room(s)",
        guestsLabel: "Guests",
        checkInLabel: "Check-in",
        checkOutLabel: "Check-out",
        roomLabel: "Room",
        hotelLabel: "Hotel",
        thankYou: "Thank you for your booking",
      },

      cart: {
        title: "Cart",
        subtitle: "Review selected rooms before checkout.",
        emptyTitle: "Your cart is empty",
        emptyHint: "Add rooms to continue",
        exploreHotels: "Explore hotels",
        proceedToCheckout: "Proceed to checkout",
        removeItem: "Remove item",
        removeItemMessage:
          "Are you sure you want to remove this item from the cart?",
        remove: "Remove",
        nights: "night(s)",
        rooms: "room(s)",
        adults: "adults",
        children: "children",
        total: "total",
        startExploring:
          "Start exploring stays and add your favorite rooms here.",
      },

      notFound: {
        title: "404 - Page Not Found",
        subtitle:
          "The page you are looking for does not exist or may have been moved.",
      },
    },
  },

  ar: {
    translation: {
      common: {
        search: "بحث",
        clear: "مسح",
        create: "إنشاء",
        save: "حفظ",
        cancel: "إلغاء",
        delete: "حذف",
        edit: "تعديل",
        loading: "جاري التحميل...",
        backToHome: "العودة للرئيسية",
        printBooking: "طباعة الحجز",
        viewDetails: "عرض التفاصيل",
        darkMode: "الوضع الداكن",
        lightMode: "الوضع الفاتح",
        myAccount: "حسابي",
        back: "رجوع",
      },

      nav: {
        home: "الرئيسية",
        search: "البحث",
        cart: "السلة",
        profile: "الملف الشخصي",
        bookings: "حجوزاتي",
        logout: "تسجيل الخروج",
        login: "تسجيل الدخول",
      },

      admin: {
        panel: "لوحة التحكم",
        signedInAsAdmin: "تم تسجيل الدخول كمسؤول",

        cities: "المدن",
        hotels: "الفنادق",
        rooms: "الغرف",

        createCity: "إنشاء مدينة",
        editCity: "تعديل مدينة",
        deleteCity: "حذف المدينة",
        deleteCityMessage: "هل أنت متأكد أنك تريد حذف هذه المدينة؟",

        createHotel: "إنشاء فندق",
        editHotel: "تعديل فندق",
        deleteHotel: "حذف الفندق",
        deleteHotelMessage: "هل أنت متأكد أنك تريد حذف هذا الفندق؟",

        createRoom: "إنشاء غرفة",
        editRoom: "تعديل غرفة",
        deleteRoom: "حذف الغرفة",
        deleteRoomMessage: "هل أنت متأكد أنك تريد حذف هذه الغرفة؟",

        name: "الاسم",
        country: "الدولة",
        postOffice: "مكتب البريد",
        numberOfHotels: "عدد الفنادق",

        hotelName: "اسم الفندق",
        location: "الموقع",
        starRating: "التقييم",
        availableRooms: "الغرف المتاحة",

        roomNumber: "رقم الغرفة",
        adults: "البالغون",
        children: "الأطفال",
        availability: "التوفر",
        available: "متاح",
        notAvailable: "غير متاح",

        created: "تاريخ الإنشاء",
        modified: "آخر تعديل",
        actions: "الإجراءات",

        searchPlaceholder: "ابحث في {{entity}}...",
      },

      profile: {
        title: "الملف الشخصي",
        subtitle: "إدارة معلوماتك الشخصية.",
        firstName: "الاسم الأول",
        lastName: "اسم العائلة",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        city: "المدينة",
        country: "الدولة",
        saveChanges: "حفظ التغييرات",
        updatedSuccessfully: "تم تحديث الملف الشخصي بنجاح.",
        loadFailed: "فشل تحميل الملف الشخصي.",
        updateFailed: "فشل تحديث الملف الشخصي.",
        personalInformation: "المعلومات الشخصية",
        notFound: "الملف الشخصي غير موجود.",
      },

      bookings: {
        title: "حجوزاتي",
        subtitle: "استعرض حجوزاتك المؤكدة.",
        noBookings: "لا توجد حجوزات بعد",
        noBookingsHint: "عند إجراء حجز، سيظهر هنا.",
        emptyStateTitle: "لا توجد حجوزات بعد",
        emptyStateHint:
          "ستظهر رحلاتك المؤكدة هنا. ابدئي باستكشاف الوجهات واحجزي إقامتك القادمة مع Travelio.",
        exploreHotels: "استكشف الفنادق",
        loadFailed: "فشل تحميل الحجوزات.",
        statusConfirmed: "مؤكد",
        createdLabel: "تاريخ الإنشاء",
        bookingFallbackTitle: "حجز",
        roomSelection: "اختيار غرفة",
        roomSelections: "اختيارات غرف",
      },

      confirmation: {
        title: "تأكيد الحجز",
        subtitle: "تم تأكيد حجزك بنجاح.",
        bookingConfirmed: "تم تأكيد الحجز",
        keepForRecords: "احتفظ بهذا التأكيد في سجلاتك.",
        confirmationNumber: "رقم التأكيد",
        created: "تاريخ الإنشاء",
        hotelAndRooms: "الفندق والغرف",
        guestInformation: "معلومات النزيل",
        specialRequests: "الطلبات الخاصة",
        totals: "الإجمالي",
        subtotal: "المجموع الفرعي",
        discounts: "الخصومات",
        total: "الإجمالي الكلي",
        name: "الاسم",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        noSpecialRequests: "لا توجد طلبات خاصة",
        nightsLabel: "ليلة",
        totalLabel: "الإجمالي",
        rateLabel: "السعر",
        roomsLabel: "غرفة",
        guestsLabel: "الضيوف",
        checkInLabel: "تسجيل الدخول",
        checkOutLabel: "تسجيل الخروج",
        roomLabel: "الغرفة",
        hotelLabel: "الفندق",
        thankYou: "شكرًا لحجزك",
      },

      cart: {
        title: "السلة",
        subtitle: "راجع الغرف المختارة قبل إتمام الحجز.",
        emptyTitle: "السلة فارغة",
        emptyHint: "أضف غرفًا للمتابعة",
        exploreHotels: "استكشف الفنادق",
        proceedToCheckout: "إتمام الحجز",
        removeItem: "إزالة العنصر",
        removeItemMessage: "هل أنت متأكد أنك تريد إزالة هذا العنصر من السلة؟",
        remove: "إزالة",
        nights: "ليلة",
        rooms: "غرفة",
        adults: "بالغين",
        children: "أطفال",
        total: "الإجمالي",
        startExploring: "ابدأ باستكشاف الإقامات وأضف غرفك المفضلة هنا.",
      },

      notFound: {
        title: "404 - الصفحة غير موجودة",
        subtitle: "الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
