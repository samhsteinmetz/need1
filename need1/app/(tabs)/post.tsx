import type React from "react"
import { useState } from "react"
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "../../components/Card"
import { Button } from "../../components/Button"
import { api } from "../../lib/api"

type PostType = "request" | "service"

interface PostForm {
  title: string
  description: string
  price: string
  category: string
  dueDate: string
  type: PostType
}

export default function PostScreen() {
  const router = useRouter()
  const [postType, setPostType] = useState<PostType>("request")
  const [form, setForm] = useState<PostForm>({
    title: "",
    description: "",
    price: "",
    category: "",
    dueDate: "",
    type: "request",
  })
  const [loading, setLoading] = useState(false)

  const categories = [
    "Entertainment", "Education", "Marketing", "Labor", "Creative", 
    "Technology", "Moving", "Cleaning", "Programming", "Design", 
    "Writing", "Photography", "Music", "Cooking", "Driving", "Pet Care"
  ]

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.price) {
      Alert.alert("Missing Information", "Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      if (postType === "request") {
        await api.createRequest({
          title: form.title,
          description: form.description,
          budget: parseInt(form.price),
          category: form.category,
          deadline: form.dueDate,
          location: "Campus",
          tags: [form.category],
          isRemote: false,
          status: "open",
        })
      } else {
        // TODO: Implement service creation
        Alert.alert("Coming Soon", "Service posting will be available soon!")
      }
      
      Alert.alert("Success", `Your ${postType} has been posted successfully!`)
      router.back()
    } catch (error) {
      Alert.alert("Error", "Failed to create post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      <View className="p-4 bg-white border-b border-secondary-200">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="#6b7280" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Create Post</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Post Type Selection */}
        <Card className="p-6 mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">What would you like to post?</Text>
          
          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={() => setPostType("request")}
              className={`flex-1 p-4 rounded-lg border-2 ${
                postType === "request" 
                  ? "border-primary-500 bg-primary-50" 
                  : "border-secondary-300 bg-white"
              }`}
            >
              <View className="items-center">
                <Ionicons 
                  name="help-circle" 
                  size={32} 
                  color={postType === "request" ? "#2d5a2d" : "#6b7280"} 
                />
                <Text className={`font-medium mt-2 ${
                  postType === "request" ? "text-primary-600" : "text-gray-600"
                }`}>
                  Request a Service
                </Text>
                <Text className="text-xs text-gray-500 text-center mt-1">
                  Ask for help with something
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPostType("service")}
              className={`flex-1 p-4 rounded-lg border-2 ${
                postType === "service" 
                  ? "border-primary-500 bg-primary-50" 
                  : "border-secondary-300 bg-white"
              }`}
            >
              <View className="items-center">
                <Ionicons 
                  name="briefcase" 
                  size={32} 
                  color={postType === "service" ? "#2d5a2d" : "#6b7280"} 
                />
                <Text className={`font-medium mt-2 ${
                  postType === "service" ? "text-primary-600" : "text-gray-600"
                }`}>
                  Offer a Service
                </Text>
                <Text className="text-xs text-gray-500 text-center mt-1">
                  Provide a service to others
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Form */}
        <Card className="p-6">
          <View className="space-y-6">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Title *</Text>
              <TextInput
                className="border border-secondary-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
                placeholder={postType === "request" ? "What do you need help with?" : "What service are you offering?"}
                value={form.title}
                onChangeText={(text) => setForm(prev => ({ ...prev, title: text }))}
                accessibilityLabel="Post title input"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Description *</Text>
              <TextInput
                className="border border-secondary-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
                placeholder={postType === "request" ? "Provide details about what you need..." : "Describe your service in detail..."}
                value={form.description}
                onChangeText={(text) => setForm(prev => ({ ...prev, description: text }))}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                accessibilityLabel="Post description input"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Category</Text>
              <TextInput
                className="border border-secondary-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
                placeholder="e.g., Tutoring, Moving, Design"
                value={form.category}
                onChangeText={(text) => setForm(prev => ({ ...prev, category: text }))}
                accessibilityLabel="Category input"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                {postType === "request" ? "Budget ($) *" : "Price ($) *"}
              </Text>
              <View className="relative">
                <Ionicons
                  name="cash-outline"
                  size={20}
                  color="#6b7280"
                  style={{ position: 'absolute', left: 12, top: 12, zIndex: 1 }}
                />
                <TextInput
                  className="border border-secondary-300 rounded-lg pl-10 pr-4 py-3 text-gray-900 bg-white"
                  placeholder="25"
                  value={form.price}
                  onChangeText={(text) => setForm(prev => ({ ...prev, price: text }))}
                  keyboardType="numeric"
                  accessibilityLabel="Price input"
                />
              </View>
            </View>

            {postType === "request" && (
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">Due Date</Text>
                <View className="relative">
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color="#6b7280"
                    style={{ position: 'absolute', left: 12, top: 12, zIndex: 1 }}
                  />
                  <TextInput
                    className="border border-secondary-300 rounded-lg pl-10 pr-4 py-3 text-gray-900 bg-white"
                    placeholder="e.g., 2024-12-01"
                    value={form.dueDate}
                    onChangeText={(text) => setForm(prev => ({ ...prev, dueDate: text }))}
                    accessibilityLabel="Due date input"
                  />
                </View>
              </View>
            )}
          </View>
        </Card>
      </ScrollView>

      <View className="p-4 bg-white border-t border-secondary-200">
        <Button
          title={`Post ${postType === "request" ? "Request" : "Service"}`}
          onPress={handleSubmit}
          loading={loading}
          variant="primary"
          size="lg"
          className="w-full"
        />
      </View>
    </SafeAreaView>
  )
} 