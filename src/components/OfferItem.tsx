import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { DollarSign, Clock, MessageCircle } from "lucide-react-native"
import type { Offer } from "../../src copy/types"
import { Card } from "./Card"
import { Badge } from "./Badge"

interface OfferItemProps {
  offer: Offer
  onPress: () => void
}

export const OfferItem: React.FC<OfferItemProps> = ({ offer, onPress }) => {
  const getStatusColor = () => {
    switch (offer.status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Card className="p-4 mb-3">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1 mr-3">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{offer.request.title}</Text>
            <Text className="text-gray-600 dark:text-gray-400 text-sm">{offer.message}</Text>
          </View>
          <View className={`px-2 py-1 rounded-full ${getStatusColor()}`}>
            <Text className="text-xs font-medium capitalize">{offer.status}</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-4">
            <View className="flex-row items-center">
              <DollarSign size={16} color="#10B981" />
              <Text className="text-green-600 font-semibold ml-1">${offer.amount}</Text>
            </View>

            <View className="flex-row items-center">
              <MessageCircle size={16} color="#6B7280" />
              <Text className="text-gray-600 dark:text-gray-400 text-sm ml-1">Bid</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Clock size={14} color="#9CA3AF" />
            <Text className="text-gray-500 text-xs ml-1">2h ago</Text>
          </View>
        </View>

        <View className="flex-row items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <View className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 mr-2" />
          <Text className="text-sm text-gray-700 dark:text-gray-300 flex-1">{offer.bidder.name}</Text>
          <Badge type="karma" value={offer.bidder.karmaScore} size="sm" />
        </View>
      </Card>
    </TouchableOpacity>
  )
}
