// ThemeContext.jsx
import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#6366f1" },
          background: { default: "#f9fafb", paper: "#ffffff" },
          text: { primary: "#6366f1", secondary: "#475569" },
        }
      : {
          primary: { main: "#8b5cf6" },
          background: { default: "#0f172a", paper: "#1e293b" },
          text: { primary: "#6366f1", secondary: "#cbd5e1" },
        }),
  },
});

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
