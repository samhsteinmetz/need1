import type React from "react"
import { View, Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

interface KarmaBarProps {
  score: number
  maxScore?: number
  showLabel?: boolean
  variant?: "default" | "compact" | "detailed"
  size?: "sm" | "md" | "lg"
}

export const KarmaBar: React.FC<KarmaBarProps> = ({ 
  score, 
  maxScore = 100, 
  showLabel = true,
  variant = "default",
  size = "md"
}) => {
  const percentage = Math.min((score / maxScore) * 100, 100)
  
  const sizeClasses = {
    sm: { height: 6, text: "text-xs" },
    md: { height: 8, text: "text-sm" },
    lg: { height: 12, text: "text-base" },
  }

  const getKarmaLevel = (score: number) => {
    if (score >= 80) return { level: "Elite", color: "from-purple-500 to-purple-600", textColor: "text-purple-600" }
    if (score >= 60) return { level: "Trusted", color: "from-emerald-500 to-emerald-600", textColor: "text-emerald-600" }
    if (score >= 40) return { level: "Reliable", color: "from-amber-500 to-amber-600", textColor: "text-amber-600" }
    if (score >= 20) return { level: "New", color: "from-blue-500 to-blue-600", textColor: "text-blue-600" }
    return { level: "Fresh", color: "from-gray-400 to-gray-500", textColor: "text-gray-600" }
  }

  const karmaLevel = getKarmaLevel(score)

  return (
    <View className="w-full space-y-2">
      {showLabel && (
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center space-x-2">
            <Text className={`${sizeClasses[size].text} font-semibold text-gray-700`}>
              Karma Score
            </Text>
            {variant === "detailed" && (
              <Text className={`${sizeClasses[size].text} font-medium ${karmaLevel.textColor}`}>
                {karmaLevel.level}
              </Text>
            )}
          </View>
          <Text className={`${sizeClasses[size].text} font-bold text-amber-600`}>
            {score}/{maxScore}
          </Text>
        </View>
      )}
      
      <View className={`
        rounded-full bg-gray-100 overflow-hidden
        shadow-sm
      `} style={{ height: sizeClasses[size].height }}>
        <LinearGradient
          colors={karmaLevel.color.includes("purple") ? ["#8b5cf6", "#7c3aed"] : 
                  karmaLevel.color.includes("emerald") ? ["#10b981", "#059669"] : 
                  karmaLevel.color.includes("amber") ? ["#f59e0b", "#d97706"] : 
                  karmaLevel.color.includes("blue") ? ["#3b82f6", "#2563eb"] : 
                  ["#9ca3af", "#6b7280"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="h-full rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </View>
      
      {variant === "compact" && (
        <Text className={`${sizeClasses[size].text} text-center font-medium ${karmaLevel.textColor}`}>
          {karmaLevel.level} • {score} points
        </Text>
      )}
    </View>
  )
}