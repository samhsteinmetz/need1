"use client"

import { useState } from "react"
import { View, Text, TextInput, KeyboardAvoidingView, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button } from "../../components/Button"
import { api } from "../../lib/api"

export const Welcome = ({ navigation }: any) => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSendMagicLink = async () => {
    if (!email.endsWith(".edu")) {
      alert("Please use your .edu email address")
      return
    }

    setLoading(true)
    try {
      await api.sendMagicLink(email)
      navigation.navigate("VerifyLink", { email })
    } catch (error) {
      alert("Failed to send magic link")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <View className="flex-1 px-6 justify-center">
          <View className="items-center mb-12">
            <View className="w-24 h-24 bg-blue-500 rounded-2xl items-center justify-center mb-6">
              <Text className="text-white text-3xl font-bold">N1</Text>
            </View>
            <Text className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">Welcome to Need 1</Text>
            <Text className="text-lg text-gray-600 dark:text-gray-400 text-center">
              Your campus gig exchange platform
            </Text>
          </View>

          <View className="mb-8">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enter your .edu email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="your.email@university.edu"
              keyboardType="email-address"
              autoCapitalize="none"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </View>

          <Button
            title="Send Magic Link"
            onPress={handleSendMagicLink}
            loading={loading}
            disabled={!email || loading}
            className="mb-4"
          />

          <Text className="text-xs text-gray-500 dark:text-gray-400 text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
