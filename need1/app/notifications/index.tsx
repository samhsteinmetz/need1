import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "../../components/Card"
import { Badge } from "../../components/Badge"
import { useUser } from "../../contexts/UserContext"
import { api } from "../../lib/api"
import type { Notification } from "../../types"

export default function NotificationsScreen() {
  const router = useRouter()
  const { user } = useUser()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // TODO: Replace with actual API call
        const mockNotifications: Notification[] = [
          {
            id: "1",
            type: "bid",
            title: "New Bid Received",
            message: "Jane Smith bid $25 on your CS homework request",
            isRead: false,
            createdAt: new Date().toISOString(),
            relatedId: "1"
          },
          {
            id: "2",
            type: "message",
            title: "New Message",
            message: "You have a new message from John Doe",
            isRead: false,
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            relatedId: "2"
          },
          {
            id: "3",
            type: "karma",
            title: "Karma Earned",
            message: "You earned 15 karma points for completing a job",
            isRead: true,
            createdAt: new Date(Date.now() - 7200000).toISOString()
          }
        ]
        setNotifications(mockNotifications)
      } catch (error) {
        console.error("Failed to fetch notifications:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchNotifications()
    }
  }, [user])

  const handleNotificationPress = (notification: Notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
    )

    // Navigate based on type
    switch (notification.type) {
      case "bid":
        router.push(`/requests/${notification.relatedId}`)
        break
      case "message":
        router.push(`/messages/${notification.relatedId}`)
        break
      default:
        // Just mark as read
        break
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "bid":
        return "people-outline"
      case "message":
        return "chatbubble-outline"
      case "karma":
        return "star-outline"
      case "eco":
        return "leaf-outline"
      default:
        return "notifications-outline"
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "bid":
        return "#3b82f6"
      case "message":
        return "#22c55e"
      case "karma":
        return "#fbbf24"
      case "eco":
        return "#10b981"
      default:
        return "#6b7280"
    }
  }

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      onPress={() => handleNotificationPress(item)}
      activeOpacity={0.7}
    >
      <Card className={`p-4 mb-3 ${!item.isRead ? "bg-blue-50" : ""}`}>
        <View className="flex-row items-start">
          <View 
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: `${getNotificationColor(item.type)}20` }}
          >
            <Ionicons 
              name={getNotificationIcon(item.type) as any} 
              size={20} 
              color={getNotificationColor(item.type)} 
            />
          </View>
          
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-base font-semibold text-gray-900">
                {item.title}
              </Text>
              {!item.isRead && (
                <View className="w-2 h-2 rounded-full bg-blue-500" />
              )}
            </View>
            
            <Text className="text-gray-600 text-sm mb-2">
              {item.message}
            </Text>
            
            <Text className="text-xs text-gray-500">
              {new Date(item.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )

  if (!user) {
    return (
      <View className="flex-1 bg-secondary-50">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-600">Loading...</Text>
        </View>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-secondary-50">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 bg-white border-b border-secondary-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="#6b7280" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">Notifications</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="checkmark-done" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="flex-1 p-4">
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-600">Loading notifications...</Text>
          </View>
        ) : notifications.length > 0 ? (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderNotificationItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 0 }}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Card className="p-6 items-center">
              <Ionicons name="notifications-outline" size={48} color="#6b7280" />
              <Text className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                No Notifications
              </Text>
              <Text className="text-gray-600 text-center">
                You're all caught up! New notifications will appear here.
              </Text>
            </Card>
          </View>
        )}
      </View>
    </View>
  )
} 