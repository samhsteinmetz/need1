"use client"

import { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { GiftedChat, type IMessage } from "react-native-gifted-chat"
import { Clock, Shield } from "lucide-react-native"
import { api } from "../../lib/api"
import { useCountdown } from "../../hooks/useCountdown"

export const Chat = ({ route }: any) => {
  const { threadId } = route.params
  const [messages, setMessages] = useState<IMessage[]>([])
  const expiryDate = "2024-01-22T12:00:00Z" // This would come from thread data
  const countdown = useCountdown(expiryDate)

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      const data = await api.getMessages(threadId)
      const giftedMessages = data.map((msg) => ({
        _id: msg._id,
        text: msg.text,
        createdAt: msg.createdAt,
        user: {
          _id: msg.user._id,
          name: msg.user.name,
          avatar: msg.user.avatar,
        },
      }))
      setMessages(giftedMessages)
    } catch (error) {
      console.error("Failed to load messages:", error)
    }
  }

  const onSend = async (newMessages: IMessage[] = []) => {
    try {
      const message = newMessages[0]
      await api.sendMessage(threadId, message.text)
      setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages))
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  const renderHeader = () => (
    <View className="bg-amber-50 dark:bg-amber-900 px-4 py-3 border-b border-amber-200 dark:border-amber-700">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Shield size={16} color="#F59E0B" />
          <Text className="text-amber-800 dark:text-amber-200 text-sm font-medium ml-2">Number-masked chat</Text>
        </View>
        <View className="flex-row items-center">
          <Clock size={16} color="#F59E0B" />
          <Text className="text-amber-800 dark:text-amber-200 text-sm ml-1">
            {countdown.isExpired ? "Expired" : `${countdown.days}d ${countdown.hours}h ${countdown.minutes}m`}
          </Text>
        </View>
      </View>
      <Text className="text-amber-700 dark:text-amber-300 text-xs mt-1">
        This conversation will auto-delete in {countdown.days} days for privacy
      </Text>
    </View>
  )

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      {renderHeader()}
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: "1",
          name: "You",
        }}
        renderAvatar={null}
        showUserAvatar={false}
        placeholder="Type a message..."
      />
    </SafeAreaView>
  )
}
