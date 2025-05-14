"use client";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#634394",
    },
    secondary: {
      main: "#9c27b0",
    },
  },
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          "&.Mui-selected": {
            backgroundColor: "#634394",
            color: "white",
            "&:hover": {
              backgroundColor: "#5a3a84",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  },
});

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
