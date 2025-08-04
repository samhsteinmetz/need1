import type React from "react"
import { View, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

interface CardProps {
  children: React.ReactNode
  variant?: "default" | "elevated" | "gradient" | "glass"
  className?: string
  onPress?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  className = "",
  onPress,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "elevated":
        return "bg-white shadow-large rounded-2xl"
      case "gradient":
        return "bg-gradient-to-br from-white to-secondary-50 shadow-medium rounded-2xl"
      case "glass":
        return "bg-white/80 backdrop-blur-sm shadow-soft rounded-2xl"
      default:
        return "bg-white shadow-soft rounded-xl"
    }
  }

  const CardContainer = onPress ? TouchableOpacity : View

  return (
    <CardContainer
      className={`${getVariantStyles()} ${className}`}
      onPress={onPress}
      activeOpacity={onPress ? 0.95 : 1}
    >
      {variant === "gradient" ? (
        <LinearGradient
          colors={["#ffffff", "#f8fafc"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-2xl"
        >
          {children}
        </LinearGradient>
      ) : (
        children
      )}
    </CardContainer>
  )
} 