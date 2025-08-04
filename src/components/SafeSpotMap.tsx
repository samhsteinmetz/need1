import type React from "react"
import { View, Text } from "react-native"
import { Shield } from "lucide-react-native"
import { mockSafeSpots } from "../../src copy/lib/mockData"

interface SafeSpotMapProps {
  height?: number
  showTitle?: boolean
}

export const SafeSpotMap: React.FC<SafeSpotMapProps> = ({ height = 200, showTitle = true }) => {
  return (
    <View>
      {showTitle && (
        <View className="flex-row items-center mb-2">
          <Shield size={20} color="#10B981" />
          <Text className="text-lg font-semibold text-gray-900 dark:text-white ml-2">Safe Exchange Spots</Text>
        </View>
      )}

      <View 
        className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
        style={{ height }}
      >
        <View className="flex-1 justify-center items-center p-4">
          <Shield size={32} color="#10B981" />
          <Text className="text-gray-600 dark:text-gray-300 mt-2 text-center">
            Map temporarily unavailable
          </Text>
          <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
            {mockSafeSpots.length} safe spots available on campus
          </Text>
        </View>
      </View>

      <Text className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Green pins show campus police-monitored exchange zones
      </Text>
    </View>
  )
}
