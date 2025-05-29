import React from "react";
import { useTheme } from "../context/theme.context";

export const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`} //hover tooltip
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};
