import type React from "react"
import { useState } from "react"
import { View, Text, TextInput, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "../../components/Card"
import { Button } from "../../components/Button"
import { api } from "../../lib/api"

export default function WelcomeScreen() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSendLink = async () => {
    if (!email || !email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid .edu email address")
      return
    }

    if (!email.endsWith(".edu")) {
      Alert.alert("Invalid Email", "Please use your .edu email address")
      return
    }

    setLoading(true)
    try {
      await api.sendMagicLink(email)
      router.push("/auth/verify-link")
    } catch (error) {
      Alert.alert("Error", "Failed to send verification link")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      <View className="flex-1 justify-center p-6">
        {/* Logo and Branding */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-primary-500 items-center justify-center mb-4">
            <Ionicons name="leaf" size={40} color="#ffffff" />
          </View>
          <Text className="text-3xl font-bold text-gray-900 mb-2">Need1</Text>
          <Text className="text-lg text-gray-600 text-center">
            The fastest, safest way for students to get things done
          </Text>
        </View>

        {/* Main Content */}
        <Card className="p-6 mb-6">
          <Text className="text-xl font-semibold text-gray-900 mb-2">
            Welcome to Campus Match
          </Text>
          <Text className="text-gray-600 mb-6">
            Enter your .edu email to get started with secure, verified student connections.
          </Text>

          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Email Address</Text>
              <View className="relative">
                <Ionicons 
                  name="mail-outline" 
                  size={20} 
                  color="#6b7280" 
                  style={{ position: 'absolute', left: 12, top: 12, zIndex: 1 }}
                />
                <TextInput
                  className="border border-secondary-300 rounded-lg pl-10 pr-4 py-3 text-gray-900 bg-white"
                  placeholder="your.email@university.edu"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  accessibilityLabel="Email input"
                />
              </View>
            </View>

            <Button
              title="Send Verification Link"
              onPress={handleSendLink}
              loading={loading}
              className="w-full"
            />
          </View>
        </Card>

        {/* Features */}
        <View className="space-y-4">
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-primary-100 items-center justify-center mr-3">
              <Ionicons name="shield-checkmark" size={16} color="#2d5a2d" />
            </View>
            <Text className="text-sm text-gray-600">Verified .edu students only</Text>
          </View>
          
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-primary-100 items-center justify-center mr-3">
              <Ionicons name="location" size={16} color="#2d5a2d" />
            </View>
            <Text className="text-sm text-gray-600">Safe campus meet-up spots</Text>
          </View>
          
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-primary-100 items-center justify-center mr-3">
              <Ionicons name="chatbubble" size={16} color="#2d5a2d" />
            </View>
            <Text className="text-sm text-gray-600">Auto-deleting chat messages</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
} 