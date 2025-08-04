import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "../../components/Card"
import { Badge } from "../../components/Badge"
import { useUser } from "../../contexts/UserContext"
import { api } from "../../lib/api"
import type { Request } from "../../types"

export default function MyRequestsScreen() {
  const router = useRouter()
  const { user } = useUser()
  const [myRequests, setMyRequests] = useState<Request[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const statuses = ["All", "Open", "In Progress", "Completed", "Cancelled"]

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const data = await api.getRequests()
        // Filter for current user's requests
        setMyRequests(data.filter(req => req.seekerId === user?.id))
      } catch (error) {
        console.error("Failed to fetch my requests:", error)
      }
    }

    if (user) {
      fetchMyRequests()
    }
  }, [user])

  const filteredRequests = myRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All" ||
                         request.status === selectedStatus.toLowerCase().replace(' ', '_')
    return matchesSearch && matchesStatus
  })

  const handleRequestPress = (request: Request) => {
    router.push({
      pathname: "/requests/[id]",
      params: { id: request.id },
    })
  }

  const handleChatPress = (request: Request) => {
    router.push({
      pathname: "/messages/[id]",
      params: { id: request.id },
    })
  }

  const getDaysUntilDue = (deadline: string) => {
    const today = new Date()
    const dueDate = new Date(deadline)
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const formatDate = (date: string) => {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: dateObj.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    })
  }

  const renderRequestItem = ({ item }: { item: Request }) => {
    const daysUntilDue = getDaysUntilDue(item.deadline)
    const isUrgent = daysUntilDue <= 2

    return (
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

          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <Ionicons
                name="calendar-outline"
                size={16}
                color={isUrgent ? "#ef4444" : "#6b7280"}
              />
              <Text className={`text-sm ml-2 ${
                isUrgent ? "text-red-500 font-medium" : "text-gray-500"
              }`}>
                Due {formatDate(item.deadline)}
                {daysUntilDue === 0 && " (Today)"}
                {daysUntilDue === 1 && " (Tomorrow)"}
                {daysUntilDue > 1 && ` (${daysUntilDue} days)`}
              </Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <Badge type="verified" size="sm" />
              <TouchableOpacity
                onPress={() => handleChatPress(item)}
                className="flex-row items-center"
              >
                <Ionicons name="chatbubble-outline" size={14} color="#6b7280" />
                <Text className="text-xs text-gray-500 ml-1">Chat</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="people-outline" size={16} color="#6b7280" />
              <Text className="text-sm text-gray-600 ml-2">
                {item.bidCount} bids received
              </Text>
            </View>
            <View className={`px-2 py-1 rounded-full ${
              item.status === "open" ? "bg-green-100" :
              item.status === "in_progress" ? "bg-blue-100" :
              item.status === "completed" ? "bg-gray-100" : "bg-red-100"
            }`}>
              <Text className={`text-xs font-medium capitalize ${
                item.status === "open" ? "text-green-800" :
                item.status === "in_progress" ? "text-blue-800" :
                item.status === "completed" ? "text-gray-800" : "text-red-800"
              }`}>
                {item.status.replace('_', ' ')}
              </Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    )
  }

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-secondary-50">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-600">Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      {/* Compact Header */}
      <View className="flex-row items-center justify-between p-3 bg-white border-b border-secondary-200">
        <Text className="text-xl font-bold text-gray-900">My Requests</Text>
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity
            onPress={() => setShowSearch(!showSearch)}
            className="w-8 h-8 rounded-full bg-secondary-100 items-center justify-center"
          >
            <Ionicons name="search" size={16} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            className="w-8 h-8 rounded-full bg-secondary-100 items-center justify-center"
          >
            <Ionicons name="filter" size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Compact Search Bar (only when active) */}
      {showSearch && (
        <View className="p-3 bg-white border-b border-secondary-200">
          <View className="relative">
            <Ionicons
              name="search"
              size={16}
              color="#6b7280"
              style={{ position: 'absolute', left: 12, top: 10, zIndex: 1 }}
            />
            <TextInput
              className="border border-secondary-300 rounded-lg pl-10 pr-4 py-2 text-gray-900 bg-white"
              placeholder="Search my requests..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              accessibilityLabel="Search my requests"
            />
          </View>
        </View>
      )}

      {/* Compact Status Filters (only when active) */}
      {showFilters && (
        <View className="p-3 bg-white border-b border-secondary-200">
          <View className="flex-row flex-wrap gap-2">
            {statuses.map((status) => (
              <TouchableOpacity
                key={status}
                onPress={() => setSelectedStatus(status)}
                className={`px-3 py-1 rounded-full border ${
                  selectedStatus === status
                    ? "bg-primary-500 border-primary-500"
                    : "bg-white border-secondary-300"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    selectedStatus === status ? "text-white" : "text-gray-700"
                  }`}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Content with more space */}
      <View className="flex-1 pb-0">
        {filteredRequests.length > 0 ? (
          <FlatList
            data={filteredRequests}
            keyExtractor={(item) => item.id}
            renderItem={renderRequestItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 12, paddingBottom: 0 }}
          />
        ) : (
          <View className="flex-1 items-center justify-center p-4">
            <Card className="p-6 items-center">
              <Ionicons name="help-circle-outline" size={48} color="#6b7280" />
              <Text className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                No Requests Found
              </Text>
              <Text className="text-gray-600 text-center">
                {searchTerm || selectedStatus !== "All"
                  ? "Try adjusting your search or filters."
                  : "You haven't posted any requests yet."
                }
              </Text>
            </Card>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
} 