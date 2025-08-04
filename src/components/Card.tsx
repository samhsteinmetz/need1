import type React from "react"
import { View, type ViewProps } from "react-native"

interface CardProps extends ViewProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  return (
    <View
      className={`
        bg-white dark:bg-slate-800
        rounded-2xl
        shadow-sm
        border border-gray-100 dark:border-slate-700
        ${className}
      `}
      {...props}
    >
      {children}
    </View>
  )
}
