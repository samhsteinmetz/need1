"use client"

import { useState, useEffect } from "react"
import { View, Text, FlatList, RefreshControl, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Plus, Zap, Bell } from "lucide-react-native"
import { RequestItem } from "../../components/RequestItem"
import { Card } from "../../components/Card"
import { api } from "../../lib/api"
import type { Request } from "../../types"

export const Dashboard = ({ navigation }: any) => {
  const [requests, setRequests] = useState<Request[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadRequests = async () => {
    try {
      const data = await api.getRequests()
      setRequests(data)
    } catch (error) {
      console.error("Failed to load requests:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadRequests()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    loadRequests()
  }

  const renderHeader = () => (
    <View className="px-4 pb-4">
      {/* Welcome Section */}
      <View className="flex-row items-center justify-between mb-6">
        <View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">Good morning! 👋</Text>
          <Text className="text-gray-600 dark:text-gray-400">Ready to help or get help?</Text>
        </View>
        <TouchableOpacity className="p-2">
          <Bell size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View className="flex-row space-x-3 mb-6">
        <TouchableOpacity onPress={() => navigation.navigate("RequestWizard")} className="flex-1">
          <Card className="p-4 items-center">
            <View className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center mb-2">
              <Plus size={24} color="#3B82F6" />
            </View>
            <Text className="font-semibold text-gray-900 dark:text-white">Post Request</Text>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("DropLanding")} className="flex-1">
          <Card className="p-4 items-center">
            <View className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-full items-center justify-center mb-2">
              <Zap size={24} color="#F59E0B" />
            </View>
            <Text className="font-semibold text-gray-900 dark:text-white">Flash Market</Text>
          </Card>
        </TouchableOpacity>
      </View>

      {/* Stats Card */}
      <Card className="p-4 mb-6">
        <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Your Impact</Text>
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-2xl font-bold text-blue-600">12</Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400">Jobs Done</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-green-600">$340</Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400">Earned</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-amber-600">85</Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400">Karma</Text>
          </View>
        </View>
      </Card>

      <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Requests</Text>
    </View>
  )

  const renderRequest = ({ item }: { item: Request }) => (
    <View className="px-4">
      <RequestItem request={item} onPress={() => navigation.navigate("RequestDetail", { requestId: item.id })} />
    </View>
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <FlatList
        data={requests}
        renderItem={renderRequest}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}
