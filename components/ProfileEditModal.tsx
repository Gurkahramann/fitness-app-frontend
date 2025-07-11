"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import OptimizedSlider from "../components/BodyInfoSliders"
import CustomDateModal from "../components/CustomDateModal"
import React from "react"
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ProfileEditModalProps {
  visible: boolean
  onClose: () => void
  onSave: (userData: any) => void
  userData: any
  isDark: boolean
}

// ISO veya DD/MM/YYYY tarihini DD/MM/YYYY formatına çeviren güvenli fonksiyon
function formatDateToDDMMYYYY(dateString: string): string {
  if (!dateString) return "";
  // ISO formatı mı?
  if (dateString.includes("T")) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  // DD/MM/YYYY formatı mı?
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    if (day && month && year) {
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    }
  }
  return "";
}

export default function ProfileEditModal({ visible, onClose, onSave, userData, isDark }: ProfileEditModalProps) {
  const [name, setName] = useState(userData.name || "")
  const [height, setHeight] = useState(userData.height || 170)
  const [weight, setWeight] = useState(userData.weight || 70)
  const [birthDate, setBirthDate] = useState(userData.birthDate || "")
  const [activityLevel, setActivityLevel] = useState(userData.activityLevel || "moderate")
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const insets = useSafeAreaInsets()

  // Update local state when userData changes
  useEffect(() => {
    if (visible) {
      setName(userData.name || "")
      setHeight(userData.height || 170)
      setWeight(userData.weight || 70)
      setBirthDate(userData.birthDate || "")
      setActivityLevel(userData.activityLevel || "moderate")
    }
  }, [visible, userData])

  const handleSave = () => {
    const updatedData = {
      ...userData,
      name,
      height,
      weight,
      birthDate,
      activityLevel,
    }
    onSave(updatedData)
  }

  const showDatePicker = () => {
    setDatePickerVisible(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisible(false)
  }

  const handleDateSelect = (selectedDate: Date) => {
    try {
      // selectedDate is a Date object
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      // Türkçe format için çevir: DD/MM/YYYY
      const formattedDate = `${day}/${month}/${year}`;
      setBirthDate(formattedDate);
    } catch (error) {
      console.error("Error handling date selection:", error);
    }
  }

  // DatePicker için güvenli tarih formatı (YYYY/MM/DD)
  const getCurrentDateForPicker = (): string => {
    try {
      if (birthDate) {
        // ISO formatı
        if (birthDate.includes("T")) {
          const date = new Date(birthDate);
          if (isNaN(date.getTime())) throw new Error("Invalid date");
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}/${month}/${day}`;
        }
        // DD/MM/YYYY formatı
        const parts = birthDate.split("/");
        if (parts.length === 3) {
          const [day, month, year] = parts;
          if (
            day !== undefined &&
            month !== undefined &&
            year !== undefined &&
            day.length > 0 &&
            month.length > 0 &&
            year.length > 0
          ) {
            return `${year.padStart(4, "0")}/${month.padStart(2, "0")}/${day.padStart(2, "0")}`;
          }
        }
      }
      const today = new Date();
      return `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;
    } catch (error) {
      console.error("Error getting current date for picker:", error);
      const today = new Date();
      return `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;
    }
  };

  // Modern DatePicker için maksimum tarih (bugün)
  const getMaxDate = (): string => {
    const today = new Date()
    return `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDark ? "#222" : "#fff" }]}>
            <View style={[styles.modalHeader, { paddingTop: insets.top }]}>
              <TouchableOpacity onPress={onClose}>
                <Text style={[styles.cancelButton, { color: isDark ? "#aaa" : "#666" }]}>İptal</Text>
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: isDark ? "#fff" : "#000" }]}>Profili Düzenle</Text>
              <TouchableOpacity onPress={handleSave}>
                <Text style={[styles.saveButton, { color: isDark ? "#3DCC85" : "#3DCC85" }]}>Kaydet</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.modalBody}>
              {/* Name Input */}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: isDark ? "#fff" : "#000" }]}>İsim</Text>
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
              <View style={styles.sliderContainer}>
                <Text style={[styles.sliderLabel, { color: isDark ? "#fff" : "#000" }]}>Boy</Text>
                <OptimizedSlider
                  label="Boy"
                  value={height}
                  minimumValue={100}
                  maximumValue={220}
                  step={1}
                  onValueChange={(val) => setHeight(val)}
                  unit="cm"
                  icon={{ name: "human-male-height", library: "MaterialCommunityIcons" }}
                />
              </View>

              {/* Weight Slider */}
              <View style={styles.sliderContainer}>
                <Text style={[styles.sliderLabel, { color: isDark ? "#fff" : "#000" }]}>Kilo</Text>
                <OptimizedSlider
                  label="Kilo"
                  value={weight}
                  minimumValue={30}
                  maximumValue={200}
                  step={0.5}
                  onValueChange={(val) => setWeight(val)}
                  unit="kg"
                  icon={{ name: "weight", library: "MaterialCommunityIcons" }}
                />
              </View>

              {/* Birth Date */}
              <View style={styles.dateContainer}>
                <Text style={[styles.inputLabel, { color: isDark ? "#fff" : "#000" }]}>Doğum Tarihi</Text>
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
                    {birthDate ? formatDateToDDMMYYYY(birthDate) : "Tarih Seçin"}
                  </Text>
                  <MaterialCommunityIcons name="calendar" size={20} color={isDark ? "#aaa" : "#666"} />
                </TouchableOpacity>
              </View>

              {/* Activity Level */}
              <View style={styles.activityContainer}>
                <Text style={[styles.inputLabel, { color: isDark ? "#fff" : "#000" }]}>Aktivite Seviyesi</Text>

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

                <Text style={[styles.activityDescription, { color: isDark ? "#aaa" : "#666" }]}>
                  {activityLevel === "sedentary"
                    ? "Hareketsiz: Az veya hiç egzersiz yapmıyorum"
                    : activityLevel === "light"
                      ? "Hafif Aktif: Haftada 1-3 kez egzersiz yapıyorum"
                      : activityLevel === "moderate"
                        ? "Orta Aktif: Haftada 4-5 kez egzersiz yapıyorum"
                        : activityLevel === "active"
                          ? "Aktif: Günlük egzersiz veya haftada 3-4 kez yoğun egzersiz yapıyorum"
                          : ""}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Date Picker Modal */}
      <CustomDateModal
        visible={isDatePickerVisible}
        onClose={hideDatePicker}
        onSelectDate={handleDateSelect}
        initialDate={getCurrentDateForPicker()}
        mode="birthdate"
      />
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
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
  modalBody: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  textInput: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateButton: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateButtonText: {
    fontSize: 16,
  },
  activityContainer: {
    marginBottom: 20,
  },
  activityOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  activityOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
  activityDescription: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
})
