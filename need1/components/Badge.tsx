import type React from "react"
import { View, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface BadgeProps {
  type: "verified" | "karma" | "eco"
  value?: number
  size?: "sm" | "md" | "lg"
}

export const Badge: React.FC<BadgeProps> = ({ type, value, size = "md" }) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm", 
    lg: "px-4 py-2 text-base",
  }

  const typeConfig = {
    verified: {
      bg: "bg-primary-100",
      text: "text-primary-700",
      icon: "checkmark-circle",
      label: "Verified",
    },
    karma: {
      bg: "bg-accent-100",
      text: "text-accent-700", 
      icon: "star",
      label: value ? `${value} Karma` : "Karma",
    },
    eco: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: "leaf",
      label: "Eco Impact",
    },
  }

  const config = typeConfig[type]

  return (
    <View className={`flex-row items-center rounded-full ${config.bg} ${sizeClasses[size]}`}>
      <Ionicons 
        name={config.icon as any} 
        size={size === "sm" ? 12 : size === "md" ? 14 : 16} 
        color={config.text.replace("text-", "").includes("primary") ? "#2d5a2d" : "#16a34a"} 
      />
      <Text className={`${config.text} font-medium ml-1`}>
        {config.label}
      </Text>
    </View>
  )
} 