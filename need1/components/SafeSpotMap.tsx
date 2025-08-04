import type React from "react"
import { View, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "./Card"

interface SafeSpot {
  id: string
  name: string
  location: string
  coordinates: {
    latitude: number
    longitude: number
  }
}

interface SafeSpotMapProps {
  safeSpots: SafeSpot[]
  onSpotPress?: (spot: SafeSpot) => void
}

export const SafeSpotMap: React.FC<SafeSpotMapProps> = ({
  safeSpots,
  onSpotPress,
}) => {
  return (
    <Card className="p-4">
      <View className="flex-row items-center mb-4">
        <Ionicons name="location" size={20} color="#2d5a2d" />
        <Text className="text-lg font-semibold text-gray-900 ml-2">
          Safe Spots
        </Text>
      </View>
      
      <View className="h-48 bg-secondary-100 rounded-lg items-center justify-center">
        <Ionicons name="map" size={48} color="#6b7280" />
        <Text className="text-gray-600 mt-2">Map coming soon</Text>
        <Text className="text-xs text-gray-500 mt-1">
          {safeSpots.length} safe spots available
        </Text>
      </View>
      
      <View className="mt-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">
          Nearby Safe Spots:
        </Text>
        {safeSpots.slice(0, 3).map((spot) => (
          <View key={spot.id} className="flex-row items-center py-2">
            <Ionicons name="shield-checkmark" size={16} color="#2d5a2d" />
            <Text className="text-sm text-gray-700 ml-2">{spot.name}</Text>
          </View>
        ))}
      </View>
    </Card>
  )
} 