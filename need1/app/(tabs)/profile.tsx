import type React from "react"
import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "../../components/Card"
import { Badge } from "../../components/Badge"
import { KarmaBar } from "../../components/KarmaBar"
import { Button } from "../../components/Button"
import { useUser } from "../../contexts/UserContext"

export default function ProfileScreen() {
  const router = useRouter()
  const { user } = useUser()

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-secondary-50">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-600">Loading profile...</Text>
        </View>
      </SafeAreaView>
    )
  }

  const handleEditProfile = () => {
    router.push("/profile/edit")
  }

  const handleSettings = () => {
    router.push("/settings")
  }

  const handleViewStats = () => {
    router.push("/profile/stats")
  }

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      {/* Header */}
      <View className="p-4 bg-white border-b border-secondary-200">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-900">Profile</Text>
          <TouchableOpacity onPress={handleSettings}>
            <Ionicons name="settings-outline" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 0 }}
      >
        {/* Profile Header */}
        <Card className="m-4 p-6">
          <View className="flex-row items-center mb-4">
            <Image
              source={{ uri: user.avatar }}
              className="w-20 h-20 rounded-full mr-4"
            />
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                <Text className="text-xl font-bold text-gray-900 mr-2">
                  {user.name}
                </Text>
                <Badge type="verified" size="sm" />
              </View>
              <Text className="text-gray-600 mb-1">{user.major}</Text>
              <Text className="text-gray-500 text-sm">
                Class of {user.graduationYear}
              </Text>
            </View>
          </View>

          {/* Karma Bar */}
          <KarmaBar karma={user.karmaScore} maxKarma={100} />
          
          {/* Stats Row */}
          <View className="flex-row justify-between mt-4">
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary-600">
                {user.ecoImpact}
              </Text>
              <Text className="text-sm text-gray-600">Eco Impact</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary-600">
                {user.campusCredits}
              </Text>
              <Text className="text-sm text-gray-600">Campus Credits</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary-600">
                {user.skills.length}
              </Text>
              <Text className="text-sm text-gray-600">Skills</Text>
            </View>
          </View>
        </Card>

        {/* Skills */}
        <Card className="mx-4 mb-4 p-4">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Skills</Text>
          <View className="flex-row flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <View key={index} className="bg-primary-50 px-3 py-1 rounded-full">
                <Text className="text-sm text-primary-700">{skill}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Quick Actions */}
        <Card className="mx-4 mb-4 p-4">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</Text>
          
          <View className="space-y-3">
            <TouchableOpacity
              onPress={handleEditProfile}
              className="flex-row items-center p-3 bg-secondary-50 rounded-lg"
            >
              <Ionicons name="person-outline" size={20} color="#6b7280" />
              <Text className="text-gray-700 ml-3 flex-1">Edit Profile</Text>
              <Ionicons name="chevron-forward" size={16} color="#6b7280" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleViewStats}
              className="flex-row items-center p-3 bg-secondary-50 rounded-lg"
            >
              <Ionicons name="stats-chart-outline" size={20} color="#6b7280" />
              <Text className="text-gray-700 ml-3 flex-1">View Statistics</Text>
              <Ionicons name="chevron-forward" size={16} color="#6b7280" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSettings}
              className="flex-row items-center p-3 bg-secondary-50 rounded-lg"
            >
              <Ionicons name="settings-outline" size={20} color="#6b7280" />
              <Text className="text-gray-700 ml-3 flex-1">Settings</Text>
              <Ionicons name="chevron-forward" size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Recent Activity */}
        <Card className="mx-4 mb-4 p-4">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Recent Activity</Text>
          
          <View className="space-y-3">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-green-100 items-center justify-center mr-3">
                <Ionicons name="checkmark" size={16} color="#22c55e" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-900">
                  Completed tutoring session
                </Text>
                <Text className="text-xs text-gray-500">2 hours ago</Text>
              </View>
              <Text className="text-sm font-medium text-green-600">+15 karma</Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center mr-3">
                <Ionicons name="leaf" size={16} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-900">
                  Earned eco impact badge
                </Text>
                <Text className="text-xs text-gray-500">1 day ago</Text>
              </View>
              <Text className="text-sm font-medium text-blue-600">+5 eco</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}
 