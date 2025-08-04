import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Clock, MapPin, DollarSign, Users } from "lucide-react-native"
import type { Request } from "../../src copy/types"
import { Card } from "./Card"
import { Badge } from "./Badge"

interface RequestItemProps {
  request: Request
  onPress: () => void
}

export const RequestItem: React.FC<RequestItemProps> = ({ request, onPress }) => {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  const getStatusColor = () => {
    switch (request.status) {
      case "open":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Card className="p-4 mb-3">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1 mr-3">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{request.title}</Text>
            <Text className="text-gray-600 dark:text-gray-400 text-sm">{request.description}</Text>
          </View>
          <View className={`px-2 py-1 rounded-full ${getStatusColor()}`}>
            <Text className="text-xs font-medium capitalize">{request.status.replace("_", " ")}</Text>
          </View>
        </View>

        <View className="flex-row flex-wrap gap-1 mb-3">
          {request.tags.map((tag, index) => (
            <View key={index} className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full">
              <Text className="text-xs text-blue-800 dark:text-blue-200">{tag}</Text>
            </View>
          ))}
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-4">
            <View className="flex-row items-center">
              <DollarSign size={16} color="#10B981" />
              <Text className="text-green-600 font-semibold ml-1">${request.budget}</Text>
            </View>

            <View className="flex-row items-center">
              <MapPin size={16} color="#6B7280" />
              <Text className="text-gray-600 dark:text-gray-400 text-sm ml-1">
                {request.isRemote ? "Remote" : request.location}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Users size={16} color="#6B7280" />
              <Text className="text-gray-600 dark:text-gray-400 text-sm ml-1">{request.bidCount} bids</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Clock size={14} color="#9CA3AF" />
            <Text className="text-gray-500 text-xs ml-1">{formatTimeAgo(request.createdAt)}</Text>
          </View>
        </View>

        <View className="flex-row items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <View className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 mr-2" />
          <Text className="text-sm text-gray-700 dark:text-gray-300 flex-1">{request.seeker.name}</Text>
          {request.seeker.isVerified && <Badge type="verified" size="sm" />}
        </View>
      </Card>
    </TouchableOpacity>
  )
}
