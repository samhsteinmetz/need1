"use client"

import { useState } from "react"
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ChevronLeft, Camera } from "lucide-react-native"
import { Button } from "../../components/Button"

const MAJORS = [
  "Computer Science",
  "Business",
  "Engineering",
  "Psychology",
  "Biology",
  "Mathematics",
  "English",
  "History",
  "Art",
  "Music",
  "Other",
]

const SKILLS = [
  "Tutoring",
  "Programming",
  "Design",
  "Writing",
  "Math",
  "Science",
  "Languages",
  "Music",
  "Art",
  "Sports",
  "Cooking",
  "Photography",
  "Video Editing",
  "Marketing",
  "Research",
  "Data Analysis",
]

export const ProfileWizard = ({ navigation }: any) => {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({
    avatar: null,
    name: "",
    major: "",
    graduationYear: new Date().getFullYear() + 2,
    skills: [] as string[],
  })

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Complete onboarding
      navigation.navigate("Dashboard")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const toggleSkill = (skill: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const renderStep1 = () => (
    <View className="flex-1">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Set up your profile</Text>
      <Text className="text-gray-600 dark:text-gray-400 mb-8">Add a photo and your name</Text>

      <View className="items-center mb-8">
        <TouchableOpacity className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full items-center justify-center mb-4">
          <Camera size={32} color="#6B7280" />
        </TouchableOpacity>
        <Text className="text-blue-600 dark:text-blue-400 font-medium">Add Photo</Text>
      </View>

      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</Text>
        <TextInput
          value={profile.name}
          onChangeText={(text) => setProfile((prev) => ({ ...prev, name: text }))}
          placeholder="Enter your full name"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
        />
      </View>
    </View>
  )

  const renderStep2 = () => (
    <View className="flex-1">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Academic info</Text>
      <Text className="text-gray-600 dark:text-gray-400 mb-8">Tell us about your studies</Text>

      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Major</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          <View className="flex-row space-x-2">
            {MAJORS.map((major) => (
              <TouchableOpacity
                key={major}
                onPress={() => setProfile((prev) => ({ ...prev, major }))}
                className={`px-4 py-2 rounded-full border ${
                  profile.major === major
                    ? "bg-blue-500 border-blue-500"
                    : "bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                }`}
              >
                <Text className={`${profile.major === major ? "text-white" : "text-gray-700 dark:text-gray-300"}`}>
                  {major}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Graduation Year</Text>
        <TextInput
          value={profile.graduationYear.toString()}
          onChangeText={(text) => setProfile((prev) => ({ ...prev, graduationYear: Number.parseInt(text) || 2024 }))}
          placeholder="2024"
          keyboardType="numeric"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
        />
      </View>
    </View>
  )

  const renderStep3 = () => (
    <View className="flex-1">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your skills</Text>
      <Text className="text-gray-600 dark:text-gray-400 mb-8">Select skills you can offer or want to learn</Text>

      <View className="flex-row flex-wrap gap-2">
        {SKILLS.map((skill) => (
          <TouchableOpacity
            key={skill}
            onPress={() => toggleSkill(skill)}
            className={`px-3 py-2 rounded-full border ${
              profile.skills.includes(skill)
                ? "bg-blue-500 border-blue-500"
                : "bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
            }`}
          >
            <Text
              className={`text-sm ${
                profile.skills.includes(skill) ? "text-white" : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {skill}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="flex-row items-center justify-between py-4">
          <TouchableOpacity onPress={handleBack} disabled={step === 1}>
            <ChevronLeft size={24} color={step === 1 ? "#9CA3AF" : "#374151"} />
          </TouchableOpacity>

          <View className="flex-row space-x-2">
            {[1, 2, 3].map((i) => (
              <View
                key={i}
                className={`w-2 h-2 rounded-full ${i <= step ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}
              />
            ))}
          </View>

          <Text className="text-gray-500 dark:text-gray-400">{step}/3</Text>
        </View>

        {/* Content */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </ScrollView>

        {/* Footer */}
        <View className="py-4">
          <Button
            title={step === 3 ? "Complete Setup" : "Continue"}
            onPress={handleNext}
            disabled={
              (step === 1 && !profile.name) ||
              (step === 2 && !profile.major) ||
              (step === 3 && profile.skills.length === 0)
            }
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
