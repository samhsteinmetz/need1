"use client"

import { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MessageCircle, Clock } from "lucide-react-native"
import { Card } from "../../components/Card"
import { api } from "../../lib/api"
import type { Thread } from "../../types"

export const ThreadList = ({ navigation }: any) => {
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadThreads()
  }, [])

  const loadThreads = async () => {
    try {
      const data = await api.getThreads()
      setThreads(data)
    } catch (error) {
      console.error("Failed to load threads:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  const getExpiryText = (expiresAt: string) => {
    const now = new Date()
    const expiry = new Date(expiresAt)
    const diffInDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays <= 0) return "Expired"
    if (diffInDays === 1) return "Expires tomorrow"
    return `Expires in ${diffInDays} days`
  }

  const renderThread = ({ item }: { item: Thread }) => {
    const otherParticipant = item.participants.find((p) => p.id !== "1") // Assuming current user ID is '1'

    return (
      <TouchableOpacity onPress={() => navigation.navigate("Chat", { threadId: item.id })}>
        <Card className="p-4 mb-3 mx-4">
          <View className="flex-row items-start">
            <View className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 mr-3" />

            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-1">
                <Text className="font-semibold text-gray-900 dark:text-white">
                  Student #{otherParticipant?.id.slice(-4) || "0000"}
                </Text>
                <View className="flex-row items-center">
                  {item.unreadCount > 0 && (
                    <View className="w-5 h-5 bg-blue-500 rounded-full items-center justify-center mr-2">
                      <Text className="text-white text-xs font-bold">{item.unreadCount}</Text>
                    </View>
                  )}
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeAgo(item.lastMessage.createdAt)}
                  </Text>
                </View>
              </View>

              <Text className="text-gray-600 dark:text-gray-400 text-sm mb-2">{item.lastMessage.text}</Text>

              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-blue-600 dark:text-blue-400">Re: Request #{item.requestId}</Text>
                <View className="flex-row items-center">
                  <Clock size={12} color="#F59E0B" />
                  <Text className="text-xs text-amber-600 dark:text-amber-400 ml-1">
                    {getExpiryText(item.expiresAt)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <FlatList
        data={threads}
        renderItem={renderThread}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-12">
            <MessageCircle size={48} color="#9CA3AF" />
            <Text className="text-gray-500 dark:text-gray-400 text-center mt-4">
              {loading ? "Loading messages..." : "No conversations yet"}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}
