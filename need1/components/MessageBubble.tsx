import type React from "react"
import { View, Text } from "react-native"

interface MessageBubbleProps {
  message: {
    id: string
    text: string
    sender: string
    timestamp: string
    isOwn: boolean
  }
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <View className={`mb-3 ${message.isOwn ? "items-end" : "items-start"}`}>
      <View
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          message.isOwn
            ? "bg-primary-500 rounded-br-md"
            : "bg-secondary-100 rounded-bl-md"
        }`}
      >
        <Text
          className={`text-sm ${
            message.isOwn ? "text-white" : "text-gray-900"
          }`}
        >
          {message.text}
        </Text>
        <Text
          className={`text-xs mt-1 ${
            message.isOwn ? "text-primary-100" : "text-gray-500"
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  )
} 