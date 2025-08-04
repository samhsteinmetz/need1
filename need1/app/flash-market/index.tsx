import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "../../components/Card"
import { Badge } from "../../components/Badge"
import { useCountdown } from "../../hooks/useCountdown"
import { api } from "../../lib/api"
import type { FlashDrop, Request } from "../../types"

export default function FlashMarketScreen() {
  const router = useRouter()
  const [flashDrops, setFlashDrops] = useState<FlashDrop[]>([])
  const [activeDrop, setActiveDrop] = useState<FlashDrop | null>(null)

  useEffect(() => {
    const fetchFlashDrops = async () => {
      try {
        const data = await api.getFlashDrops()
        setFlashDrops(data)
        if (data.length > 0) {
          setActiveDrop(data[0])
        }
      } catch (error) {
        console.error("Failed to fetch flash drops:", error)
      }
    }

    fetchFlashDrops()
  }, [])

  const handleRequestPress = (request: Request) => {
    router.push({
      pathname: "/requests/[id]",
      params: { id: request.id },
    })
  }

  const renderRequestItem = ({ item }: { item: Request }) => (
    <TouchableOpacity
      onPress={() => handleRequestPress(item)}
      activeOpacity={0.7}
    >
      <Card className="p-4 mb-3">
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900 mb-1">
              {item.title}
            </Text>
            <Text className="text-gray-600 text-sm mb-2" numberOfLines={2}>
              {item.description}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-xl font-bold text-primary-600">
              ${item.budget}
            </Text>
            <Text className="text-xs text-gray-500">Budget</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-primary-100 mr-2" />
            <Text className="text-sm font-medium text-gray-900">
              {item.seeker.name}
            </Text>
            <Badge type="verified" size="sm" />
          </View>
          <Badge type="karma" value={item.seeker.karmaScore} size="sm" />
        </View>
      </Card>
    </TouchableOpacity>
  )

  if (!activeDrop) {
    return (
      <SafeAreaView className="flex-1 bg-secondary-50">
        <View className="flex-1 items-center justify-center p-4">
          <Card className="p-6 items-center">
            <Ionicons name="flash-outline" size={48} color="#6b7280" />
            <Text className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              No Flash Drops Active
            </Text>
            <Text className="text-gray-600 text-center">
              Check back later for time-limited opportunities!
            </Text>
          </Card>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      {/* Header */}
      <View className="p-4 bg-white border-b border-secondary-200">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Ionicons name="flash" size={24} color="#2d5a2d" />
            <Text className="text-2xl font-bold text-gray-900 ml-2">
              Flash Market
            </Text>
          </View>
          <Badge type="eco" value={activeDrop.participantCount} size="md" />
        </View>

        {/* Active Drop Info */}
        <Card className="p-4 bg-gradient-to-r from-primary-500 to-primary-600">
          <Text className="text-xl font-bold text-white mb-2">
            {activeDrop.title}
          </Text>
          <Text className="text-primary-100 mb-3">
            {activeDrop.description}
          </Text>
          
          {/* Countdown Timer */}
          <FlashDropCountdown endTime={activeDrop.endsAt} />
        </Card>
      </View>

      {/* Requests List */}
      <View className="flex-1 p-4">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Available Requests ({activeDrop.requests.length})
        </Text>
        
        <FlatList
          data={activeDrop.requests}
          keyExtractor={(item) => item.id}
          renderItem={renderRequestItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 0 }}
        />
      </View>
    </SafeAreaView>
  )
}

// Countdown Component
function FlashDropCountdown({ endTime }: { endTime: string }) {
  const timeLeft = useCountdown(endTime)

  const formatTime = (time: number) => time.toString().padStart(2, '0')

  return (
    <View className="flex-row items-center justify-center space-x-4">
      <View className="items-center">
        <Text className="text-2xl font-bold text-white">
          {formatTime(timeLeft.hours)}
        </Text>
        <Text className="text-xs text-primary-100">Hours</Text>
      </View>
      <Text className="text-white text-xl">:</Text>
      <View className="items-center">
        <Text className="text-2xl font-bold text-white">
          {formatTime(timeLeft.minutes)}
        </Text>
        <Text className="text-xs text-primary-100">Minutes</Text>
      </View>
      <Text className="text-white text-xl">:</Text>
      <View className="items-center">
        <Text className="text-2xl font-bold text-white">
          {formatTime(timeLeft.seconds)}
        </Text>
        <Text className="text-xs text-primary-100">Seconds</Text>
      </View>
    </View>
  )
} 