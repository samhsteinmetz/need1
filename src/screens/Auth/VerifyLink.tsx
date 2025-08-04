import { View, Text, Linking } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Mail } from "lucide-react-native"
import { Button } from "../../components/Button"

export const VerifyLink = ({ route, navigation }: any) => {
  const { email } = route.params

  const handleOpenMail = () => {
    Linking.openURL("mailto:")
  }

  const handleResend = () => {
    // Resend logic here
    alert("Magic link resent!")
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <View className="flex-1 px-6 justify-center items-center">
        <View className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center mb-8">
          <Mail size={40} color="#3B82F6" />
        </View>

        <Text className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">Check your inbox</Text>

        <Text className="text-gray-600 dark:text-gray-400 text-center mb-2">We've sent a magic link to</Text>

        <Text className="text-blue-600 dark:text-blue-400 font-semibold text-center mb-8">{email}</Text>

        <Text className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
          Click the link in your email to continue. The link will expire in 10 minutes.
        </Text>

        <View className="w-full space-y-3">
          <Button title="Open Mail App" onPress={handleOpenMail} className="mb-3" />

          <Button title="Resend Link" onPress={handleResend} variant="outline" />
        </View>

        <Text className="text-xs text-gray-400 dark:text-gray-500 text-center mt-8">
          Didn't receive the email? Check your spam folder
        </Text>
      </View>
    </SafeAreaView>
  )
}
