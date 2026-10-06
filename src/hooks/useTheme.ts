import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem("theme");

  return saved === "dark" ? "dark" : "light";
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return {
    theme,
    toggleTheme,
  };
}