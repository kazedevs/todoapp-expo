import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ColorScheme {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  gradients: {
    background: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
  };
  backgrounds: {
    input: string;
    editInput: string;
  };
  statusBarStyle: "light-content" | "dark-content";
}

const lightColors: ColorScheme = {
  bg: "#f8fafc", // Slate 50
  surface: "#ffffff",
  text: "#0f172a", // Slate 900
  textMuted: "#475569", // Slate 600
  border: "#cbd5e1", // Slate 300
  primary: "#6366f1", // Indigo 500
  success: "#22c55e", // Green 500
  warning: "#f59e0b", // Amber 500
  danger: "#ef4444", // Red 500
  shadow: "#94a3b8",
  gradients: {
    background: ["#f8fafc", "#e0e7ff"], // Slate 50 -> Indigo 100 (Cool, punchy light mode)
    surface: ["#ffffff", "#f8fafc"],
    primary: ["#6366f1", "#4f46e5"],
    success: ["#22c55e", "#16a34a"],
    warning: ["#f59e0b", "#d97706"],
    danger: ["#ef4444", "#dc2626"],
    muted: ["#94a3b8", "#64748b"],
    empty: ["#f1f5f9", "#e2e8f0"],
  },
  backgrounds: {
    input: "#ffffff",
    editInput: "#ffffff",
  },
  statusBarStyle: "dark-content" as const,
};

const darkColors: ColorScheme = {
  bg: "#020617", // Slate 950
  surface: "#0f172a", // Slate 900
  text: "#f8fafc",
  textMuted: "#94a3b8",
  border: "#1e293b",
  primary: "#818cf8", // Indigo 400
  success: "#4ade80", // Green 400
  warning: "#fbbf24", // Amber 400
  danger: "#f87171", // Red 400
  shadow: "#000000",
  gradients: {
    background: ["#020617", "#1e1b4b"], // Deep dark to indigo tint
    surface: ["#0f172a", "#1e293b"],
    primary: ["#818cf8", "#6366f1"],
    success: ["#4ade80", "#22c55e"],
    warning: ["#fbbf24", "#f59e0b"],
    danger: ["#f87171", "#ef4444"],
    muted: ["#4b5563", "#374151"],
    empty: ["#1e293b", "#334155"],
  },
  backgrounds: {
    input: "#1e293b",
    editInput: "#0f172a",
  },
  statusBarStyle: "light-content" as const,
};

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ColorScheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("darkMode").then((value) => {
      if (value) setIsDarkMode(JSON.parse(value));
    });
  }, []);

  const toggleDarkMode = async () => {
    const newNode = !isDarkMode;
    setIsDarkMode(newNode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newNode));
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
