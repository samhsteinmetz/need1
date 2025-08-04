import type React from "react"
import { View, Text } from "react-native"

interface KarmaBarProps {
  score: number
  maxScore?: number
  showLabel?: boolean
}

export const KarmaBar: React.FC<KarmaBarProps> = ({ score, maxScore = 100, showLabel = true }) => {
  const percentage = Math.min((score / maxScore) * 100, 100)

  return (
    <View className="w-full">
      {showLabel && (
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Karma Score</Text>
          <Text className="text-sm font-bold text-amber-600 dark:text-amber-400">
            {score}/{maxScore}
          </Text>
        </View>
      )}
      <View className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <View
          className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </View>
    </View>
  )
} 