import { useColorScheme } from "react-native"

export const useThemeColors = () => {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  return {
    isDark,
    colors: {
      primary: "#3B82F6",
      accent: "#F59E0B",
      background: isDark ? "#0F172A" : "#FFFFFF",
      surface: isDark ? "#1E293B" : "#F8FAFC",
      text: isDark ? "#F1F5F9" : "#0F172A",
      textSecondary: isDark ? "#94A3B8" : "#64748B",
      border: isDark ? "#334155" : "#E2E8F0",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
    },
  }
}
