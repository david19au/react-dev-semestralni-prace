import React, { useState, useEffect, useCallback, type ReactNode } from "react";
import { ThemeContext, type Theme } from "../context/theme.context";

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const storedTheme = localStorage.getItem("app-theme") as Theme | null;
      if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
      }
    } catch (error) {
      console.error("Could not read theme from localStorage", error);
    }
    return "dark";
  });

  useEffect(() => {
    const bodyClassList = document.body.classList;
    if (theme === "light") {
      bodyClassList.add("light-theme");
    } else {
      bodyClassList.remove("light-theme");
    }

    try {
      localStorage.setItem("app-theme", theme);
    } catch (error) {
      console.error("Could not save theme to localStorage", error);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
