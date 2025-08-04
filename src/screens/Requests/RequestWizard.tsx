"use client"

import { useState } from "react"
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ChevronLeft, MapPin, Calendar, DollarSign } from "lucide-react-native"
import { Button } from "../../components/Button"
import { Card } from "../../components/Card"
import { SafeSpotMap } from "../../components/SafeSpotMap"

const CATEGORIES = ["Tutoring", "Moving", "Tech Help", "Design", "Writing", "Research", "Other"]

export const RequestWizard = ({ navigation }: any) => {
  const [step, setStep] = useState(1)
  const [request, setRequest] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    location: "",
    isRemote: false,
    deadline: new Date(),
  })

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Submit request
      navigation.goBack()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      navigation.goBack()
    }
  }

  const renderStep1 = () => (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">What do you need help with?</Text>
      <Text className="text-gray-600 dark:text-gray-400 mb-6">Describe your request clearly</Text>

      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</Text>
        <TextInput
          value={request.title}
          onChangeText={(text) => setRequest((prev) => ({ ...prev, title: text }))}
          placeholder="e.g., Need help with CS 2500 homework"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
        />
      </View>

      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</Text>
        <TextInput
          value={request.description}
          onChangeText={(text) => setRequest((prev) => ({ ...prev, description: text }))}
          placeholder="Provide more details about what you need..."
          multiline
          numberOfLines={4}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
          style={{ textAlignVertical: "top" }}
        />
      </View>

      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-2">
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setRequest((prev) => ({ ...prev, category }))}
                className={`px-4 py-2 rounded-full border ${
                  request.category === category
                    ? "bg-blue-500 border-blue-500"
                    : "bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                }`}
              >
                <Text
                  className={`${request.category === category ? "text-white" : "text-gray-700 dark:text-gray-300"}`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Budget ($)</Text>
        <View className="flex-row items-center">
          <DollarSign size={20} color="#6B7280" />
          <TextInput
            value={request.budget}
            onChangeText={(text) => setRequest((prev) => ({ ...prev, budget: text }))}
            placeholder="25"
            keyboardType="numeric"
            className="flex-1 ml-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
          />
        </View>
      </View>
    </ScrollView>
  )

  const renderStep2 = () => (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Time & Location</Text>
      <Text className="text-gray-600 dark:text-gray-400 mb-6">When and where should this happen?</Text>

      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Deadline</Text>
        <TouchableOpacity className="flex-row items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-800">
          <Calendar size={20} color="#6B7280" />
          <Text className="ml-2 text-gray-900 dark:text-white">{request.deadline.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>

      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Location Type</Text>
        <View className="flex-row space-x-3 mb-4">
          <TouchableOpacity
            onPress={() => setRequest((prev) => ({ ...prev, isRemote: false }))}
            className={`flex-1 p-3 rounded-xl border ${
              !request.isRemote
                ? "bg-blue-500 border-blue-500"
                : "bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
            }`}
          >
            <Text
              className={`text-center font-medium ${
                !request.isRemote ? "text-white" : "text-gray-700 dark:text-gray-300"
              }`}
            >
              In Person
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRequest((prev) => ({ ...prev, isRemote: true }))}
            className={`flex-1 p-3 rounded-xl border ${
              request.isRemote
                ? "bg-blue-500 border-blue-500"
                : "bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
            }`}
          >
            <Text
              className={`text-center font-medium ${
                request.isRemote ? "text-white" : "text-gray-700 dark:text-gray-300"
              }`}
            >
              Remote
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {!request.isRemote && (
        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</Text>
          <View className="flex-row items-center mb-4">
            <MapPin size={20} color="#6B7280" />
            <TextInput
              value={request.location}
              onChangeText={(text) => setRequest((prev) => ({ ...prev, location: text }))}
              placeholder="e.g., Snell Library, Room 302"
              className="flex-1 ml-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </View>
          <SafeSpotMap height={150} />
        </View>
      )}
    </ScrollView>
  )

  const renderStep3 = () => (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Review & Publish</Text>
      <Text className="text-gray-600 dark:text-gray-400 mb-6">Double-check your request before publishing</Text>

      <Card className="p-4 mb-6">
        <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{request.title}</Text>
        <Text className="text-gray-600 dark:text-gray-400 mb-3">{request.description}</Text>

        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-sm text-gray-500 dark:text-gray-400">Category:</Text>
          <Text className="text-sm font-medium text-gray-900 dark:text-white">{request.category}</Text>
        </View>

        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-sm text-gray-500 dark:text-gray-400">Budget:</Text>
          <Text className="text-sm font-medium text-green-600">${request.budget}</Text>
        </View>

        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-sm text-gray-500 dark:text-gray-400">Location:</Text>
          <Text className="text-sm font-medium text-gray-900 dark:text-white">
            {request.isRemote ? "Remote" : request.location}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-gray-500 dark:text-gray-400">Deadline:</Text>
          <Text className="text-sm font-medium text-gray-900 dark:text-white">
            {request.deadline.toLocaleDateString()}
          </Text>
        </View>
      </Card>

      <View className="bg-blue-50 dark:bg-blue-900 p-4 rounded-xl mb-6">
        <Text className="text-sm text-blue-800 dark:text-blue-200">
          💡 Your request will be visible to verified students on your campus. You'll receive notifications when someone
          expresses interest.
        </Text>
      </View>
    </ScrollView>
  )

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <TouchableOpacity onPress={handleBack}>
            <ChevronLeft size={24} color="#374151" />
          </TouchableOpacity>

          <View className="flex-row space-x-2">
            {[1, 2, 3].map((i) => (
              <View
                key={i}
                className={`w-2 h-2 rounded-full ${i <= step ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}
              />
            ))}
          </View>

          <Text className="text-gray-500 dark:text-gray-400">{step}/3</Text>
        </View>

        {/* Content */}
        <View className="flex-1 px-4 py-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </View>

        {/* Footer */}
        <View className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            title={step === 3 ? "Publish Request" : "Continue"}
            onPress={handleNext}
            disabled={
              (step === 1 && (!request.title || !request.category || !request.budget)) ||
              (step === 2 && !request.isRemote && !request.location)
            }
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
