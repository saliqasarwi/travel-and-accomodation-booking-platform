import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { ltrCache, rtlCache } from "@shared/theme/rtlCache";
import { ColorModeContext } from "./ColorModeContext";

type ColorMode = "light" | "dark";

type Props = {
  children: ReactNode;
};

function getDesignTokens(mode: ColorMode, direction: "ltr" | "rtl") {
  return {
    direction,
    palette: {
      mode,
      primary: {
        main: "#1565C0",
        light: "#5E92F3",
        dark: "#003C8F",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#0F9D94",
        light: "#52C7B8",
        dark: "#0A6E67",
        contrastText: "#FFFFFF",
      },
      background:
        mode === "light"
          ? {
              default: "#F6F8FC",
              paper: "#FFFFFF",
            }
          : {
              default: "#061126",
              paper: "#0B1730",
            },
      text:
        mode === "light"
          ? {
              primary: "#1F2937",
              secondary: "#6B7280",
            }
          : {
              primary: "#E5E7EB",
              secondary: "#9CA3AF",
            },
      success: {
        main: "#16A34A",
      },
      error: {
        main: "#DC2626",
      },
      warning: {
        main: "#F59E0B",
      },
      divider: mode === "light" ? "#E5E7EB" : "#24324D",
    },
    typography: {
      fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
      h1: { fontSize: "3rem", fontWeight: 800, lineHeight: 1.2 },
      h2: { fontSize: "2.5rem", fontWeight: 800, lineHeight: 1.2 },
      h3: { fontSize: "2rem", fontWeight: 700, lineHeight: 1.25 },
      h4: { fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.3 },
      h5: { fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.35 },
      h6: { fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.4 },
      body1: { fontSize: "1rem", lineHeight: 1.7 },
      body2: { fontSize: "0.875rem", lineHeight: 1.6 },
      button: {
        textTransform: "none" as const,
        fontWeight: 700,
        fontSize: "0.95rem",
      },
    },
    shape: {
      borderRadius: 14,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === "light" ? "#F6F8FC" : "#061126",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#FFFFFF" : "#0B1730",
            color: mode === "light" ? "#1F2937" : "#E5E7EB",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.08)",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 12,
            paddingInline: 18,
            paddingBlock: 10,
          },
          containedPrimary: {
            background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
            color: "#FFFFFF",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
            border: "1px solid",
            borderColor: mode === "light" ? "#EEF2F7" : "#24324D",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: {
            borderRadius: 16,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined" as const,
          fullWidth: true,
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: mode === "light" ? "#FFFFFF" : "#0B1730",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: "1px solid",
            borderColor: mode === "light" ? "#E5E7EB" : "#24324D",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            fontWeight: 600,
          },
        },
      },
    },
  };
}

export function ColorModeProvider({ children }: Props) {
  const [mode, setMode] = useState<ColorMode>(() => {
    const saved = localStorage.getItem("color-mode");
    return saved === "dark" ? "dark" : "light";
  });

  const { i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");
  const direction = isArabic ? "rtl" : "ltr";

  useEffect(() => {
    localStorage.setItem("color-mode", mode);
  }, [mode]);

  useEffect(() => {
    document.documentElement.lang = isArabic ? "ar" : "en";
    document.documentElement.dir = direction;
  }, [direction, isArabic]);

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode, direction)),
    [mode, direction]
  );

  const cache = useMemo(
    () => (direction === "rtl" ? rtlCache : ltrCache),
    [direction]
  );

  const value = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={value}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </CacheProvider>
    </ColorModeContext.Provider>
  );
}
