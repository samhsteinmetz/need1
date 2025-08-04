"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Settings, Award } from "lucide-react-native"
import { Card } from "../../components/Card"
import { Badge } from "../../components/Badge"
import { KarmaBar } from "../../components/KarmaBar"
import { mockUsers } from "../../lib/mockData"

export const ProfileScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState("about")
  const user = mockUsers[0] // Current user

  const tabs = [
    { key: "about", label: "About" },
    { key: "reviews", label: "Reviews" },
    { key: "services", label: "Services" },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <View>
            <Card className="p-4 mb-4">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Academic Info</Text>
              <View className="space-y-2">
                <View className="flex-row justify-between">
                  <Text className="text-gray-600 dark:text-gray-400">Major:</Text>
                  <Text className="text-gray-900 dark:text-white font-medium">{user.major}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-600 dark:text-gray-400">Graduation:</Text>
                  <Text className="text-gray-900 dark:text-white font-medium">Class of {user.graduationYear}</Text>
                </View>
              </View>
            </Card>

            <Card className="p-4 mb-4">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Skills</Text>
              <View className="flex-row flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <View key={index} className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                    <Text className="text-blue-800 dark:text-blue-200 text-sm">{skill}</Text>
                  </View>
                ))}
              </View>
            </Card>

            <Card className="p-4">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Campus Credits</Text>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Award size={24} color="#F59E0B" />
                  <Text className="text-2xl font-bold text-amber-600 ml-2">{user.campusCredits}</Text>
                </View>
                <Text className="text-gray-600 dark:text-gray-400">XP Points</Text>
              </View>
            </Card>
          </View>
        )

      case "reviews":
        return (
          <Card className="p-4">
            <Text className="text-center text-gray-500 dark:text-gray-400">No reviews yet</Text>
          </Card>
        )

      case "services":
        return (
          <Card className="p-4">
            <Text className="text-center text-gray-500 dark:text-gray-400">No services offered yet</Text>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Card className="m-4 p-6">
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1">
              <View className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-600 mb-4" />
              <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.name}</Text>
              <Text className="text-gray-600 dark:text-gray-400 mb-3">{user.email}</Text>
              <View className="flex-row space-x-2 mb-4">
                <Badge type="verified" />
                <Badge type="karma" value={user.karmaScore} />
                <Badge type="eco" value={user.ecoImpact} />
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")} className="p-2">
              <Settings size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <KarmaBar score={user.karmaScore} />
        </Card>

        {/* Stats */}
        <Card className="mx-4 mb-4 p-4">
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
              <Text className="text-2xl font-bold text-amber-600">4.8</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">Rating</Text>
            </View>
          </View>
        </Card>

        {/* Tabs */}
        <View className="bg-white dark:bg-slate-800 mx-4 rounded-xl mb-4">
          <View className="flex-row border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                className={`flex-1 py-3 px-4 ${activeTab === tab.key ? "border-b-2 border-blue-500" : ""}`}
              >
                <Text
                  className={`text-center font-medium ${
                    activeTab === tab.key ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tab Content */}
        <View className="mx-4 mb-4">{renderTabContent()}</View>
      </ScrollView>
    </SafeAreaView>
  )
}
