import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "./Card"
import { Badge } from "./Badge"
import type { Offer } from "../types"

interface OfferItemProps {
  offer: Offer
  onPress: () => void
  onAccept?: () => void
  onDecline?: () => void
}

export const OfferItem: React.FC<OfferItemProps> = ({
  offer,
  onPress,
  onAccept,
  onDecline,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card className="p-4 mb-3">
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900 mb-1">
              {offer.request.title}
            </Text>
            <Text className="text-gray-600 text-sm mb-2" numberOfLines={2}>
              {offer.request.description}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-xl font-bold text-primary-600">
              ${offer.amount}
            </Text>
            <Text className="text-xs text-gray-500">Your Bid</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={16} color="#6b7280" />
            <Text className="text-sm text-gray-500 ml-2">
              {new Date(offer.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <Badge type="verified" size="sm" />
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-primary-100 mr-2" />
            <Text className="text-sm font-medium text-gray-900">
              {offer.bidder.name}
            </Text>
            <View className="flex-row items-center ml-2">
              <Ionicons name="star" size={14} color="#fbbf24" />
              <Text className="text-sm text-gray-600 ml-1">4.8</Text>
            </View>
          </View>
          
          <View className="flex-row items-center space-x-2">
            <Badge type="karma" value={offer.bidder.karmaScore} size="sm" />
            {onAccept && onDecline && (
              <View className="flex-row space-x-2">
                <TouchableOpacity
                  onPress={onAccept}
                  className="w-6 h-6 rounded-full bg-green-500 items-center justify-center"
                >
                  <Ionicons name="checkmark" size={12} color="#ffffff" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onDecline}
                  className="w-6 h-6 rounded-full bg-red-500 items-center justify-center"
                >
                  <Ionicons name="close" size={12} color="#ffffff" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
} 