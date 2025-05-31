"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeProviderContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<
  ThemeProviderContextType | undefined
>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("theme") as Theme | null;
      if (storedTheme && (storedTheme === "dark" || storedTheme === "light")) {
        setTheme(storedTheme);
      }
    } catch (error) {
      console.warn("Failed to load theme from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (!isLoaded) return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Save theme to localStorage //
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error);
    }
  }, [theme, isLoaded]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const value: ThemeProviderContextType = {
    theme,
    setTheme: handleSetTheme,
  };

  if (!isLoaded) {
    return null;
  }

  return React.createElement(
    ThemeProviderContext.Provider,
    { value },
    children
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
