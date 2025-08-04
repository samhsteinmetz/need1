import type React from "react"
import { View, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface BadgeProps {
  type: "verified" | "karma" | "eco" | "new" | "urgent" | "popular"
  value?: number
  size?: "xs" | "sm" | "md" | "lg"
  variant?: "solid" | "outline" | "ghost"
}

export const Badge: React.FC<BadgeProps> = ({ 
  type, 
  value, 
  size = "md", 
  variant = "solid" 
}) => {
  const sizeClasses = {
    xs: "px-1.5 py-0.5 text-xs",
    sm: "px-2 py-1 text-xs",
    md: "px-2.5 py-1.5 text-sm", 
    lg: "px-3 py-2 text-base",
  }

  const typeConfig = {
    verified: {
      solid: { bg: "bg-emerald-500", text: "text-white", border: "border-emerald-500" },
      outline: { bg: "bg-transparent", text: "text-emerald-600", border: "border-emerald-200" },
      ghost: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-transparent" },
      icon: "checkmark-circle",
      label: "Verified",
    },
    karma: {
      solid: { bg: "bg-amber-500", text: "text-white", border: "border-amber-500" },
      outline: { bg: "bg-transparent", text: "text-amber-600", border: "border-amber-200" },
      ghost: { bg: "bg-amber-50", text: "text-amber-700", border: "border-transparent" },
      icon: "star",
      label: value ? `${value} Karma` : "Karma",
    },
    eco: {
      solid: { bg: "bg-green-500", text: "text-white", border: "border-green-500" },
      outline: { bg: "bg-transparent", text: "text-green-600", border: "border-green-200" },
      ghost: { bg: "bg-green-50", text: "text-green-700", border: "border-transparent" },
      icon: "leaf",
      label: "Eco Impact",
    },
    new: {
      solid: { bg: "bg-blue-500", text: "text-white", border: "border-blue-500" },
      outline: { bg: "bg-transparent", text: "text-blue-600", border: "border-blue-200" },
      ghost: { bg: "bg-blue-50", text: "text-blue-700", border: "border-transparent" },
      icon: "sparkles",
      label: "New",
    },
    urgent: {
      solid: { bg: "bg-red-500", text: "text-white", border: "border-red-500" },
      outline: { bg: "bg-transparent", text: "text-red-600", border: "border-red-200" },
      ghost: { bg: "bg-red-50", text: "text-red-700", border: "border-transparent" },
      icon: "flash",
      label: "Urgent",
    },
    popular: {
      solid: { bg: "bg-purple-500", text: "text-white", border: "border-purple-500" },
      outline: { bg: "bg-transparent", text: "text-purple-600", border: "border-purple-200" },
      ghost: { bg: "bg-purple-50", text: "text-purple-700", border: "border-transparent" },
      icon: "trending-up",
      label: "Popular",
    },
  }

  const config = typeConfig[type]
  const style = config[variant]

  const getIconSize = () => {
    switch (size) {
      case "xs": return 10
      case "sm": return 12
      case "md": return 14
      case "lg": return 16
      default: return 14
    }
  }

  return (
    <View className={`
      flex-row items-center rounded-full border
      ${style.bg} ${style.text} ${style.border}
      ${sizeClasses[size]}
      shadow-sm
    `}>
      <Ionicons 
        name={config.icon as any} 
        size={getIconSize()} 
        color={style.text.includes("white") ? "#ffffff" : "#059669"} 
      />
      <Text className={`${style.text} font-semibold ml-1`}>
        {config.label}
      </Text>
    </View>
  )
} 