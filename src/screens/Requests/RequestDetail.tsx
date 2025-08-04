"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MapPin, Clock, DollarSign, Shield } from "lucide-react-native"
import { Button } from "../../components/Button"
import { Card } from "../../components/Card"
import { Badge } from "../../components/Badge"
import { KarmaBar } from "../../components/KarmaBar"
import { api } from "../../lib/api"
import type { Request } from "../../types"

export const RequestDetail = ({ route, navigation }: any) => {
  const { requestId } = route.params
  const [request, setRequest] = useState<Request | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRequest()
  }, [])

  const loadRequest = async () => {
    try {
      const data = await api.getRequestById(requestId)
      setRequest(data)
    } catch (error) {
      console.error("Failed to load request:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleExpressInterest = () => {
    navigation.navigate("Chat", { requestId })
  }

  if (loading || !request) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-slate-900 items-center justify-center">
        <Text className="text-gray-500 dark:text-gray-400">Loading...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <Card className="m-4 p-6">
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1 mr-3">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{request.title}</Text>
              <View className="flex-row items-center mb-2">
                <DollarSign size={20} color="#10B981" />
                <Text className="text-xl font-bold text-green-600 ml-1">${request.budget}</Text>
              </View>
            </View>
            <View className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
              <Text className="text-green-800 dark:text-green-200 font-medium text-sm">
                {request.status.replace("_", " ").toUpperCase()}
              </Text>
            </View>
          </View>

          <Text className="text-gray-700 dark:text-gray-300 mb-4 leading-6">{request.description}</Text>

          <View className="flex-row flex-wrap gap-2 mb-4">
            {request.tags.map((tag, index) => (
              <View key={index} className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                <Text className="text-blue-800 dark:text-blue-200 text-sm">{tag}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <View className="flex-row items-center">
              <MapPin size={16} color="#6B7280" />
              <Text className="text-gray-600 dark:text-gray-400 ml-1">
                {request.isRemote ? "Remote" : request.location}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Clock size={16} color="#6B7280" />
              <Text className="text-gray-600 dark:text-gray-400 ml-1">
                Due {new Date(request.deadline).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </Card>

        {/* Seeker Profile */}
        <Card className="mx-4 mb-4 p-4">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Posted by</Text>
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 mr-3" />
            <View className="flex-1">
              <View className="flex-row items-center mb-1">
                <Text className="font-semibold text-gray-900 dark:text-white mr-2">{request.seeker.name}</Text>
                {request.seeker.isVerified && <Badge type="verified" size="sm" />}
              </View>
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {request.seeker.major} • Class of {request.seeker.graduationYear}
              </Text>
              <KarmaBar score={request.seeker.karmaScore} showLabel={false} />
            </View>
          </View>
        </Card>

        {/* Bids Section */}
        <Card className="mx-4 mb-4 p-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white">Interest ({request.bidCount})</Text>
            <TouchableOpacity>
              <Text className="text-blue-600 dark:text-blue-400 font-medium">View All</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-gray-600 dark:text-gray-400 text-sm">
            {request.bidCount} students have expressed interest in this request
          </Text>
        </Card>

        {/* Safety Info */}
        {!request.isRemote && (
          <Card className="mx-4 mb-4 p-4">
            <View className="flex-row items-center mb-2">
              <Shield size={20} color="#10B981" />
              <Text className="text-lg font-semibold text-gray-900 dark:text-white ml-2">Safety First</Text>
            </View>
            <Text className="text-gray-600 dark:text-gray-400 text-sm">
              Meet in public campus locations. Check out our safe exchange spots on the map.
            </Text>
          </Card>
        )}
      </ScrollView>

      {/* Action Button */}
      <View className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700">
        <Button title="Express Interest" onPress={handleExpressInterest} className="mb-2" />
        <Button title="Message Directly" onPress={handleExpressInterest} variant="outline" />
      </View>
    </SafeAreaView>
  )
}
