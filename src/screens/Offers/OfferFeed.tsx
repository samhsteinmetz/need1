"use client"

import { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { OfferItem } from "../../components/OfferItem"
import { api } from "../../lib/api"
import type { Offer } from "../../types"

type FeedType = "open" | "my_bids" | "flash_drops"

export const OfferFeed = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<FeedType>("open")
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOffers()
  }, [activeTab])

  const loadOffers = async () => {
    setLoading(true)
    try {
      const data = await api.getOffers(activeTab)
      setOffers(data)
    } catch (error) {
      console.error("Failed to load offers:", error)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { key: "open" as FeedType, label: "Open Jobs" },
    { key: "my_bids" as FeedType, label: "My Bids" },
    { key: "flash_drops" as FeedType, label: "Flash Drops" },
  ]

  const renderTab = (tab: { key: FeedType; label: string }) => (
    <TouchableOpacity
      key={tab.key}
      onPress={() => setActiveTab(tab.key)}
      className={`flex-1 py-3 px-4 ${
        activeTab === tab.key ? "border-b-2 border-blue-500" : "border-b border-gray-200 dark:border-gray-700"
      }`}
    >
      <Text
        className={`text-center font-medium ${
          activeTab === tab.key ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
        }`}
      >
        {tab.label}
      </Text>
    </TouchableOpacity>
  )

  const renderOffer = ({ item }: { item: Offer }) => (
    <OfferItem offer={item} onPress={() => navigation.navigate("RequestDetail", { requestId: item.requestId })} />
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      {/* Tab Bar */}
      <View className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700">
        <View className="flex-row">{tabs.map(renderTab)}</View>
      </View>

      {/* Content */}
      <FlatList
        data={offers}
        renderItem={renderOffer}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500 dark:text-gray-400 text-center">
              {loading ? "Loading..." : "No opportunities available"}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}
