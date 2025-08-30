"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  useColorScheme,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native"
import ModalSelector from "react-native-modal-selector"
import { useRouter } from "expo-router"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { useFormData } from "../context/FormContext"
import React from "react"
import GenderSelectionModal from "@/components/GenderSelectionModal"
import styles from "../styles/PersonalInfoScreen.styles";

// Gender options for ModalSelector
const GENDER_OPTIONS = [
  { key: "", label: "Cinsiyet Seçiniz" },
  { key: "male", label: "Erkek" },
  { key: "female", label: "Kadın" },
]

export default function PersonalInfoScreen() {
  const { formData, setFormData } = useFormData()
  const router = useRouter()
  const isDark = useColorScheme() === "dark"

  // Form validation states
  const [firstNameError, setFirstNameError] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [genderError, setGenderError] = useState("")

  // Handle input changes with validation
  const handleFirstNameChange = (value: string) => {
    // Sadece harf karakterlerine izin ver (Türkçe karakterler dahil)
    const filteredValue = value.replace(/[^a-zA-ZğüşöçıİĞÜŞÖÇ\s]/g, "")
    setFormData((prev) => ({ ...prev, firstName: filteredValue }))
  
    if (filteredValue.trim() === "") {
      setFirstNameError("Ad alanı boş bırakılamaz")
    } else {
      setFirstNameError("")
    }
  }
  
  const handleLastNameChange = (value: string) => {
    const filteredValue = value.replace(/[^a-zA-ZğüşöçıİĞÜŞÖÇ\s]/g, "")
    setFormData((prev) => ({ ...prev, lastName: filteredValue }))
  
    if (filteredValue.trim() === "") {
      setLastNameError("Soyad alanı boş bırakılamaz")
    } else {
      setLastNameError("")
    }
  }
  

  const handleSelectGender = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }))
    if (value === "") {
      setGenderError("Cinsiyet seçimi yapmalısınız")
    } else {
      setGenderError("")
    }
  }

  // Get the selected gender label for display
  const selectedGenderLabel = GENDER_OPTIONS.find((opt) => opt.key === formData.gender)?.label || "Cinsiyet Seçiniz"

  // Handle next button press with validation
  const handleNext = () => {
    let isValid = true

    if (!formData.firstName || formData.firstName.trim() === "") {
      setFirstNameError("Ad alanı boş bırakılamaz")
      isValid = false
    }

    if (!formData.lastName || formData.lastName.trim() === "") {
      setLastNameError("Soyad alanı boş bırakılamaz")
      isValid = false
    }

    if (!formData.gender) {
      setGenderError("Cinsiyet seçimi yapmalısınız")
      isValid = false
    }

    if (isValid) {
      router.push("./body-info")
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
                <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Kişisel Bilgiler</Text>
                <Text style={[styles.subtitle, { color: isDark ? "#aaa" : "#666" }]}>
                  Lütfen kişisel bilgilerinizi giriniz
                </Text>
              </View>

              <View style={styles.formContainer}>
                {/* First Name Input */}
                <View style={styles.inputContainer}>
                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        borderColor: firstNameError ? "#ff4d4f" : isDark ? "#333" : "#e0e0e0",
                        backgroundColor: isDark ? "#1e1e1e" : "#fff",
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="account-outline"
                      size={20}
                      color={isDark ? "#aaa" : "#666"}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
                      placeholder="Adınız"
                      placeholderTextColor={isDark ? "#777" : "#aaa"}
                      value={formData.firstName}
                      onChangeText={handleFirstNameChange}
                    />
                  </View>
                  {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
                </View>

                {/* Last Name Input */}
                <View style={styles.inputContainer}>
                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        borderColor: lastNameError ? "#ff4d4f" : isDark ? "#333" : "#e0e0e0",
                        backgroundColor: isDark ? "#1e1e1e" : "#fff",
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="account-outline"
                      size={20}
                      color={isDark ? "#aaa" : "#666"}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
                      placeholder="Soyadınız"
                      placeholderTextColor={isDark ? "#777" : "#aaa"}
                      value={formData.lastName}
                      onChangeText={handleLastNameChange}
                    />
                  </View>
                  {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
                </View>

                {/* Gender Selector */}
                <View style={styles.inputContainer}>
                  <GenderSelectionModal
                    selectedValue={formData.gender}
                    onSelect={handleSelectGender}
                    error={genderError}
                  />
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
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

