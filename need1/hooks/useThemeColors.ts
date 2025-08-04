import { useColorScheme } from "react-native"

export const useThemeColors = () => {
  const colorScheme = useColorScheme()
  
  return {
    isDark: colorScheme === "dark",
    primary: "#2d5a2d",
    secondary: "#6b7280",
    background: colorScheme === "dark" ? "#1f2937" : "#f9fafb",
    surface: colorScheme === "dark" ? "#374151" : "#ffffff",
    text: colorScheme === "dark" ? "#f9fafb" : "#111827",
    textSecondary: colorScheme === "dark" ? "#d1d5db" : "#6b7280",
  }
} 