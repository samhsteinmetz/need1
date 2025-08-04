import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "../../components/Card"
import { Badge } from "../../components/Badge"
import { OfferItem } from "../../components/OfferItem"
import { api } from "../../lib/api"
import type { Offer } from "../../types"

export default function OfferFeedScreen() {
  const router = useRouter()
  const [activeSegment, setActiveSegment] = useState<"open" | "my_bids" | "flash_drops">("open")
  const [offers, setOffers] = useState<Offer[]>([])

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await api.getOffers(activeSegment)
        setOffers(data)
      } catch (error) {
        console.error("Failed to fetch offers:", error)
      }
    }

    fetchOffers()
  }, [activeSegment])

  const handleOfferPress = (offer: Offer) => {
    router.push({
      pathname: "/requests/[id]",
      params: { id: offer.requestId },
    })
  }

  const handleAcceptOffer = (offer: Offer) => {
    // TODO: Implement accept offer logic
    console.log("Accept offer:", offer.id)
  }

  const handleDeclineOffer = (offer: Offer) => {
    // TODO: Implement decline offer logic
    console.log("Decline offer:", offer.id)
  }

  const renderSegmentButton = (segment: "open" | "my_bids" | "flash_drops", title: string) => (
    <TouchableOpacity
      onPress={() => setActiveSegment(segment)}
      className={`flex-1 py-3 px-4 rounded-lg ${
        activeSegment === segment
          ? "bg-primary-500"
          : "bg-secondary-100"
      }`}
    >
      <Text
        className={`text-sm font-medium text-center ${
          activeSegment === segment ? "text-white" : "text-gray-700"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      {/* Header */}
      <View className="p-4 bg-white border-b border-secondary-200">
        <Text className="text-2xl font-bold text-gray-900">Offers</Text>
      </View>

      {/* Segment Control */}
      <View className="p-4 bg-white border-b border-secondary-200">
        <View className="flex-row space-x-2">
          {renderSegmentButton("open", "Open Jobs")}
          {renderSegmentButton("my_bids", "My Bids")}
          {renderSegmentButton("flash_drops", "Flash Drops")}
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 p-4">
        {offers.length > 0 ? (
          <FlatList
            data={offers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <OfferItem
                offer={item}
                onPress={() => handleOfferPress(item)}
                onAccept={() => handleAcceptOffer(item)}
                onDecline={() => handleDeclineOffer(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 0 }}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Card className="p-6 items-center">
              <Ionicons name="briefcase-outline" size={48} color="#6b7280" />
              <Text className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                No {activeSegment.replace('_', ' ')} Available
              </Text>
              <Text className="text-gray-600 text-center">
                {activeSegment === "open" && "No open jobs at the moment."}
                {activeSegment === "my_bids" && "You haven't placed any bids yet."}
                {activeSegment === "flash_drops" && "No flash drops available."}
              </Text>
            </Card>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
} 