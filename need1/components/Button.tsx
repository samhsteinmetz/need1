import type React from "react"
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  loading?: boolean
  className?: string
  icon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  icon,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-4 py-2.5 rounded-lg"
      case "md":
        return "px-6 py-3.5 rounded-xl"
      case "lg":
        return "px-8 py-4 rounded-2xl"
      default:
        return "px-6 py-3.5 rounded-xl"
    }
  }

  const getTextSize = () => {
    switch (size) {
      case "sm":
        return "text-sm"
      case "md":
        return "text-base"
      case "lg":
        return "text-lg"
      default:
        return "text-base"
    }
  }

  const getVariantConfig = () => {
    switch (variant) {
      case "primary":
        return {
          gradient: ["#0ea5e9", "#0284c7"],
          textColor: "text-white",
          shadow: "shadow-lg shadow-blue-500/25"
        }
      case "secondary":
        return {
          gradient: null,
          textColor: "text-gray-700",
          shadow: "shadow-md shadow-gray-500/10"
        }
      case "outline":
        return {
          gradient: null,
          textColor: "text-primary-600",
          shadow: "shadow-sm"
        }
      case "ghost":
        return {
          gradient: null,
          textColor: "text-primary-600",
          shadow: ""
        }
      case "danger":
        return {
          gradient: ["#ef4444", "#dc2626"],
          textColor: "text-white",
          shadow: "shadow-lg shadow-red-500/25"
        }
      case "success":
        return {
          gradient: null,
          textColor: "text-white",
          shadow: "shadow-lg shadow-green-500/25"
        }
      default:
        return {
          gradient: ["#0ea5e9", "#0284c7"],
          textColor: "text-white",
          shadow: "shadow-lg shadow-blue-500/25"
        }
    }
  }

  const config = getVariantConfig()
  const sizeStyles = getSizeStyles()
  const textSize = getTextSize()

  if (config.gradient) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        className={`${sizeStyles} ${config.shadow} ${disabled ? "opacity-50" : ""} ${className}`}
      >
        <LinearGradient
          colors={config.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className={`${sizeStyles} justify-center items-center flex-row`}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <>
              {icon && <View className="mr-2">{icon}</View>}
              <Text className={`${config.textColor} font-semibold ${textSize}`}>
                {title}
              </Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  // Non-gradient buttons
  const getNonGradientStyles = () => {
    switch (variant) {
      case "secondary":
        return "bg-gray-100 border border-gray-200"
      case "outline":
        return "bg-transparent border-2 border-primary-500"
      case "ghost":
        return "bg-transparent"
      case "success":
        return "bg-green-500"
      default:
        return "bg-gray-100 border border-gray-200"
    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      className={`${getNonGradientStyles()} ${sizeStyles} ${config.shadow} ${disabled ? "opacity-50" : ""} ${className}`}
    >
      <View className="flex-row items-center justify-center">
        {loading ? (
          <ActivityIndicator 
            color={variant === "secondary" ? "#374151" : "#0ea5e9"} 
            size="small" 
          />
        ) : (
          <>
            {icon && <View className="mr-2">{icon}</View>}
            <Text className={`${config.textColor} font-semibold ${textSize}`}>
              {title}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  )
} 