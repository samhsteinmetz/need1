import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { Home, Search, MessageCircle, User } from "lucide-react-native"

// Auth Screens
import { Welcome } from "../screens/Auth/Welcome"
import { VerifyLink } from "../screens/Auth/VerifyLink"
import { ProfileWizard } from "../screens/Auth/ProfileWizard"

// Main Screens
import { Dashboard } from "../screens/Home/Dashboard"
import { RequestWizard } from "../screens/Requests/RequestWizard"
import { RequestDetail } from "../screens/Requests/RequestDetail"
import { OfferFeed } from "../screens/Offers/OfferFeed"
import { ThreadList } from "../screens/Messages/ThreadList"
import { Chat } from "../screens/Messages/Chat"
import { ProfileScreen } from "../screens/Profile/ProfileScreen"
import { DropLanding } from "../screens/FlashMarket/DropLanding"
import { SettingsScreen } from "../screens/Settings/SettingsScreen"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="VerifyLink" component={VerifyLink} />
    <Stack.Screen name="ProfileWizard" component={ProfileWizard} />
  </Stack.Navigator>
)

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: "Need 1" }} />
    <Stack.Screen name="RequestWizard" component={RequestWizard} options={{ title: "Post Request" }} />
    <Stack.Screen name="RequestDetail" component={RequestDetail} options={{ title: "Request Details" }} />
    <Stack.Screen name="DropLanding" component={DropLanding} options={{ title: "Flash Market" }} />
  </Stack.Navigator>
)

const OffersStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="OfferFeed" component={OfferFeed} options={{ title: "Opportunities" }} />
  </Stack.Navigator>
)

const MessagesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ThreadList" component={ThreadList} options={{ title: "Messages" }} />
    <Stack.Screen name="Chat" component={Chat} options={{ title: "Chat" }} />
  </Stack.Navigator>
)

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: "Profile" }} />
    <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: "Settings" }} />
  </Stack.Navigator>
)

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let IconComponent

        switch (route.name) {
          case "Home":
            IconComponent = Home
            break
          case "Offers":
            IconComponent = Search
            break
          case "Messages":
            IconComponent = MessageCircle
            break
          case "Profile":
            IconComponent = User
            break
          default:
            IconComponent = Home
        }

        return <IconComponent size={size} color={color} />
      },
      tabBarActiveTintColor: "#3B82F6",
      tabBarInactiveTintColor: "gray",
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Offers" component={OffersStack} />
    <Tab.Screen name="Messages" component={MessagesStack} />
    <Tab.Screen name="Profile" component={ProfileStack} />
  </Tab.Navigator>
)

export const Navigation = () => {
  const isAuthenticated = true // This would come from your auth state

  return <NavigationContainer>{isAuthenticated ? <MainTabs /> : <AuthStack />}</NavigationContainer>
}
