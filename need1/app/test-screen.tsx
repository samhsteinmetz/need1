import { Text, View, TouchableOpacity } from "react-native";
import "../global.css";

export default function Index() {
  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          NativeWind Test
        </Text>
        <Text className="text-gray-600">
          If you can see this styled text, NativeWind is working! 🎉
        </Text>
      </View>

      {/* Test Cards */}
      <View className="space-y-4">
        <View className="bg-blue-500 rounded-lg p-4">
          <Text className="text-white font-semibold text-lg">
            Blue Card - Primary Color
          </Text>
          <Text className="text-blue-100 text-sm mt-1">
            This tests blue color variants
          </Text>
        </View>

        <View className="bg-green-500 rounded-lg p-4">
          <Text className="text-white font-semibold text-lg">
            Green Card - Success Color
          </Text>
          <Text className="text-green-100 text-sm mt-1">
            This tests green color variants
          </Text>
        </View>

        <View className="bg-red-500 rounded-lg p-4">
          <Text className="text-white font-semibold text-lg">
            Red Card - Error Color
          </Text>
          <Text className="text-red-100 text-sm mt-1">
            This tests red color variants
          </Text>
        </View>
      </View>

      {/* Test Button */}
      <TouchableOpacity className="bg-purple-600 rounded-xl p-4 mt-6 active:bg-purple-700">
        <Text className="text-white font-bold text-center text-lg">
          Test Button
        </Text>
      </TouchableOpacity>

      {/* Status Indicator */}
      <View className="mt-6 bg-white rounded-lg p-4">
        <Text className="text-center text-sm text-gray-500">
          ✅ NativeWind Configuration Test
        </Text>
        <Text className="text-center text-xs text-gray-400 mt-1">
          Colors, spacing, typography, and interactions
        </Text>
      </View>
    </View>
  );
}
