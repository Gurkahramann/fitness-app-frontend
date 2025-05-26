"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useAuth } from "../../hooks/useAuth"
import { useToast } from "../context/ToastContext"
import { useUserProfile } from "../context/UserProfileContext"
import CustomDateModal from "../../components/CustomDateModal"
import React from "react"
import type { User } from "../context/AuthContext"
import { authFetch } from "../utils/authFetch"

export default function ProfileEditScreen() {
  const isDark = useColorScheme() === "dark"
  const router = useRouter()
  const { userProfile } = useUserProfile()
  const { user, setUser } = useAuth()
  const { showToast } = useToast()
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(70)
  const [birthDate, setBirthDate] = useState("")
  const [activityLevel, setActivityLevel] = useState("moderate")
  const [fitnessGoal, setFitnessGoal] = useState("stayFit")
  // Initialize form with user data
  useEffect(() => {
    console.log("User Profile:", userProfile)
    if (userProfile) {
      setName(userProfile.name || "")
      setHeight(userProfile.height || 170)
      setWeight(userProfile.weight || 70)
      setBirthDate(userProfile.birthDate || "")
      setActivityLevel(userProfile.activityLevel || "moderate")
      setFitnessGoal(userProfile.goal || "stayFit")
    }
  }, [userProfile])

  // Date picker functions
  const showDatePicker = () => {
    setDatePickerVisible(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisible(false)
  }

  const handleDateSelect = (selectedDate: string) => {
    try {
      // Modern DatePicker'dan gelen format: YYYY/MM/DD
      const [year, month, day] = selectedDate.split("/")

      // Türkçe format için çevir: DD/MM/YYYY
      const formattedDate = `${day}/${month}/${year}`
      setBirthDate(formattedDate)
    } catch (error) {
      console.error("Error handling date selection:", error)
    }
  }

  // Modern DatePicker için mevcut tarihi YYYY/MM/DD formatına çevir
  const getCurrentDateForPicker = (): string => {
    try {
      if (birthDate) {
        const [day, month, year] = birthDate.split("/")
        return `${year}/${month}/${day}`
      }
      const today = new Date()
      return `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`
    } catch (error) {
      console.error("Error getting current date for picker:", error)
      // Return today's date as fallback
      const today = new Date()
      return `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`
    }
  }

  // Modern DatePicker için maksimum tarih (bugün)
  const getMaxDate = (): string => {
    const today = new Date()
    return `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`
  }

  // Handle save
  const handleSave = async () => {
    if (!name) {
      showToast("İsim alanı boş bırakılamaz", "error")
      return
    }

    try {
      const updatedData = {
        ...user,
        name,
        height,
        weight,
        birthDate,
        activityLevel,
        fitnessGoal,
      }
      const response = await authFetch(
        `${process.env.EXPO_PUBLIC_SPRING_API}/auth/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (response.ok) {
        // Backend'den dönen güncel kullanıcı bilgisini state'e kaydet
        if (setUser) setUser(updatedData as User);
        showToast("Profil başarıyla güncellendi", "success");
        router.back();
      } else {
        showToast("Profil güncellenemedi", "error");
      }
      // Optionally, send updatedData to backend here
      if (setUser) setUser(updatedData as User)
      router.back()
    } catch (error) {
      console.error("Error updating profile:", error)
      showToast("Profil güncellenirken bir hata oluştu", "error")
    }
  }

  // Handle cancel
  const handleCancel = () => {
    router.back()
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f8f9fa" }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={[styles.cancelButton, { color: isDark ? "#fff" : "#000" }]}>İptal</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#000" }]}>Profili Düzenle</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={[styles.saveButton, { color: "#3DCC85" }]}>Kaydet</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Name Input */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>İsim</Text>
          <TextInput
            style={[
              styles.textInput,
              {
                color: isDark ? "#fff" : "#000",
                backgroundColor: isDark ? "#333" : "#f5f5f5",
                borderColor: isDark ? "#444" : "#ddd",
              },
            ]}
            value={name}
            onChangeText={setName}
            placeholderTextColor={isDark ? "#aaa" : "#999"}
          />
        </View>

        {/* Height Slider */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="human-male-height" size={20} color={isDark ? "#fff" : "#000"} />
            <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Boy</Text>
            <Text style={[styles.valueText, { color: isDark ? "#fff" : "#000" }]}>{height} cm</Text>
          </View>
          <View style={styles.sliderContainer}>
            <Text style={[styles.sliderMin, { color: isDark ? "#aaa" : "#666" }]}>100cm</Text>
            <View style={styles.sliderWrapper}>
              <View
                style={[
                  styles.sliderTrack,
                  {
                    backgroundColor: isDark ? "#444" : "#e0e0e0",
                  },
                ]}
              />
              <View
                style={[
                  styles.sliderFill,
                  {
                    width: `${((height - 100) / 120) * 100}%`,
                    backgroundColor: isDark ? "#fff" : "#000",
                  },
                ]}
              />
              <TouchableOpacity
                style={[
                  styles.sliderThumb,
                  {
                    left: `${((height - 100) / 120) * 100}%`,
                    backgroundColor: isDark ? "#fff" : "#000",
                  },
                ]}
                onLayout={() => {}}
              />
            </View>
            <Text style={[styles.sliderMax, { color: isDark ? "#aaa" : "#666" }]}>220cm</Text>
          </View>
        </View>

        {/* Weight Slider */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="weight" size={20} color={isDark ? "#fff" : "#000"} />
            <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Kilo</Text>
            <Text style={[styles.valueText, { color: isDark ? "#fff" : "#000" }]}>{weight.toFixed(1)} kg</Text>
          </View>
          <View style={styles.sliderContainer}>
            <Text style={[styles.sliderMin, { color: isDark ? "#aaa" : "#666" }]}>30kg</Text>
            <View style={styles.sliderWrapper}>
              <View
                style={[
                  styles.sliderTrack,
                  {
                    backgroundColor: isDark ? "#444" : "#e0e0e0",
                  },
                ]}
              />
              <View
                style={[
                  styles.sliderFill,
                  {
                    width: `${((weight - 30) / 170) * 100}%`,
                    backgroundColor: isDark ? "#fff" : "#000",
                  },
                ]}
              />
              <TouchableOpacity
                style={[
                  styles.sliderThumb,
                  {
                    left: `${((weight - 30) / 170) * 100}%`,
                    backgroundColor: isDark ? "#fff" : "#000",
                  },
                ]}
                onLayout={() => {}}
              />
            </View>
            <Text style={[styles.sliderMax, { color: isDark ? "#aaa" : "#666" }]}>200kg</Text>
          </View>
        </View>

        {/* Birth Date */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Doğum Tarihi</Text>
          <TouchableOpacity
            style={[
              styles.dateButton,
              {
                backgroundColor: isDark ? "#333" : "#f5f5f5",
                borderColor: isDark ? "#444" : "#ddd",
              },
            ]}
            onPress={showDatePicker}
          >
            <Text style={[styles.dateButtonText, { color: isDark ? "#fff" : "#000" }]}>
              {birthDate || "Tarih Seçin"}
            </Text>
            <MaterialCommunityIcons name="calendar" size={20} color={isDark ? "#aaa" : "#666"} />
          </TouchableOpacity>
        </View>

        {/* Activity Level */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Aktivite Seviyesi</Text>

          <View style={styles.activityOptions}>
            <TouchableOpacity
              style={[
                styles.activityOption,
                activityLevel === "sedentary" && {
                  backgroundColor: isDark ? "#3DCC85" : "#3DCC85",
                },
              ]}
              onPress={() => setActivityLevel("sedentary")}
            >
              <MaterialCommunityIcons
                name="seat-outline"
                size={24}
                color={activityLevel === "sedentary" ? (isDark ? "#000" : "#fff") : isDark ? "#fff" : "#000"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.activityOption,
                activityLevel === "light" && {
                  backgroundColor: isDark ? "#3DCC85" : "#3DCC85",
                },
              ]}
              onPress={() => setActivityLevel("light")}
            >
              <MaterialCommunityIcons
                name="walk"
                size={24}
                color={activityLevel === "light" ? (isDark ? "#000" : "#fff") : isDark ? "#fff" : "#000"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.activityOption,
                activityLevel === "moderate" && {
                  backgroundColor: isDark ? "#3DCC85" : "#3DCC85",
                },
              ]}
              onPress={() => setActivityLevel("moderate")}
            >
              <MaterialCommunityIcons
                name="run"
                size={24}
                color={activityLevel === "moderate" ? (isDark ? "#000" : "#fff") : isDark ? "#fff" : "#000"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.activityOption,
                activityLevel === "active" && {
                  backgroundColor: isDark ? "#3DCC85" : "#3DCC85",
                },
              ]}
              onPress={() => setActivityLevel("active")}
            >
              <MaterialCommunityIcons
                name="bike"
                size={24}
                color={activityLevel === "active" ? (isDark ? "#000" : "#fff") : isDark ? "#fff" : "#000"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Activity Level Details */}
        <View style={styles.activityLevelDetails}>
          <TouchableOpacity
            style={[
              styles.activityLevelItem,
              {
                backgroundColor: isDark ? "#222" : "#f5f5f5",
                borderColor: activityLevel === "sedentary" ? "#3DCC85" : "transparent",
              },
            ]}
            onPress={() => setActivityLevel("sedentary")}
          >
            <MaterialCommunityIcons
              name="seat-outline"
              size={20}
              color={isDark ? "#fff" : "#000"}
              style={styles.activityLevelIcon}
            />
            <Text style={[styles.activityLevelText, { color: isDark ? "#fff" : "#000" }]}>
              Sedentary: little or no exercise
            </Text>
            {activityLevel === "sedentary" && (
              <MaterialCommunityIcons name="check" size={20} color="#3DCC85" style={styles.checkIcon} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.activityLevelItem,
              {
                backgroundColor: isDark ? "#222" : "#f5f5f5",
                borderColor: activityLevel === "light" ? "#3DCC85" : "transparent",
              },
            ]}
            onPress={() => setActivityLevel("light")}
          >
            <MaterialCommunityIcons
              name="walk"
              size={20}
              color={isDark ? "#fff" : "#000"}
              style={styles.activityLevelIcon}
            />
            <Text style={[styles.activityLevelText, { color: isDark ? "#fff" : "#000" }]}>
              Light: exercise 1-3 times/week
            </Text>
            {activityLevel === "light" && (
              <MaterialCommunityIcons name="check" size={20} color="#3DCC85" style={styles.checkIcon} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.activityLevelItem,
              {
                backgroundColor: isDark ? "#222" : "#f5f5f5",
                borderColor: activityLevel === "moderate" ? "#3DCC85" : "transparent",
              },
            ]}
            onPress={() => setActivityLevel("moderate")}
          >
            <MaterialCommunityIcons
              name="run"
              size={20}
              color={isDark ? "#fff" : "#000"}
              style={styles.activityLevelIcon}
            />
            <Text style={[styles.activityLevelText, { color: isDark ? "#fff" : "#000" }]}>
              Moderate: exercise 4-5 times/week
            </Text>
            {activityLevel === "moderate" && (
              <MaterialCommunityIcons name="check" size={20} color="#3DCC85" style={styles.checkIcon} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.activityLevelItem,
              {
                backgroundColor: isDark ? "#222" : "#f5f5f5",
                borderColor: activityLevel === "active" ? "#3DCC85" : "transparent",
              },
            ]}
            onPress={() => setActivityLevel("active")}
          >
            <MaterialCommunityIcons
              name="bike"
              size={20}
              color={isDark ? "#fff" : "#000"}
              style={styles.activityLevelIcon}
            />
            <Text style={[styles.activityLevelText, { color: isDark ? "#fff" : "#000" }]}>
              Active: daily exercise or intense exercise 3-4 times/week
            </Text>
            {activityLevel === "active" && (
              <MaterialCommunityIcons name="check" size={20} color="#3DCC85" style={styles.checkIcon} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.activityLevelItem,
              {
                backgroundColor: isDark ? "#222" : "#f5f5f5",
                borderColor: activityLevel === "veryActive" ? "#3DCC85" : "transparent",
              },
            ]}
            onPress={() => setActivityLevel("veryActive")}
          >
            <MaterialCommunityIcons
              name="weight-lifter"
              size={20}
              color={isDark ? "#fff" : "#000"}
              style={styles.activityLevelIcon}
            />
            <Text style={[styles.activityLevelText, { color: isDark ? "#fff" : "#000" }]}>
              Very Active: intense exercise 6-7 times/week
            </Text>
            {activityLevel === "veryActive" && (
              <MaterialCommunityIcons name="check" size={20} color="#3DCC85" style={styles.checkIcon} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.activityLevelItem,
              {
                backgroundColor: isDark ? "#222" : "#f5f5f5",
                borderColor: activityLevel === "extraActive" ? "#3DCC85" : "transparent",
              },
            ]}
            onPress={() => setActivityLevel("extraActive")}
          >
            <MaterialCommunityIcons
              name="arm-flex"
              size={20}
              color={isDark ? "#fff" : "#000"}
              style={styles.activityLevelIcon}
            />
            <Text style={[styles.activityLevelText, { color: isDark ? "#fff" : "#000" }]}>
              Extra Active: very intense exercise daily, or physical job
            </Text>
            {activityLevel === "extraActive" && (
              <MaterialCommunityIcons name="check" size={20} color="#3DCC85" style={styles.checkIcon} />
            )}
          </TouchableOpacity>
        </View>

        {/* Fitness Goals */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Fitness Hedefi</Text>

          <View style={styles.goalsContainer}>
            <TouchableOpacity
              style={[
                styles.goalItem,
                {
                  backgroundColor: isDark ? "#222" : "#f5f5f5",
                  borderColor: fitnessGoal === "loseWeight" ? "#3DCC85" : "transparent",
                },
              ]}
              onPress={() => setFitnessGoal("loseWeight")}
            >
              <MaterialCommunityIcons
                name="scale-bathroom"
                size={24}
                color={isDark ? "#fff" : "#000"}
                style={styles.goalIcon}
              />
              <Text style={[styles.goalText, { color: isDark ? "#fff" : "#000" }]}>Lose Weight</Text>
              {fitnessGoal === "loseWeight" && (
                <View style={[styles.selectedIndicator, { backgroundColor: "#3DCC85" }]} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.goalItem,
                {
                  backgroundColor: isDark ? "#222" : "#f5f5f5",
                  borderColor: fitnessGoal === "gainMuscle" ? "#3DCC85" : "transparent",
                },
              ]}
              onPress={() => setFitnessGoal("gainMuscle")}
            >
              <MaterialCommunityIcons
                name="arm-flex"
                size={24}
                color={isDark ? "#fff" : "#000"}
                style={styles.goalIcon}
              />
              <Text style={[styles.goalText, { color: isDark ? "#fff" : "#000" }]}>Gain Muscle</Text>
              {fitnessGoal === "gainMuscle" && (
                <View style={[styles.selectedIndicator, { backgroundColor: "#3DCC85" }]} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.goalItem,
                {
                  backgroundColor: isDark ? "#222" : "#f5f5f5",
                  borderColor: fitnessGoal === "stayFit" ? "#3DCC85" : "transparent",
                },
              ]}
              onPress={() => setFitnessGoal("stayFit")}
            >
              <MaterialCommunityIcons
                name="heart-pulse"
                size={24}
                color={isDark ? "#fff" : "#000"}
                style={styles.goalIcon}
              />
              <Text style={[styles.goalText, { color: isDark ? "#fff" : "#000" }]}>Stay Fit</Text>
              {fitnessGoal === "stayFit" && <View style={[styles.selectedIndicator, { backgroundColor: "#3DCC85" }]} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.goalItem,
                {
                  backgroundColor: isDark ? "#222" : "#f5f5f5",
                  borderColor: fitnessGoal === "improveHealth" ? "#3DCC85" : "transparent",
                },
              ]}
              onPress={() => setFitnessGoal("improveHealth")}
            >
              <MaterialCommunityIcons
                name="medical-bag"
                size={24}
                color={isDark ? "#fff" : "#000"}
                style={styles.goalIcon}
              />
              <Text style={[styles.goalText, { color: isDark ? "#fff" : "#000" }]}>Improve Health</Text>
              {fitnessGoal === "improveHealth" && (
                <View style={[styles.selectedIndicator, { backgroundColor: "#3DCC85" }]} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      <CustomDateModal
        isVisible={isDatePickerVisible}
        onClose={hideDatePicker}
        onSelect={handleDateSelect}
        isDark={isDark}
        selectedDate={getCurrentDateForPicker()}
        maxDate={getMaxDate()}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cancelButton: {
    fontSize: 16,
  },
  saveButton: {
    fontSize: 16,
    fontWeight: "600",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
    flex: 1,
  },
  valueText: {
    fontSize: 16,
    fontWeight: "600",
  },
  textInput: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    marginTop: 8,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  sliderWrapper: {
    flex: 1,
    height: 4,
    marginHorizontal: 10,
    position: "relative",
  },
  sliderTrack: {
    height: 4,
    width: "100%",
    borderRadius: 2,
    position: "absolute",
  },
  sliderFill: {
    height: 4,
    borderRadius: 2,
    position: "absolute",
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: "absolute",
    top: -8,
    marginLeft: -10,
  },
  sliderMin: {
    fontSize: 12,
  },
  sliderMax: {
    fontSize: 12,
  },
  dateButton: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  dateButtonText: {
    fontSize: 16,
  },
  activityOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  activityOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
  activityLevelDetails: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  activityLevelItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 2,
  },
  activityLevelIcon: {
    marginRight: 12,
  },
  activityLevelText: {
    flex: 1,
    fontSize: 14,
  },
  checkIcon: {
    marginLeft: 8,
  },
  goalsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },
  goalItem: {
    width: "48%",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
    position: "relative",
    borderWidth: 2,
  },
  goalIcon: {
    marginBottom: 8,
  },
  goalText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  selectedIndicator: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderBottomLeftRadius: 10,
  },
})
