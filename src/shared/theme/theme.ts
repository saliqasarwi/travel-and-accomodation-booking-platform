import { createTheme, type PaletteMode } from "@mui/material/styles";

export function getAppTheme(mode: PaletteMode) {
  const isLight = mode === "light";

  return createTheme({
    /*ThemeOptions */
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
      background: isLight
        ? {
            default: "#F6F8FC",
            paper: "#FFFFFF",
          }
        : {
            default: "#0F172A",
            paper: "#111827",
          },
      text: isLight
        ? {
            primary: "#1F2937",
            secondary: "#6B7280",
          }
        : {
            primary: "#F3F4F6",
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
      divider: isLight ? "#E5E7EB" : "#273244",
    },

    typography: {
      fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
      h1: {
        fontSize: "3rem",
        fontWeight: 800,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "2.5rem",
        fontWeight: 800,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: "2rem",
        fontWeight: 700,
        lineHeight: 1.25,
      },
      h4: {
        fontSize: "1.75rem",
        fontWeight: 700,
        lineHeight: 1.3,
      },
      h5: {
        fontSize: "1.5rem",
        fontWeight: 700,
        lineHeight: 1.35,
      },
      h6: {
        fontSize: "1.25rem",
        fontWeight: 700,
        lineHeight: 1.4,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.7,
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.6,
      },
      button: {
        textTransform: "none",
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
            backgroundColor: isLight ? "#F6F8FC" : "#0F172A",
            color: isLight ? "#1F2937" : "#F3F4F6",
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isLight ? "#FFFFFF" : "#111827",
            color: isLight ? "#1F2937" : "#F3F4F6",
            boxShadow: isLight
              ? "0 4px 20px rgba(15, 23, 42, 0.08)"
              : "0 4px 20px rgba(0, 0, 0, 0.35)",
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
            boxShadow: isLight
              ? "0 10px 30px rgba(15, 23, 42, 0.08)"
              : "0 10px 30px rgba(0, 0, 0, 0.28)",
            border: `1px solid ${isLight ? "#EEF2F7" : "#1F2937"}`,
            backgroundImage: "none",
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
          variant: "outlined",
          fullWidth: true,
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: isLight ? "#FFFFFF" : "#111827",
          },
          notchedOutline: {
            borderColor: isLight ? "#D1D5DB" : "#334155",
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: `1px solid ${isLight ? "#E5E7EB" : "#273244"}`,
            backgroundColor: isLight ? "#FFFFFF" : "#111827",
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
  });
}
