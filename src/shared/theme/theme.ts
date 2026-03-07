import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
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
    background: {
      default: "#F6F8FC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
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
    divider: "#E5E7EB",
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
          backgroundColor: "#F6F8FC",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#1F2937",
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
          border: "1px solid #EEF2F7",
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
          backgroundColor: "#FFFFFF",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #E5E7EB",
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
