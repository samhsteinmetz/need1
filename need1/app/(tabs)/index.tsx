import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, FlatList, RefreshControl, TextInput, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { RequestItem } from "../../components/RequestItem"
import { Card } from "../../components/Card"
import { useUser } from "../../contexts/UserContext"
import { api } from "../../lib/api"
import type { Request } from "../../types"

export default function MarketplaceScreen() {
  const router = useRouter()
  const { user } = useUser()
  const [requests, setRequests] = useState<Request[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [activeSegment, setActiveSegment] = useState<"requests" | "services">("requests")

  const categories = [
    "All", "Entertainment", "Education", "Marketing", "Labor", "Creative", "Technology"
  ]

  const fetchRequests = async () => {
    try {
      const data = await api.getRequests()
      setRequests(data)
    } catch (error) {
      console.error("Failed to fetch requests:", error)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchRequests()
    setRefreshing(false)
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleRequestPress = (request: Request) => {
    router.push({
      pathname: "/requests/[id]",
      params: { id: request.id },
    })
  }

  const handleNotificationsPress = () => {
    router.push("/notifications")
  }

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" ||
                          request.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  const renderCategoryFilter = (category: string) => (
    <TouchableOpacity
      key={category}
      onPress={() => setSelectedCategory(category)}
      className={`px-3 py-1 rounded-full border ${
        selectedCategory === category
          ? "bg-primary-500 border-primary-500"
          : "bg-white border-secondary-300"
      }`}
    >
      <Text
        className={`text-sm font-medium ${
          selectedCategory === category ? "text-white" : "text-gray-700"
        }`}
      >
        {category}
      </Text>
    </TouchableOpacity>
  )

  const renderSegmentButton = (segment: "requests" | "services", title: string) => (
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
      {/* Compact Header */}
      <View className="flex-row items-center justify-between p-3 bg-white border-b border-secondary-200">
        <View className="flex-row items-center">
          <View className="w-6 h-6 rounded-full bg-primary-500 mr-2" />
          <Text className="text-xl font-bold text-gray-900">Need1</Text>
        </View>
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
          <TouchableOpacity
            onPress={handleNotificationsPress}
            className="w-8 h-8 rounded-full bg-secondary-100 items-center justify-center"
          >
            <Ionicons name="notifications-outline" size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Segment Control */}
      <View className="p-3 bg-white border-b border-secondary-200">
        <View className="flex-row space-x-2">
          {renderSegmentButton("requests", "Requests")}
          {renderSegmentButton("services", "Services")}
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
              placeholder="Search marketplace..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              accessibilityLabel="Search marketplace"
            />
          </View>
        </View>
      )}

      {/* Compact Category Filters (only when active) */}
      {showFilters && (
        <View className="p-3 bg-white border-b border-secondary-200">
          <View className="flex-row flex-wrap gap-2">
            {categories.map(renderCategoryFilter)}
          </View>
        </View>
      )}

      {/* Content with more space */}
      <View className="flex-1 pb-0">
        {filteredRequests.length > 0 ? (
          <FlatList
            data={filteredRequests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RequestItem
                request={item}
                onPress={() => handleRequestPress(item)}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 12, paddingBottom: 0 }}
          />
        ) : (
          <View className="flex-1 items-center justify-center p-4">
            <Card className="p-6 items-center">
              <Ionicons name="search-outline" size={48} color="#6b7280" />
              <Text className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                No {activeSegment === "requests" ? "Requests" : "Services"} Found
              </Text>
              <Text className="text-gray-600 text-center">
                {searchTerm || selectedCategory !== "All"
                  ? "Try adjusting your search or filters."
                  : `No ${activeSegment === "requests" ? "requests" : "services"} available at the moment.`
                }
              </Text>
            </Card>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
} 