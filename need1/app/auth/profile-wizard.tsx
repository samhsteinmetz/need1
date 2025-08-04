import type React from "react"
import { useState } from "react"
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "../../components/Card"
import { Button } from "../../components/Button"
import { Badge } from "../../components/Badge"

type Step = 1 | 2 | 3

interface ProfileData {
  name: string
  major: string
  graduationYear: string
  skills: string[]
}

export default function ProfileWizardScreen() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    major: "",
    graduationYear: "",
    skills: [],
  })

  const availableSkills = [
    "Tutoring", "Programming", "Design", "Writing", "Moving", "Cleaning",
    "Photography", "Music", "Cooking", "Driving", "Pet Care", "Gardening"
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as Step)
    } else {
      // TODO: Save profile data
      router.push("/(tabs)")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  const toggleSkill = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const renderStep1 = () => (
    <View className="space-y-6">
      <View className="items-center mb-8">
        <View className="w-20 h-20 bg-primary-100 rounded-full items-center justify-center mb-4">
          <Ionicons name="person" size={40} color="#2d5a2d" />
        </View>
        <Text className="text-2xl font-bold text-gray-900">Step 1: Basic Info</Text>
        <Text className="text-gray-600 text-center">Tell us about yourself</Text>
      </View>

      <View className="space-y-4">
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Full Name</Text>
          <TextInput
            className="border border-secondary-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
            placeholder="Enter your full name"
            value={profileData.name}
            onChangeText={(text) => setProfileData(prev => ({ ...prev, name: text }))}
            accessibilityLabel="Full name input"
          />
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Major</Text>
          <TextInput
            className="border border-secondary-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
            placeholder="e.g., Computer Science"
            value={profileData.major}
            onChangeText={(text) => setProfileData(prev => ({ ...prev, major: text }))}
            accessibilityLabel="Major input"
          />
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Graduation Year</Text>
          <TextInput
            className="border border-secondary-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
            placeholder="e.g., 2025"
            value={profileData.graduationYear}
            onChangeText={(text) => setProfileData(prev => ({ ...prev, graduationYear: text }))}
            keyboardType="numeric"
            accessibilityLabel="Graduation year input"
          />
        </View>
      </View>
    </View>
  )

  const renderStep2 = () => (
    <View className="space-y-6">
      <View className="items-center mb-8">
        <View className="w-20 h-20 bg-accent-100 rounded-full items-center justify-center mb-4">
          <Ionicons name="leaf" size={40} color="#16a34a" />
        </View>
        <Text className="text-2xl font-bold text-gray-900">Step 2: Skills</Text>
        <Text className="text-gray-600 text-center">What can you help with?</Text>
      </View>

      <View>
        <Text className="text-sm font-medium text-gray-700 mb-4">Select your skills</Text>
        <View className="flex-row flex-wrap gap-2">
          {availableSkills.map((skill) => (
            <TouchableOpacity
              key={skill}
              onPress={() => toggleSkill(skill)}
              className={`px-4 py-2 rounded-full border ${
                profileData.skills.includes(skill)
                  ? "bg-primary-500 border-primary-500"
                  : "bg-white border-secondary-300"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  profileData.skills.includes(skill) ? "text-white" : "text-gray-700"
                }`}
              >
                {skill}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  )

  const renderStep3 = () => (
    <View className="space-y-6">
      <View className="items-center mb-8">
        <View className="w-20 h-20 bg-primary-100 rounded-full items-center justify-center mb-4">
          <Ionicons name="checkmark-circle" size={40} color="#2d5a2d" />
        </View>
        <Text className="text-2xl font-bold text-gray-900">Step 3: Review</Text>
        <Text className="text-gray-600 text-center">Confirm your profile</Text>
      </View>

      <Card className="p-6">
        <View className="space-y-4">
          <View>
            <Text className="text-sm text-gray-600">Name</Text>
            <Text className="text-lg font-semibold">{profileData.name}</Text>
          </View>
          
          <View>
            <Text className="text-sm text-gray-600">Major</Text>
            <Text className="text-lg font-semibold">{profileData.major}</Text>
          </View>
          
          <View>
            <Text className="text-sm text-gray-600">Graduation Year</Text>
            <Text className="text-lg font-semibold">{profileData.graduationYear}</Text>
          </View>
          
          <View>
            <Text className="text-sm text-gray-600">Skills</Text>
            <View className="flex-row flex-wrap gap-2 mt-2">
              {profileData.skills.map((skill) => (
                <Badge key={skill} type="karma" value={0} size="sm" />
              ))}
            </View>
          </View>
        </View>
      </Card>
    </View>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      default:
        return renderStep1()
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      {/* Progress Bar */}
      <View className="p-4 bg-white border-b border-secondary-200">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold">Step {currentStep} of 3</Text>
          <Text className="text-sm text-gray-600">{Math.round((currentStep / 3) * 100)}%</Text>
        </View>
        <View className="h-2 bg-secondary-200 rounded-full">
          <View
            className="h-full bg-primary-500 rounded-full"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        <Card className="p-6">
          {renderStepContent()}
        </Card>
      </ScrollView>

      {/* Navigation */}
      <View className="p-4 bg-white border-t border-secondary-200">
        <View className="flex-row space-x-3">
          {currentStep > 1 && (
            <Button
              title="Back"
              onPress={handleBack}
              variant="outline"
              className="flex-1"
            />
          )}
          <Button
            title={currentStep === 3 ? "Complete" : "Next"}
            onPress={handleNext}
            className="flex-1"
          />
        </View>
      </View>
    </SafeAreaView>
  )
} 