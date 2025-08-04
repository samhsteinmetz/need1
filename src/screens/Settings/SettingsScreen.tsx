"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Bell, Shield, Moon, HelpCircle, LogOut, ChevronRight } from "lucide-react-native"
import { Card } from "../../components/Card"
import { Button } from "../../components/Button"
import { useThemeColors } from "../../hooks/useThemeColors"

export const SettingsScreen = ({ navigation }: any) => {
  const { isDark } = useThemeColors()
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(isDark)
  const [locationSharing, setLocationSharing] = useState(true)

  const SettingItem = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    rightElement,
  }: {
    icon: any
    title: string
    subtitle?: string
    onPress?: () => void
    rightElement?: React.ReactNode
  }) => (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View className="flex-row items-center p-4 border-b border-gray-100 dark:border-gray-700">
        <View className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full items-center justify-center mr-3">
          <Icon size={20} color="#6B7280" />
        </View>
        <View className="flex-1">
          <Text className="font-medium text-gray-900 dark:text-white">{title}</Text>
          {subtitle && <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</Text>}
        </View>
        {rightElement || (onPress && <ChevronRight size={20} color="#9CA3AF" />)}
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-slate-900">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Notifications */}
        <Card className="m-4">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white p-4 pb-0">Notifications</Text>
          <SettingItem
            icon={Bell}
            title="Push Notifications"
            subtitle="Get notified about new opportunities and messages"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
                thumbColor={notifications ? "#FFFFFF" : "#9CA3AF"}
              />
            }
          />
        </Card>

        {/* Privacy & Security */}
        <Card className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white p-4 pb-0">Privacy & Security</Text>
          <SettingItem
            icon={Shield}
            title="Location Sharing"
            subtitle="Share your location for better job matching"
            rightElement={
              <Switch
                value={locationSharing}
                onValueChange={setLocationSharing}
                trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
                thumbColor={locationSharing ? "#FFFFFF" : "#9CA3AF"}
              />
            }
          />
          <SettingItem icon={Shield} title="Privacy Policy" onPress={() => {}} />
          <SettingItem icon={Shield} title="Terms of Service" onPress={() => {}} />
        </Card>

        {/* Appearance */}
        <Card className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white p-4 pb-0">Appearance</Text>
          <SettingItem
            icon={Moon}
            title="Dark Mode"
            subtitle="Switch between light and dark themes"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
                thumbColor={darkMode ? "#FFFFFF" : "#9CA3AF"}
              />
            }
          />
        </Card>

        {/* Support */}
        <Card className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white p-4 pb-0">Support</Text>
          <SettingItem icon={HelpCircle} title="Help Center" subtitle="Get help and find answers" onPress={() => {}} />
          <SettingItem icon={HelpCircle} title="Contact Support" subtitle="Reach out to our team" onPress={() => {}} />
        </Card>

        {/* Account Actions */}
        <Card className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white p-4 pb-0">Account</Text>
          <SettingItem icon={LogOut} title="Sign Out" onPress={() => {}} />
        </Card>

        {/* Danger Zone */}
        <Card className="mx-4 mb-8">
          <Text className="text-lg font-semibold text-red-600 dark:text-red-400 p-4 pb-0">Danger Zone</Text>
          <View className="p-4">
            <Text className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </Text>
            <Button title="Delete Account" variant="danger" onPress={() => {}} />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}
