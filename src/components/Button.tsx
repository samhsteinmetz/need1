import type React from "react"
import { TouchableOpacity, Text, ActivityIndicator } from "react-native"

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: "primary" | "secondary" | "outline" | "danger"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  loading?: boolean
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-500 active:bg-blue-600"
      case "secondary":
        return "bg-gray-500 active:bg-gray-600"
      case "outline":
        return "border-2 border-blue-500 bg-transparent active:bg-blue-50 dark:active:bg-blue-900"
      case "danger":
        return "bg-red-500 active:bg-red-600"
      default:
        return "bg-blue-500 active:bg-blue-600"
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-3 py-2"
      case "md":
        return "px-4 py-3"
      case "lg":
        return "px-6 py-4"
      default:
        return "px-4 py-3"
    }
  }

  const getTextStyles = () => {
    const baseStyles = "font-semibold text-center"
    const colorStyles = variant === "outline" ? "text-blue-500" : "text-white"

    const sizeStyles = size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"

    return `${baseStyles} ${colorStyles} ${sizeStyles}`
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        rounded-xl
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${disabled || loading ? "opacity-50" : ""}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? "#3B82F6" : "white"} />
      ) : (
        <Text className={getTextStyles()}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}
