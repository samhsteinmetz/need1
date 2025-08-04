import type React from "react"
import { TouchableOpacity, Text, ActivityIndicator } from "react-native"
import type { TouchableOpacityProps } from "react-native"

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: "primary" | "secondary" | "outline" | "destructive"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses = "flex-row items-center justify-center rounded-lg font-medium"
  
  const variantClasses = {
    primary: "bg-primary-500 active:bg-primary-600",
    secondary: "bg-secondary-100 active:bg-secondary-200",
    outline: "border border-primary-500 bg-transparent",
    destructive: "bg-destructive-500 active:bg-destructive-600",
  }
  
  const sizeClasses = {
    sm: "px-3 py-2",
    md: "px-4 py-3", 
    lg: "px-6 py-4",
  }
  
  const textClasses = {
    primary: "text-white",
    secondary: "text-secondary-700",
    outline: "text-primary-500",
    destructive: "text-white",
  }
  
  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  return (
    <TouchableOpacity
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled ? "opacity-50" : ""
      }`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === "outline" ? "#2d5a2d" : "#ffffff"} 
        />
      ) : (
        <Text 
          className={`${textClasses[variant]} ${textSizeClasses[size]} font-medium`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
} 