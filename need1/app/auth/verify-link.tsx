import type React from "react"
import { View, Text, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "../../components/Card"
import { Button } from "../../components/Button"

export default function VerifyLinkScreen() {
  const router = useRouter()

  const handleOpenMail = () => {
    // TODO: Implement mail app opening
    Alert.alert("Open Mail", "This would open your mail app")
  }

  const handleResendLink = () => {
    // TODO: Implement resend functionality
    Alert.alert("Resend Link", "Verification link resent!")
  }

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      <View className="flex-1 justify-center p-6">
        {/* Illustration */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-primary-100 items-center justify-center mb-4">
            <Ionicons name="mail" size={48} color="#2d5a2d" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Check Your Email
          </Text>
          <Text className="text-gray-600 text-center">
            We&apos;ve sent a verification link to your .edu email address
          </Text>
        </View>

        {/* Main Content */}
        <Card className="p-6 mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Next Steps
          </Text>
          
          <View className="space-y-4">
            <View className="flex-row items-start">
              <View className="w-6 h-6 rounded-full bg-primary-500 items-center justify-center mr-3 mt-0.5">
                <Text className="text-white text-xs font-bold">1</Text>
              </View>
              <Text className="text-gray-700 flex-1">
                Open your email app and look for a message from Need1
              </Text>
            </View>
            
            <View className="flex-row items-start">
              <View className="w-6 h-6 rounded-full bg-primary-500 items-center justify-center mr-3 mt-0.5">
                <Text className="text-white text-xs font-bold">2</Text>
              </View>
              <Text className="text-gray-700 flex-1">
                Click the verification link in the email
              </Text>
            </View>
            
            <View className="flex-row items-start">
              <View className="w-6 h-6 rounded-full bg-primary-500 items-center justify-center mr-3 mt-0.5">
                <Text className="text-white text-xs font-bold">3</Text>
              </View>
              <Text className="text-gray-700 flex-1">
                Complete your profile setup
              </Text>
            </View>
          </View>
        </Card>

        {/* Actions */}
        <View className="space-y-3">
          <Button
            title="Open Mail App"
            onPress={handleOpenMail}
            variant="outline"
            className="w-full"
          />
          <Button
            title="Resend Link"
            onPress={handleResendLink}
            variant="secondary"
            className="w-full"
          />
        </View>
      </View>
    </SafeAreaView>
  )
} 