"use client"

import { useState, useEffect } from "react"
import { View, Text, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Zap, Users, Clock } from "lucide-react-native"
import { Card } from "../../components/Card"
import { RequestItem } from "../../components/RequestItem"
import { useCountdown } from "../../hooks/useCountdown"
import { api } from "../../lib/api"
import type { FlashDrop } from "../../types"

export const DropLanding = ({ navigation }: any) => {
  const [flashDrops, setFlashDrops] = useState<FlashDrop[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFlashDrops()
  }, [])

  const loadFlashDrops = async () => {
    try {
      const data = await api.getFlashDrops()
      setFlashDrops(data)
    } catch (error) {
      console.error("Failed to load flash drops:", error)
    } finally {
      setLoading(false)
    }
  }

  const FlashDropCard = ({ drop }: { drop: FlashDrop }) => {
    const countdown = useCountdown(drop.endsAt)

    return (
      <Card className="p-4 mb-4">
        <View className="flex-row items-center mb-3">
          <View className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-full items-center justify-center mr-3">
            <Zap size={24} color="#F59E0B" />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">{drop.title}</Text>
            <Text className="text-gray-600 dark:text-gray-400 text-sm">{drop.description}</Text>
          </View>
        </View>

        <View className="bg-amber-50 dark:bg-amber-900 p-3 rounded-xl mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Clock size={16} color="#F59E0B" />
              <Text className="text-amber-800 dark:text-amber-200 font-bold ml-1">
                {countdown.isExpired
                  ? "ENDED"
                  : `${countdown.hours}:${countdown.minutes.toString().padStart(2, "0")}:${countdown.seconds.toString().padStart(2, "0")}`}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Users size={16} color="#F59E0B" />
              <Text className="text-amber-800 dark:text-amber-200 ml-1">{drop.participantCount} active</Text>
            </View>
          </View>
        </View>

        <Text className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Featured Requests ({drop.requests.length})
        </Text>
      </Card>
    )
  }

  const renderFlashDrop = ({ item }: { item: FlashDrop }) => (
    <View>
      <FlashDropCard drop={item} />
      {item.requests.map((request) => (
        <RequestItem
          key={request.id}
          request={request}
          onPress={() => navigation.navigate("RequestDetail", { requestId: request.id })}
        />
      ))}
    </View>
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <View className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
        <Text className="text-2xl font-bold text-white mb-2">⚡ Flash Market</Text>
        <Text className="text-amber-100">Time-limited job opportunities with bonus rewards</Text>
      </View>

      <FlatList
        data={flashDrops}
        renderItem={renderFlashDrop}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-12">
            <Zap size={48} color="#9CA3AF" />
            <Text className="text-gray-500 dark:text-gray-400 text-center mt-4">
              {loading ? "Loading flash drops..." : "No active flash drops"}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}
