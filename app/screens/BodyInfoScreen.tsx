"use client"

import { useState, useCallback, useEffect } from "react"
import { View, Text, TouchableOpacity, useColorScheme, SafeAreaView, ScrollView, StatusBar, Alert } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useFormData } from "../context/FormContext"
import { useRouter } from "expo-router"
import OptimizedSlider from "../../components/BodyInfoSliders"
import { bodyInfoStyles as styles } from "../styles/BodyInfo.styles"
import CustomDateTimeModal from "../../components/CustomDateTimeModal"
import React from "react"

export default function BodyInfoScreen() {
  const { formData, setFormData } = useFormData()
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const colorScheme = useColorScheme()
  const router = useRouter()
  const isDark = colorScheme === "dark"

  // Default slider values
  const heightValue = Number(formData.height) || 170
  const weightValue = Number(formData.weight) || 70

  // Memoized callbacks to prevent unnecessary re-renders
  const handleHeightChange = useCallback(
    (val: number) => {
      setFormData((prev) => ({ ...prev, height: val.toString() }))
    },
    [setFormData],
  )

  const handleWeightChange = useCallback(
    (val: number) => {
      setFormData((prev) => ({ ...prev, weight: val.toString() }))
    },
    [setFormData],
  )

  const showDatePicker = () => {
    console.log("Opening date picker")
    setDatePickerVisible(true)
  }

  const hideDatePicker = () => {
    console.log("Closing date picker")
    setDatePickerVisible(false)
  }

  const handleDateSelect = (date: Date) => {
    try {
      console.log("Selected date:", date)
      
      // Format date as DD/MM/YYYY
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      const formattedDate = `${day}/${month}/${year}`
      
      console.log("Formatted date:", formattedDate)
      setFormData((prev) => ({ ...prev, birthDate: formattedDate }))
    } catch (error) {
      console.error("Error handling date selection:", error)
      Alert.alert("Hata", "Tarih seçilirken bir hata oluştu. Lütfen tekrar deneyin.")
    }
  }

  const getSelectedDate = (): Date => {
    try {
      if (formData.birthDate) {
        const [day, month, year] = formData.birthDate.split("/")
        return new Date(Number(year), Number(month) - 1, Number(day))
      }
    } catch (error) {
      console.error("Error parsing date:", error)
    }
    return new Date() // Return today's date as fallback
  }

  const getMaxDate = (): Date => {
    return new Date() // Today's date as maximum
  }

  const handleNext = () => {
    if (!formData.height || !formData.weight || !formData.birthDate) {
      Alert.alert("Uyarı", "Lütfen tüm alanları doldurun: Boy, Kilo ve Doğum Tarihi.")
      return
    }
    router.push("/life-style")
  }

  // Set default height and weight if empty
  useEffect(() => {
    if (!formData.height) {
      setFormData((prev) => ({ ...prev, height: '170' }))
    }
    if (!formData.weight) {
      setFormData((prev) => ({ ...prev, weight: '70' }))
    }
  }, [])

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f8f9fa" }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Vücut Bilgileri</Text>
          <Text style={[styles.subtitle, { color: isDark ? "#aaa" : "#666" }]}>Fitness hedeflerin için bilgilerini gir</Text>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}>
          {/* Height Slider */}
          <OptimizedSlider
            label="Boy"
            value={heightValue}
            minimumValue={100}
            maximumValue={220}
            step={1}
            onValueChange={handleHeightChange}
            unit="cm"
            icon={{ name: "human-male-height", library: "MaterialCommunityIcons" }}
          />

          {/* Weight Slider */}
          <OptimizedSlider
            label="Kilo"
            value={weightValue}
            minimumValue={30}
            maximumValue={200}
            step={0.5}
            onValueChange={handleWeightChange}
            unit="kg"
            icon={{ name: "weight-scale", library: "FontAwesome6" }}
          />

          {/* Birth Date */}
          <View style={styles.dateSection}>
            <View style={styles.dateLabelContainer}>
              <MaterialCommunityIcons
                name="calendar"
                size={20}
                color={isDark ? "#fff" : "#000"}
                style={styles.dateIcon}
              />
              <Text style={[styles.dateLabel, { color: isDark ? "#fff" : "#000" }]}>Doğum Tarihi</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.dateButton,
                {
                  backgroundColor: isDark ? "#2a2a2a" : "#f0f0f0",
                  borderColor: formData.birthDate ? (isDark ? "#fff" : "#000") : isDark ? "#444" : "#ddd",
                },
              ]}
              onPress={showDatePicker}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dateButtonText,
                  {
                    color: formData.birthDate ? (isDark ? "#fff" : "#000") : isDark ? "#aaa" : "#888",
                  },
                ]}
              >
                {formData.birthDate || "Tarih Seç"}
              </Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color={isDark ? "#aaa" : "#888"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: isDark ? "#fff" : "#000" }]}
          onPress={handleNext}
        >
          <Text style={[styles.nextButtonText, { color: isDark ? "#000" : "#fff" }]}>İleri</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color={isDark ? "#000" : "#fff"} />
        </TouchableOpacity>
      </ScrollView>

      {/* Use the new CustomDateTimeModal */}
      <CustomDateTimeModal
        isVisible={isDatePickerVisible}
        onClose={hideDatePicker}
        onSelect={handleDateSelect}
        isDark={isDark}
        selectedDate={getSelectedDate()}
        maximumDate={getMaxDate()}
      />
    </SafeAreaView>
  )
}
