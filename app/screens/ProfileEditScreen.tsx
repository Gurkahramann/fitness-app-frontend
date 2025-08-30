"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  SafeAreaView,
  StatusBar,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useAuth } from "../../hooks/useAuth"
import { useToast } from "../context/ToastContext"
import { useUserProfile } from "../context/UserProfileContext"
import CustomDateModal from "../../components/CustomDateModal"
import React from "react"
import type { User } from "../context/AuthContext"
import OptimizedSlider from "../../components/BodyInfoSliders"
import styles from "../styles/ProfileEditScreen.styles";

export default function ProfileEditScreen() {
  const isDark = useColorScheme() === "dark"
  const router = useRouter()
  const { userProfile } = useUserProfile()
  const { user, setUser } = useAuth()
  const { showToast } = useToast()
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const insets = useSafeAreaInsets();
    // Form state
  const [name, setName] = useState("")
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(70)
  const [birthDate, setBirthDate] = useState("")
  const [activityLevel, setActivityLevel] = useState("moderate")
  const [fitnessGoal, setFitnessGoal] = useState("stayFit")
  // Initialize form with user data
  useEffect(() => {
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
      if (birthDate && birthDate.includes("/")) {
        const parts = birthDate.split('/');
        if (parts.length === 3) {
          const [day, month, year] = parts;
          if (day && month && year) {
            // Tarih formatını YYYY-MM-DD olarak birleştir
            return `${year.padStart(4, '0')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
          }
        }
      } else if (birthDate) {
        // Zaten ISO formatında veya başka bir formatta ise olduğu gibi döndür
        // Veya new Date() ile ayrıştırıp formatla
        const date = new Date(birthDate);
        if(!isNaN(date.getTime())) {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        }
      }
      const today = new Date();
      return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    } catch (error) {
      console.error("Error getting current date for picker:", error);
      const today = new Date();
      return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    }
  }

  const { updateProfile } = useUserProfile()

  // Handle save
  const handleSave = async () => {
    if (!name) {
      showToast("İsim alanı boş bırakılamaz", "error")
      return
    }
    let isoBirthDate = birthDate;
    if (birthDate && birthDate.includes("/")) {
      const [day, month, year] = birthDate.split("/");
      if (day && month && year) {
        isoBirthDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      } else {
        isoBirthDate = ""; // veya null gönder
      }
    }
    const updatedData = {
      name,
      height,
      weight,
      birthDate: isoBirthDate,
      activityLevel,
      fitnessGoal,
    }
    const success = await updateProfile(updatedData)
    if (success) {
      showToast("Profil başarıyla güncellendi", "success")
      router.back()
    } else {
      showToast("Profil güncellenemedi", "error")
    }
  }

  // Handle cancel
  const handleCancel = () => {
    router.back()
  }

  const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return "";

    if (dateString.includes("T")) {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    return dateString;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f8f9fa" }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
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
        <OptimizedSlider
          label="Boy"
          value={height}
          minimumValue={100}
          maximumValue={220}
          step={1}
          onValueChange={setHeight}
          unit="cm"
          icon={{ name: "human-male-height", library: "MaterialCommunityIcons" }}
        />

        {/* Weight Slider */}
        <OptimizedSlider
          label="Kilo"
          value={weight}
          minimumValue={30}
          maximumValue={200}
          step={0.1}
          onValueChange={setWeight}
          unit="kg"
          icon={{ name: "weight", library: "MaterialCommunityIcons" }}
        />

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
              {formatDateForDisplay(birthDate) || "Tarih Seçin"}
            </Text>
            <MaterialCommunityIcons name="calendar" size={20} color={isDark ? "#aaa" : "#666"} />
          </TouchableOpacity>
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
            <Text style={[styles.activityLevelText, { color: isDark ? "#fff" : "#000" }]}>Hareketsiz: çok az veya hiç egzersiz yok</Text>
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
            <Text style={[styles.activityLevelText, { color: isDark ? "#fff" : "#000" }]}>Hafif: haftada 1-3 kez egzersiz</Text>
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
            <Text style={[styles.activityLevelText, { color: isDark ? "#fff" : "#000" }]}>Orta: haftada 4-5 kez egzersiz</Text>
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
            <Text style={[styles.activityLevelText, { color: isDark ? "#fff" : "#000" }]}>Aktif: her gün egzersiz veya haftada 3-4 kez yoğun egzersiz</Text>
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
            <Text style={[styles.activityLevelText, { color: isDark ? "#fff" : "#000" }]}>Çok Aktif: haftada 6-7 kez yoğun egzersiz</Text>
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
            <Text style={[styles.activityLevelText, { color: isDark ? "#fff" : "#000" }]}>Ekstra Aktif: her gün çok yoğun egzersiz veya fiziksel iş</Text>
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
              <Text style={[styles.goalText, { color: isDark ? "#fff" : "#000" }]}>Kilo Ver</Text>
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
              <Text style={[styles.goalText, { color: isDark ? "#fff" : "#000" }]}>Kas Kazan</Text>
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
              <Text style={[styles.goalText, { color: isDark ? "#fff" : "#000" }]}>Formda Kal</Text>
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
              <Text style={[styles.goalText, { color: isDark ? "#fff" : "#000" }]}>Sağlığı Geliştir</Text>
              {fitnessGoal === "improveHealth" && (
                <View style={[styles.selectedIndicator, { backgroundColor: "#3DCC85" }]} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      <CustomDateModal
        visible={isDatePickerVisible}
        onClose={hideDatePicker}
        onSelectDate={(date) => {
          if (date instanceof Date && !isNaN(date.getTime())) {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");
            handleDateSelect(`${yyyy}/${mm}/${dd}`);
          }
          hideDatePicker();
        }}
        initialDate={getCurrentDateForPicker()}
        mode="birthdate"
      />
    </SafeAreaView>
  )
}
