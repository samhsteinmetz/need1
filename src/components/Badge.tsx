import type React from "react"
import { View, Text } from "react-native"
import { CheckCircle, Leaf, Star } from "lucide-react-native"

interface BadgeProps {
  type: "verified" | "karma" | "eco"
  value?: number
  size?: "sm" | "md" | "lg"
}

export const Badge: React.FC<BadgeProps> = ({ type, value, size = "md" }) => {
  const getIcon = () => {
    const iconSize = size === "sm" ? 12 : size === "lg" ? 20 : 16

    switch (type) {
      case "verified":
        return <CheckCircle size={iconSize} color="#10B981" />
      case "karma":
        return <Star size={iconSize} color="#F59E0B" />
      case "eco":
        return <Leaf size={iconSize} color="#10B981" />
    }
  }

  const getStyles = () => {
    const baseStyles = "flex-row items-center rounded-full px-2 py-1"

    switch (type) {
      case "verified":
        return `${baseStyles} bg-green-100 dark:bg-green-900`
      case "karma":
        return `${baseStyles} bg-amber-100 dark:bg-amber-900`
      case "eco":
        return `${baseStyles} bg-green-100 dark:bg-green-900`
    }
  }

  const getTextColor = () => {
    switch (type) {
      case "verified":
        return "text-green-800 dark:text-green-200"
      case "karma":
        return "text-amber-800 dark:text-amber-200"
      case "eco":
        return "text-green-800 dark:text-green-200"
    }
  }

  const getText = () => {
    switch (type) {
      case "verified":
        return "Verified"
      case "karma":
        return `${value || 0} Karma`
      case "eco":
        return `${value || 0} Eco Points`
    }
  }

  const textSize = size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"

  return (
    <View className={getStyles()}>
      {getIcon()}
      <Text className={`${getTextColor()} ${textSize} font-medium ml-1`}>{getText()}</Text>
    </View>
  )
}
