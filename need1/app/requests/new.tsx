import type React from "react"
import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "../../components/Card"
import { Button } from "../../components/Button"
import { SafeSpotMap } from "../../components/SafeSpotMap"
import { api } from "../../lib/api"
import type { Request } from "../../types"

export default function RequestWizardScreen() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    location: "",
    deadline: "",
    tags: [] as string[],
  })

  const categories = [
    "Tutoring", "Moving", "Design", "Programming", "Writing", "Photography", "Other"
  ]

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.back()
    }
  }

  const handleSubmit = async () => {
    try {
      const request = await api.createRequest({
        ...formData,
        budget: parseInt(formData.budget),
        isRemote: false,
        status: "open",
        seekerId: "1",
        bidCount: 0,
        createdAt: new Date().toISOString(),
      })
      
      Alert.alert("Success", "Request created successfully!", [
        { text: "OK", onPress: () => router.push(`/requests/${request.id}`) }
      ])
    } catch (error) {
      Alert.alert("Error", "Failed to create request. Please try again.")
    }
  }

  const renderStep1 = () => (
    <View className="flex-1">
      <Text className="text-lg font-semibold text-gray-900 mb-4">Basic Information</Text>
      
      <View className="space-y-4">
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Title</Text>
          <TextInput
            className="border border-secondary-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
            placeholder="What do you need help with?"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Description</Text>
          <TextInput
            className="border border-secondary-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
            placeholder="Provide more details about your request..."
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline
            numberOfLines={4}
          />
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Category</Text>
          <View className="flex-row flex-wrap gap-2">
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setFormData({ ...formData, category })}
                className={`px-3 py-2 rounded-full border ${
                  formData.category === category
                    ? "bg-primary-500 border-primary-500"
                    : "bg-white border-secondary-300"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    formData.category === category ? "text-white" : "text-gray-700"
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  )

  const renderStep2 = () => (
    <View className="flex-1">
      <Text className="text-lg font-semibold text-gray-900 mb-4">Budget & Timeline</Text>
      
      <View className="space-y-4">
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Budget (USD)</Text>
          <TextInput
            className="border border-secondary-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
            placeholder="Enter your budget"
            value={formData.budget}
            onChangeText={(text) => setFormData({ ...formData, budget: text })}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Deadline</Text>
          <TextInput
            className="border border-secondary-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
            placeholder="When do you need this completed?"
            value={formData.deadline}
            onChangeText={(text) => setFormData({ ...formData, deadline: text })}
          />
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Location</Text>
          <TextInput
            className="border border-secondary-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
            placeholder="Where should this be done?"
            value={formData.location}
            onChangeText={(text) => setFormData({ ...formData, location: text })}
          />
        </View>
      </View>
    </View>
  )

  const renderStep3 = () => (
    <View className="flex-1">
      <Text className="text-lg font-semibold text-gray-900 mb-4">Safe Spots & Review</Text>
      
      <View className="space-y-4">
        <SafeSpotMap safeSpots={[]} />
        
        <Card className="p-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">Request Summary</Text>
          <View className="space-y-2">
            <Text className="text-sm text-gray-600">
              <Text className="font-medium">Title:</Text> {formData.title}
            </Text>
            <Text className="text-sm text-gray-600">
              <Text className="font-medium">Budget:</Text> ${formData.budget}
            </Text>
            <Text className="text-sm text-gray-600">
              <Text className="font-medium">Category:</Text> {formData.category}
            </Text>
            <Text className="text-sm text-gray-600">
              <Text className="font-medium">Location:</Text> {formData.location}
            </Text>
          </View>
        </Card>
      </View>
    </View>
  )

  const renderStep = () => {
    switch (step) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      default:
        return renderStep1()
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 bg-white border-b border-secondary-200">
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#6b7280" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Create Request</Text>
        <View className="w-6" />
      </View>

      {/* Progress Bar */}
      <View className="p-4 bg-white border-b border-secondary-200">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-sm text-gray-600">Step {step} of 3</Text>
          <Text className="text-sm text-gray-600">{Math.round((step / 3) * 100)}%</Text>
        </View>
        <View className="h-2 bg-secondary-200 rounded-full">
          <View 
            className="h-2 bg-primary-500 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {renderStep()}
      </ScrollView>

      {/* Footer */}
      <View className="p-3 bg-white border-t border-secondary-200">
        <View className="flex-row space-x-2">
          <Button
            title="Express Interest"
            onPress={handleExpressInterest}
            size="sm"
            className="flex-1"
          />
          <TouchableOpacity
            onPress={handleChat}
            className="w-10 h-10 rounded-full bg-secondary-100 items-center justify-center"
          >
            <Ionicons name="chatbubble-outline" size={18} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
} 