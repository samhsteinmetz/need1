import type React from "react"
import { View, Text, Image, ImageSourcePropType } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface AvatarProps {
  source?: ImageSourcePropType
  name?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  variant?: "circle" | "rounded" | "square"
  status?: "online" | "offline" | "away" | "busy"
  verified?: boolean
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = "md",
  variant = "circle",
  status,
  verified = false,
}) => {
  const sizeClasses = {
    xs: { size: 24, text: "text-xs" },
    sm: { size: 32, text: "text-sm" },
    md: { size: 48, text: "text-base" },
    lg: { size: 64, text: "text-lg" },
    xl: { size: 96, text: "text-xl" },
  }

  const variantClasses = {
    circle: "rounded-full",
    rounded: "rounded-2xl",
    square: "rounded-lg",
  }

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const statusSize = size === "xs" || size === "sm" ? 8 : 12

  return (
    <View className="relative">
      <View className={`
        ${variantClasses[variant]}
        bg-gradient-to-br from-primary-400 to-primary-600
        justify-center items-center
        shadow-md
      `} style={{ 
        width: sizeClasses[size].size, 
        height: sizeClasses[size].size 
      }}>
        {source ? (
          <Image
            source={source}
            className={`${variantClasses[variant]} w-full h-full`}
            resizeMode="cover"
          />
        ) : name ? (
          <Text className={`${sizeClasses[size].text} font-bold text-white`}>
            {getInitials(name)}
          </Text>
        ) : (
          <Ionicons 
            name="person" 
            size={sizeClasses[size].size * 0.4} 
            color="#ffffff" 
          />
        )}
      </View>

      {verified && (
        <View className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
          <View className="bg-emerald-500 rounded-full p-1">
            <Ionicons name="checkmark" size={8} color="#ffffff" />
          </View>
        </View>
      )}

      {status && (
        <View className={`
          absolute -bottom-0.5 -right-0.5
          ${statusColors[status]}
          rounded-full border-2 border-white
          shadow-sm
        `} style={{ 
          width: statusSize, 
          height: statusSize 
        }} />
      )}
    </View>
  )
} 