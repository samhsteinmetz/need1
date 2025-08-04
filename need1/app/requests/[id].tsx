import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "../../components/Card"
import { Badge } from "../../components/Badge"
import { Button } from "../../components/Button"
import { SafeSpotMap } from "../../components/SafeSpotMap"
import { useUser } from "../../contexts/UserContext"
import { api } from "../../lib/api"
import type { Request } from "../../types"

export default function RequestDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const { user } = useUser()
  const [request, setRequest] = useState<Request | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await api.getRequestById(id)
        setRequest(data)
      } catch (error) {
        console.error("Failed to fetch request:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequest()
  }, [id])

  const handleExpressInterest = () => {
    Alert.alert(
      "Express Interest",
      "Would you like to express interest in this request?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Express Interest", 
          onPress: () => router.push(`/messages/${id}`)
        }
      ]
    )
  }

  const handleChat = () => {
    router.push(`/messages/${id}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <View className="flex-1 bg-secondary-50">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-600">Loading...</Text>
        </View>
      </View>
    )
  }

  if (!request) {
    return (
      <View className="flex-1 bg-secondary-50">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-600">Request not found</Text>
        </View>
      </View>
    )
  }

  // Check if this is the user's own request
  const isOwnRequest = request.seekerId === user?.id

  return (
    <View className="flex-1 bg-secondary-50">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 bg-white border-b border-secondary-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#6b7280" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Request Details</Text>
        <TouchableOpacity onPress={handleChat}>
          <Ionicons name="chatbubble-outline" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <Card className="m-4 p-6">
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-gray-900 mb-2">
                {request.title}
              </Text>
              <View className="flex-row items-center mb-2">
                {request.seeker.isVerified && <Badge type="verified" size="xs" />}
                <Text className="text-sm text-gray-500 ml-2">
                  {request.seeker.name}
                </Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="text-3xl font-bold text-primary-600">
                ${request.budget}
              </Text>
              <Text className="text-sm text-gray-500">Budget</Text>
            </View>
          </View>

          <Text className="text-gray-700 mb-4 leading-6">
            {request.description}
          </Text>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={16} color="#6b7280" />
              <Text className="text-sm text-gray-600 ml-2">
                Due {formatDate(request.deadline)}
              </Text>
            </View>
            <View className={`px-3 py-1 rounded-full ${getStatusColor(request.status)}`}>
              <Text className="text-xs font-medium capitalize">
                {request.status.replace('_', ' ')}
              </Text>
            </View>
          </View>
        </Card>

        {/* Details */}
        <Card className="mx-4 mb-4 p-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Details</Text>
          
          <View className="space-y-3">
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={16} color="#6b7280" />
              <Text className="text-gray-700 ml-3">{request.location}</Text>
            </View>
            
            <View className="flex-row items-center">
              <Ionicons name="grid-outline" size={16} color="#6b7280" />
              <Text className="text-gray-700 ml-3">{request.category}</Text>
            </View>
            
            <View className="flex-row items-center">
              <Ionicons name="people-outline" size={16} color="#6b7280" />
              <Text className="text-gray-700 ml-3">{request.bidCount} bids</Text>
            </View>
          </View>
        </Card>

        {/* Tags */}
        {request.tags.length > 0 && (
          <Card className="mx-4 mb-4 p-4">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Tags</Text>
            <View className="flex-row flex-wrap gap-2">
              {request.tags.map((tag, index) => (
                <View key={index} className="bg-primary-50 px-3 py-1 rounded-full">
                  <Text className="text-sm text-primary-700">{tag}</Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        {/* Safe Spots */}
        <Card className="mx-4 mb-4 p-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Safe Spots</Text>
          <SafeSpotMap safeSpots={[]} />
        </Card>

        {/* Requester Info */}
        <Card className="mx-4 mb-4 p-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">About the Requester</Text>
          
          <View className="flex-row items-center mb-3">
            <View className="w-12 h-12 rounded-full bg-primary-100 mr-3 items-center justify-center">
              <Ionicons name="person" size={24} color="#2d5a2d" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900">
                {request.seeker.name}
              </Text>
              <Text className="text-gray-600">{request.seeker.major}</Text>
            </View>
            <Badge type="karma" value={request.seeker.karmaScore} size="md" />
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="star" size={16} color="#fbbf24" />
              <Text className="text-sm text-gray-600 ml-1">4.8 rating</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
              <Text className="text-sm text-gray-600 ml-1">Verified</Text>
            </View>
          </View>
        </Card>
      </ScrollView>

      {/* Action Buttons */}
      <View className="p-4 bg-white border-t border-secondary-200">
        <View className="flex-row space-x-3">
          {!isOwnRequest ? (
            <Button
              title="Express Interest"
              onPress={handleExpressInterest}
              className="flex-1"
            />
          ) : (
            <Button
              title="View Bids"
              onPress={() => router.push(`/requests/${id}/bids`)}
              className="flex-1"
            />
          )}
          <TouchableOpacity
            onPress={handleChat}
            className="w-12 h-12 rounded-full bg-secondary-100 items-center justify-center"
          >
            <Ionicons name="chatbubble-outline" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
} 