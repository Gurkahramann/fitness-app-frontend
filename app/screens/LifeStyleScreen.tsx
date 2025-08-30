"use client"

import { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useFormData } from "../context/FormContext"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "expo-router"
import { useToast } from "../context/ToastContext"
import { defaultFormData } from "../context/FormContext"
import styles from "../styles/LifeStyleScreen.styles";

import React from "react"

const ACTIVITY_OPTIONS = [
  { key: "sedentary", label: "Hareketsiz: hiç ya da çok az egzersiz", icon: "seat-outline" },
  { key: "light", label: "Hafif: haftada 1-3 gün egzersiz", icon: "walk" },
  { key: "moderate", label: "Orta: haftada 4-5 gün egzersiz", icon: "run" },
  { key: "active", label: "Aktif: her gün veya yoğun egzersiz (haftada 3-4 gün)", icon: "bike" },
  { key: "veryActive", label: "Çok Aktif: haftada 6-7 gün yoğun egzersiz", icon: "weight-lifter" },
  { key: "extraActive", label: "Ekstra Aktif: her gün çok yoğun egzersiz veya fiziksel iş", icon: "dumbbell" },
]

// Predefined goals to replace the free text input
const GOALS = [
  { key: "loseWeight", label: "Kilo Vermek", icon: "scale-bathroom" },
  { key: "gainMuscle", label: "Kas Kazanmak", icon: "arm-flex" },
  { key: "stayFit", label: "Formda Kalmak", icon: "heart-pulse" },
  { key: "improveHealth", label: "Sağlığı İyileştirmek", icon: "medical-bag" },
]

export default function LifestyleScreen() {
  const { formData, setFormData } = useFormData()
  const router = useRouter()
  const { showToast } = useToast()
  const isDark = useColorScheme() === "dark"
  const { register, isLoading } = useAuth()

  // Set default goal if not already set
  const [selectedGoal, setSelectedGoal] = useState(formData.interestArea || "")

  // Handle activity selection
  const handleSelectActivity = (activityKey: string) => {
    setFormData((prev) => ({ ...prev, activityLevel: activityKey }))
  }

  // Handle goal selection
  const handleSelectGoal = (goalKey: string) => {
    setSelectedGoal(goalKey)
    setFormData((prev) => ({ ...prev, interestArea: goalKey }))
  }

  const handleSave = async () => {
    if (!formData.activityLevel || !selectedGoal) {
      showToast("Lütfen aktivite seviyesi ve hedef seçiniz.", 'error')
      return
    }

    // Prepare registration data
    const registerData = {
      email: formData.email,
      password: formData.password,
      name: `${formData.firstName} ${formData.lastName}`,
      gender: (formData.gender === "male" ? "Male" : "Female") as "Male" | "Female",
      height: Number(formData.height),
      weight: Number(formData.weight),
      birthDate: convertToISODate(formData.birthDate),
      age: calculateAge(formData.birthDate),
      activityLevel: formData.activityLevel,
      goal: selectedGoal,
    }

    

    try {
      const response = await register(registerData)

          
      if (response?.success) {
        setFormData(defaultFormData)
        showToast("🎉 Kayıt başarılı!", 'success')
        router.push("/login")
      } else {
        showToast(`❌ Kayıt başarısız: ${response?.message || "Bilinmeyen hata"}`, 'error')
      }
    } catch (error) {
      console.log("💥 Kayıt hatası:", error)
      showToast("❌ Bir hata oluştu, lütfen tekrar deneyin.", 'error')
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f8f9fa" }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              <View style={styles.headerContainer}>
                <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Yaşam Tarzı</Text>
                <Text style={[styles.subtitle, { color: isDark ? "#aaa" : "#666" }]}>Fitness hedefleriniz için aktivite seviyenizi seçin</Text>
              </View>

              {/* Activity Level Section */}
              <View style={styles.sectionContainer}>
                <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Aktivite Seviyesi</Text>

                <View style={styles.optionsContainer}>
                  {ACTIVITY_OPTIONS.map((activity) => (
                    <TouchableOpacity
                      key={activity.key}
                      style={[
                        styles.optionItem,
                        {
                          backgroundColor: isDark ? "#1e1e1e" : "#fff",
                          borderColor:
                            formData.activityLevel === activity.key
                              ? isDark
                                ? "#fff"
                                : "#000"
                              : isDark
                                ? "#333"
                                : "#e0e0e0",
                        },
                      ]}
                      onPress={() => handleSelectActivity(activity.key)}
                    >
                      <View style={styles.optionIconContainer}>
                        <MaterialCommunityIcons
                          name={activity.icon as any}
                          size={24}
                          color={
                            formData.activityLevel === activity.key
                              ? isDark
                                ? "#fff"
                                : "#000"
                              : isDark
                                ? "#aaa"
                                : "#666"
                          }
                        />
                      </View>
                      <View style={styles.optionTextContainer}>
                        <Text style={[styles.optionText, { color: isDark ? "#fff" : "#000" }]}>
                          {activity.label}
                        </Text>
                      </View>
                      {formData.activityLevel === activity.key && (
                        <MaterialCommunityIcons
                          name="check"
                          size={20}
                          color={isDark ? "#fff" : "#000"}
                          style={styles.checkIcon}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Goals Section */}
              <View style={styles.sectionContainer}>
                <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Fitness Hedefi</Text>

                <View style={styles.goalsContainer}>
                  {GOALS.map((goal) => (
                    <TouchableOpacity
                      key={goal.key}
                      style={[
                        styles.goalItem,
                        {
                          backgroundColor: isDark ? "#1e1e1e" : "#fff",
                          borderColor:
                            selectedGoal === goal.key ? (isDark ? "#fff" : "#000") : isDark ? "#333" : "#e0e0e0",
                        },
                      ]}
                      onPress={() => handleSelectGoal(goal.key)}
                    >
                      <MaterialCommunityIcons
                        name={goal.icon as any}
                        size={28}
                        color={selectedGoal === goal.key ? (isDark ? "#fff" : "#000") : isDark ? "#aaa" : "#666"}
                        style={styles.goalIcon}
                      />
                      <Text style={[styles.goalText, { color: isDark ? "#fff" : "#000" }]}>{goal.label}</Text>
                      {selectedGoal === goal.key && (
                        <View style={[styles.selectedIndicator, { backgroundColor: isDark ? "#fff" : "#000" }]} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Save Button */}
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: isDark ? "#fff" : "#000" }]}
                onPress={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={isDark ? "#000" : "#fff"} />
                ) : (
                  <Text style={[styles.saveButtonText, { color: isDark ? "#000" : "#fff" }]}>Kaydet</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

function calculateAge(birthDateStr: string): number {
  const [day, month, year] = birthDateStr.split("/").map(Number)
  const birthDate = new Date(year, month - 1, day)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}
function convertToISODate(dateStr: string): string {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`; // "YYYY-MM-DD"
}

