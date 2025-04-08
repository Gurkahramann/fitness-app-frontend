"use client"

import { useState, useCallback } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { MaterialCommunityIcons,FontAwesome6 } from "@expo/vector-icons"
import { useFormData } from "../context/FormContext"
import { useRouter } from "expo-router"
import OptimizedSlider from "../../components/BodyInfoSliders"
import { bodyInfoStyles as styles } from "../styles/BodyInfo.styles"

export default function BodyInfoScreen() {
  const { formData, setFormData } = useFormData()
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const colorScheme = useColorScheme()
  const router = useRouter()
  const isDark = colorScheme === "dark"

  // Varsayılan slider değerleri
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

  // Modal aç/kapa
  const showDatePicker = () => setDatePickerVisible(true)
  const hideDatePicker = () => setDatePickerVisible(false)

  // Tarih seçildikten sonra
  const handleConfirm = (selectedDate: Date) => {
    const offsetFixedDate = removeTimeOffset(selectedDate)
    const formatted = formatDate(offsetFixedDate)
    setFormData((prev) => ({ ...prev, birthDate: formatted }))
    hideDatePicker()
  }

  const handleNext = () => {
    if (!formData.height || !formData.weight || !formData.birthDate) {
      alert("Boy, Kilo ve Doğum Tarihi alanlarını doldurunuz.")
      return
    }
    router.push("/life-style")
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f8f9fa" }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Vücut Bilgileri</Text>
          <Text style={[styles.subtitle, { color: isDark ? "#aaa" : "#666" }]}>
            Fitness hedefleriniz için bilgilerinizi giriniz
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}>
          {/* Boy Slider - Optimized */}
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

          {/* Kilo Slider - Optimized */}
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

          {/* Doğum Tarihi */}
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
            >
              <Text
                style={[
                  styles.dateButtonText,
                  {
                    color: formData.birthDate ? (isDark ? "#fff" : "#000") : isDark ? "#aaa" : "#888",
                  },
                ]}
              >
                {formData.birthDate || "Tarih Seçiniz"}
              </Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color={isDark ? "#aaa" : "#888"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal DateTimePicker */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={parseDate(formData.birthDate)}
          maximumDate={new Date()} // Bugünden ileri tarih seçilemesin
        />

        {/* İleri Butonu */}
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: isDark ? "#fff" : "#000" }]}
          onPress={handleNext}
        >
          <Text style={[styles.nextButtonText, { color: isDark ? "#000" : "#fff" }]}>İleri</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color={isDark ? "#000" : "#fff"} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}



/** "GG/AA/YYYY" string -> Date objesi. Yoksa new Date() (bugün) döndürür. */
function parseDate(dateStr?: string): Date {
  if (!dateStr) return new Date()
  // 29/06/2002 => [29, 06, 2002]
  const [dd, mm, yyyy] = dateStr.split("/")
  const day = Number.parseInt(dd, 10)
  const month = Number.parseInt(mm, 10) - 1
  const year = Number.parseInt(yyyy, 10)
  return new Date(year, month, day)
}

/** Timezone offset'i sıfırlayarak "gün kayması"nı önlemeye çalışır. */
function removeTimeOffset(date: Date): Date {
  // date'in UTC'sini alıp local offset'i çıkar
  const userOffset = date.getTimezoneOffset() * 60000 // milisaniye
  return new Date(date.getTime() + userOffset)
}

/** Date -> "DD/MM/YYYY" */
function formatDate(d: Date): string {
  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

