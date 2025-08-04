import type React from "react"
import { View } from "react-native"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <View className={`bg-white rounded-lg border border-secondary-200 shadow-sm ${className}`}>
      {children}
    </View>
  )
} 