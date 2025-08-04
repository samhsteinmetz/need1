import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "../../components/Card"
import { api } from "../../lib/api"
import type { Thread } from "../../types"

export default function ThreadListScreen() {
  const router = useRouter()
  const [threads, setThreads] = useState<Thread[]>([])

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const data = await api.getThreads()
        setThreads(data)
      } catch (error) {
        console.error("Failed to fetch threads:", error)
      }
    }

    fetchThreads()
  }, [])

  const renderThreadItem = ({ item }: { item: Thread }) => (
    <TouchableOpacity
      onPress={() => router.push(`/messages/${item.id}`)}
      activeOpacity={0.7}
    >
      <Card className="p-4 mb-3">
        <View className="flex-row items-center">
          <View className="w-12 h-12 rounded-full bg-primary-100 mr-3 items-center justify-center">
            <Ionicons name="person" size={24} color="#2d5a2d" />
          </View>
          
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-base font-semibold text-gray-900">
                {item.participants[1]?.name || "Student"}
              </Text>
              <Text className="text-xs text-gray-500">
                {new Date(item.lastMessage.createdAt).toLocaleDateString()}
              </Text>
            </View>
            
            <Text className="text-sm text-gray-600 mb-2" numberOfLines={1}>
              {item.lastMessage.text}
            </Text>
            
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="time-outline" size={12} color="#6b7280" />
                <Text className="text-xs text-gray-500 ml-1">
                  Expires {new Date(item.expiresAt).toLocaleDateString()}
                </Text>
              </View>
              
              {item.unreadCount > 0 && (
                <View className="bg-primary-500 rounded-full px-2 py-1">
                  <Text className="text-xs text-white font-medium">
                    {item.unreadCount}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      <View className="p-4 bg-white border-b border-secondary-200">
        <Text className="text-2xl font-bold text-gray-900">Messages</Text>
      </View>

      <View className="flex-1 p-4">
        {threads.length > 0 ? (
          <FlatList
            data={threads}
            keyExtractor={(item) => item.id}
            renderItem={renderThreadItem}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Card className="p-6 items-center">
              <Ionicons name="chatbubbles-outline" size={48} color="#6b7280" />
              <Text className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                No Messages Yet
              </Text>
              <Text className="text-gray-600 text-center">
                Your conversations will appear here when you start chatting with other students.
              </Text>
            </Card>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
} 