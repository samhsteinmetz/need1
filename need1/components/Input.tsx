import type React from "react"
import { View, Text, TextInput, TextInputProps } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  leftIcon?: keyof typeof Ionicons.glyphMap
  rightIcon?: keyof typeof Ionicons.glyphMap
  variant?: "default" | "filled" | "outline"
  size?: "sm" | "md" | "lg"
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  const sizeClasses = {
    sm: "h-10 px-3 text-sm",
    md: "h-12 px-4 text-base",
    lg: "h-14 px-4 text-lg",
  }

  const variantClasses = {
    default: "bg-white border border-gray-200 focus:border-primary-500",
    filled: "bg-gray-50 border border-transparent focus:bg-white focus:border-primary-500",
    outline: "bg-transparent border-2 border-gray-200 focus:border-primary-500",
  }

  const iconSize = size === "sm" ? 16 : size === "md" ? 18 : 20

  return (
    <View className="space-y-1">
      {label && (
        <Text className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </Text>
      )}
      
      <View className="relative">
        {leftIcon && (
          <View className="absolute left-3 top-0 bottom-0 justify-center z-10">
            <Ionicons 
              name={leftIcon} 
              size={iconSize} 
              color="#6b7280" 
            />
          </View>
        )}
        
        <TextInput
          className={`
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            rounded-xl font-normal text-gray-900
            placeholder:text-gray-400
            focus:outline-none
            ${error ? "border-red-500" : ""}
            ${className}
          `}
          placeholderTextColor="#9ca3af"
          {...props}
        />
        
        {rightIcon && (
          <View className="absolute right-3 top-0 bottom-0 justify-center z-10">
            <Ionicons 
              name={rightIcon} 
              size={iconSize} 
              color="#6b7280" 
            />
          </View>
        )}
      </View>
      
      {error && (
        <Text className="text-sm text-red-500 mt-1">
          {error}
        </Text>
      )}
    </View>
  )
} 