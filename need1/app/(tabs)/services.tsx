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

export default function MyServicesScreen() {
  const router = useRouter()
  const { user } = useUser()
  const [myServices, setMyServices] = useState<Request[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const statuses = ["All", "Active", "In Progress", "Completed", "Paused"]

  useEffect(() => {
    const fetchMyServices = async () => {
      try {
        // TODO: Replace with actual API call for user's services
        const data = await api.getRequests()
        // Filter for services offered by current user
        setMyServices(data.filter(req => req.seekerId === user?.id).slice(0, 3).map(req => ({ ...req, status: "active" })))
      } catch (error) {
        console.error("Failed to fetch my services:", error)
      }
    }

    if (user) {
      fetchMyServices()
    }
  }, [user])

  const filteredServices = myServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All" ||
                         service.status === selectedStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const handleServicePress = (service: Request) => {
    router.push({
      pathname: "/requests/[id]",
      params: { id: service.id },
    })
  }

  const handleChatPress = (service: Request) => {
    router.push({
      pathname: "/messages/[id]",
      params: { id: service.id },
    })
  }

  const renderServiceItem = ({ item }: { item: Request }) => (
    <TouchableOpacity
      onPress={() => handleServicePress(item)}
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
            <Text className="text-xs text-gray-500">Price</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={16} color="#6b7280" />
            <Text className="text-sm text-gray-500 ml-2">{item.location}</Text>
          </View>
          <View className={`px-2 py-1 rounded-full ${
            item.status === "active" ? "bg-green-100" :
            item.status === "in_progress" ? "bg-blue-100" :
            item.status === "completed" ? "bg-gray-100" : "bg-yellow-100"
          }`}>
            <Text className={`text-xs font-medium capitalize ${
              item.status === "active" ? "text-green-800" :
              item.status === "in_progress" ? "text-blue-800" :
              item.status === "completed" ? "text-gray-800" : "text-yellow-800"
            }`}>
              {item.status}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={16} color="#6b7280" />
            <Text className="text-sm text-gray-600 ml-2">
              {item.bidCount} requests received
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleChatPress(item)}
            className="flex-row items-center"
          >
            <Ionicons name="chatbubble-outline" size={14} color="#6b7280" />
            <Text className="text-xs text-gray-500 ml-1">Chat</Text>
          </TouchableOpacity>
        </View>

        {item.tags.length > 0 && (
          <View className="flex-row flex-wrap gap-1 mt-3">
            {item.tags.slice(0, 3).map((tag, index) => (
              <View key={index} className="bg-primary-50 px-2 py-1 rounded-full">
                <Text className="text-xs text-primary-700">{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </Card>
    </TouchableOpacity>
  )

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
        <Text className="text-xl font-bold text-gray-900">My Services</Text>
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
              placeholder="Search my services..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              accessibilityLabel="Search my services"
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
        {filteredServices.length > 0 ? (
          <FlatList
            data={filteredServices}
            keyExtractor={(item) => item.id}
            renderItem={renderServiceItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 12, paddingBottom: 0 }}
          />
        ) : (
          <View className="flex-1 items-center justify-center p-4">
            <Card className="p-6 items-center">
              <Ionicons name="briefcase-outline" size={48} color="#6b7280" />
              <Text className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                No Services Found
              </Text>
              <Text className="text-gray-600 text-center">
                {searchTerm || selectedStatus !== "All"
                  ? "Try adjusting your search or filters."
                  : "You haven't offered any services yet."
                }
              </Text>
            </Card>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
} 