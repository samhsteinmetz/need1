import type React from "react"
import { View, Text } from "react-native"
import type { Message } from "../../src copy/types"

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  return (
    <View className={`flex-row ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
      <View
        className={`
          max-w-[80%] px-4 py-2 rounded-2xl
          ${isOwn ? "bg-blue-500 rounded-br-md" : "bg-gray-200 dark:bg-gray-700 rounded-bl-md"}
        `}
      >
        <Text
          className={`
            text-sm
            ${isOwn ? "text-white" : "text-gray-900 dark:text-white"}
          `}
        >
          {message.text}
        </Text>
        <Text
          className={`
            text-xs mt-1
            ${isOwn ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}
          `}
        >
          {message.createdAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  )
}
