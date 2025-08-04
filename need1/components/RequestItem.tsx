import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "./Card"
import { Badge } from "./Badge"
import type { Request } from "../types"

interface RequestItemProps {
  request: Request
  onPress: () => void
}

export const RequestItem: React.FC<RequestItemProps> = ({ request, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card className="p-4 mb-3">
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900 mb-1">
              {request.title}
            </Text>
            <Text className="text-gray-600 text-sm mb-2" numberOfLines={2}>
              {request.description}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-xl font-bold text-primary-600">
              ${request.budget}
            </Text>
            <Text className="text-xs text-gray-500">Budget</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-primary-100 mr-2" />
            <View>
              <Text className="text-sm font-medium text-gray-900">
                {request.seeker.name}
              </Text>
              <Text className="text-xs text-gray-500">{request.location}</Text>
            </View>
          </View>
          
          <View className="flex-row items-center space-x-2">
            {request.seeker.isVerified && <Badge type="verified" size="xs" />}
            <View className="flex-row items-center">
              <Ionicons name="chatbubble-outline" size={14} color="#6b7280" />
              <Text className="text-xs text-gray-500 ml-1">{request.bidCount}</Text>
            </View>
          </View>
        </View>

        {request.tags.length > 0 && (
          <View className="flex-row flex-wrap gap-1 mt-3">
            {request.tags.slice(0, 3).map((tag, index) => (
              <View key={index} className="bg-primary-50 px-2 py-1 rounded-full">
                <Text className="text-xs text-primary-700">{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </Card>
    </TouchableOpacity>
  )
} 