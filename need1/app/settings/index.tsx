import type React from "react"
import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "../../components/Card"
import { Button } from "../../components/Button"

export default function SettingsScreen() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [autoDelete, setAutoDelete] = useState(true)
  const [locationSharing, setLocationSharing] = useState(true)

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => router.push("/auth/welcome") }
      ]
    )
  }

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => router.push("/auth/welcome") }
      ]
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      {/* Header */}
      <View className="p-4 bg-white border-b border-secondary-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="#6b7280" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">Settings</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 0 }}
      >
        {/* Notifications */}
        <Card className="m-4 p-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Notifications</Text>
          
          <View className="space-y-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="notifications-outline" size={20} color="#6b7280" />
                <Text className="text-gray-700 ml-3">Push Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#e5e7eb", true: "#2d5a2d" }}
                thumbColor="#ffffff"
              />
            </View>
          </View>
        </Card>

        {/* Privacy */}
        <Card className="mx-4 mb-4 p-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Privacy</Text>
          
          <View className="space-y-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="chatbubbles-outline" size={20} color="#6b7280" />
                <Text className="text-gray-700 ml-3">Auto-delete Messages</Text>
              </View>
              <Switch
                value={autoDelete}
                onValueChange={setAutoDelete}
                trackColor={{ false: "#e5e7eb", true: "#2d5a2d" }}
                thumbColor="#ffffff"
              />
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="location-outline" size={20} color="#6b7280" />
                <Text className="text-gray-700 ml-3">Location Sharing</Text>
              </View>
              <Switch
                value={locationSharing}
                onValueChange={setLocationSharing}
                trackColor={{ false: "#e5e7eb", true: "#2d5a2d" }}
                thumbColor="#ffffff"
              />
            </View>
          </View>
        </Card>

        {/* Appearance */}
        <Card className="mx-4 mb-4 p-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Appearance</Text>
          
          <View className="space-y-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="moon-outline" size={20} color="#6b7280" />
                <Text className="text-gray-700 ml-3">Dark Mode</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#e5e7eb", true: "#2d5a2d" }}
                thumbColor="#ffffff"
              />
            </View>
          </View>
        </Card>

        {/* Account Actions */}
        <Card className="mx-4 mb-4 p-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Account</Text>
          
          <View className="space-y-3">
            <TouchableOpacity className="flex-row items-center p-3 bg-secondary-50 rounded-lg">
              <Ionicons name="help-circle-outline" size={20} color="#6b7280" />
              <Text className="text-gray-700 ml-3 flex-1">Help & Support</Text>
              <Ionicons name="chevron-forward" size={16} color="#6b7280" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-3 bg-secondary-50 rounded-lg">
              <Ionicons name="document-text-outline" size={20} color="#6b7280" />
              <Text className="text-gray-700 ml-3 flex-1">Terms of Service</Text>
              <Ionicons name="chevron-forward" size={16} color="#6b7280" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-3 bg-secondary-50 rounded-lg">
              <Ionicons name="shield-outline" size={20} color="#6b7280" />
              <Text className="text-gray-700 ml-3 flex-1">Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Danger Zone */}
        <Card className="mx-4 mb-4 p-4">
          <Text className="text-lg font-semibold text-red-600 mb-4">Danger Zone</Text>
          
          <View className="space-y-3">
            <Button
              title="Logout"
              variant="outline"
              onPress={handleLogout}
              className="border-red-500"
            />
            
            <Button
              title="Delete Account"
              variant="destructive"
              onPress={handleDeleteAccount}
            />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
} 