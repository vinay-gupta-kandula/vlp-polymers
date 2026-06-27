"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "classic" | "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("classic");
  useEffect(() => {
    // Read theme from localStorage on client-side mount
    const savedTheme = localStorage.getItem("vlp-theme") as Theme;
    if (savedTheme && ["classic", "light", "dark"].includes(savedTheme)) {
      setThemeState(savedTheme);

      const root = document.documentElement;
      root.classList.remove("theme-light", "theme-dark", "dark");
      if (savedTheme === "dark") {
        root.classList.add("theme-dark", "dark");
      } else if (savedTheme === "light") {
        root.classList.add("theme-light");
      }
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("vlp-theme", newTheme);

    if (typeof window !== "undefined") {
      const root = document.documentElement;
      root.classList.remove("theme-light", "theme-dark", "dark");
      if (newTheme === "dark") {
        root.classList.add("theme-dark", "dark");
      } else if (newTheme === "light") {
        root.classList.add("theme-light");
      }
    }
  };

  // Prevent hydration layout shift by delaying children rendering or just rendering them with defaults
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
