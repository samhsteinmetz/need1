import type React from "react"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { UserProvider } from "../contexts/UserContext"

export default function RootLayout() {
  return (
    <UserProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="requests" options={{ headerShown: false }} />
        <Stack.Screen name="messages" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="flash-market" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  )
}
