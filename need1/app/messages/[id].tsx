import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { MessageBubble } from "../../components/MessageBubble"
import { api } from "../../lib/api"
import type { Message, Thread } from "../../types"

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [thread, setThread] = useState<Thread | null>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await api.getMessages(id)
        setMessages(data)
      } catch (error) {
        console.error("Failed to fetch messages:", error)
      }
    }

    const fetchThread = async () => {
      try {
        const data = await api.getThreadById(id)
        setThread(data)
      } catch (error) {
        console.error("Failed to fetch thread:", error)
      }
    }

    fetchMessages()
    fetchThread()
  }, [id])

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      createdAt: new Date(),
      user: {
        _id: "1",
        name: "You",
        avatar: undefined
      },
      threadId: id,
      isOwn: true
    }

    setMessages(prev => [...prev, message])
    setNewMessage("")

    // TODO: Send to API
    try {
      await api.sendMessage(id, newMessage)
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  const renderMessage = ({ item }: { item: Message }) => (
    <MessageBubble message={item} />
  )

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      {/* Header */}
      <View className="flex-row items-center p-4 bg-white border-b border-secondary-200">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#6b7280" />
        </TouchableOpacity>
        <View className="w-10 h-10 rounded-full bg-primary-100 mr-3 items-center justify-center">
          <Ionicons name="person" size={20} color="#2d5a2d" />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900">
            {thread?.participants[1]?.name || "Student"}
          </Text>
          <Text className="text-sm text-gray-500">
            Expires {thread?.expiresAt ? new Date(thread.expiresAt).toLocaleDateString() : "7 days"}
          </Text>
        </View>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView 
        className="flex-1" 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
          inverted
        />

        {/* Message Input */}
        <View className="p-4 bg-white border-t border-secondary-200">
          <View className="flex-row items-center space-x-3">
            <TextInput
              className="flex-1 border border-secondary-300 rounded-full px-4 py-3 text-gray-900 bg-white"
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              onPress={sendMessage}
              disabled={!newMessage.trim()}
              className={`w-10 h-10 rounded-full items-center justify-center ${
                newMessage.trim() ? "bg-primary-500" : "bg-secondary-200"
              }`}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={newMessage.trim() ? "#ffffff" : "#6b7280"} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
} 