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
  

  const handleSelectGender = (option: { key: string; label: string }) => {
    setFormData((prev) => ({ ...prev, gender: option.key }))
    if (option.key === "") {
      setGenderError("Cinsiyet seçimi yapmalisınız")
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
    <SafeAreaView style={[localStyles.container, { backgroundColor: isDark ? "#121212" : "#f8f9fa" }]}>
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
            <View style={localStyles.content}>
              <View style={localStyles.headerContainer}>
                <Text style={[localStyles.title, { color: isDark ? "#fff" : "#000" }]}>Kişisel Bilgiler</Text>
                <Text style={[localStyles.subtitle, { color: isDark ? "#aaa" : "#666" }]}>
                  Lütfen kişisel bilgilerinizi giriniz
                </Text>
              </View>

              <View style={localStyles.formContainer}>
                {/* First Name Input */}
                <View style={localStyles.inputContainer}>
                  <View
                    style={[
                      localStyles.inputWrapper,
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
                      style={localStyles.inputIcon}
                    />
                    <TextInput
                      style={[localStyles.input, { color: isDark ? "#fff" : "#000" }]}
                      placeholder="Adınız"
                      placeholderTextColor={isDark ? "#777" : "#aaa"}
                      value={formData.firstName}
                      onChangeText={handleFirstNameChange}
                    />
                  </View>
                  {firstNameError ? <Text style={localStyles.errorText}>{firstNameError}</Text> : null}
                </View>

                {/* Last Name Input */}
                <View style={localStyles.inputContainer}>
                  <View
                    style={[
                      localStyles.inputWrapper,
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
                      style={localStyles.inputIcon}
                    />
                    <TextInput
                      style={[localStyles.input, { color: isDark ? "#fff" : "#000" }]}
                      placeholder="Soyadınız"
                      placeholderTextColor={isDark ? "#777" : "#aaa"}
                      value={formData.lastName}
                      onChangeText={handleLastNameChange}
                    />
                  </View>
                  {lastNameError ? <Text style={localStyles.errorText}>{lastNameError}</Text> : null}
                </View>

                {/* Gender Selector */}
                <View style={localStyles.inputContainer}>
                  <View
                    style={[
                      localStyles.selectorWrapper,
                      {
                        borderColor: genderError ? "#ff4d4f" : isDark ? "#333" : "#e0e0e0",
                        backgroundColor: isDark ? "#1e1e1e" : "#fff",
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="gender-male-female"
                      size={20}
                      color={isDark ? "#aaa" : "#666"}
                      style={localStyles.inputIcon}
                    />
                    <ModalSelector
                      data={GENDER_OPTIONS}
                      initValue={selectedGenderLabel}
                      onChange={handleSelectGender}
                      style={localStyles.modalSelector}
                      selectStyle={localStyles.selectStyle}
                      selectTextStyle={StyleSheet.flatten([localStyles.selectTextStyle, { color: isDark ? "#fff" : "#000" }])}
                      initValueTextStyle={StyleSheet.flatten([
                        localStyles.initValueTextStyle,
                        {
                          color: formData.gender ? (isDark ? "#fff" : "#000") : isDark ? "#777" : "#aaa",
                        },
                      ])}
                      optionTextStyle={{
                        color: isDark ? "#fff" : "#000",
                      }}
                      optionContainerStyle={{
                        backgroundColor: isDark ? "#333" : "#fff",
                      }}
                      cancelStyle={{
                        backgroundColor: isDark ? "#222" : "#f5f5f5",
                      }}
                      cancelTextStyle={{
                        color: isDark ? "#fff" : "#000",
                      }}
                      cancelText="Vazgeç"
                    />
                    <MaterialCommunityIcons
                      name="chevron-down"
                      size={20}
                      color={isDark ? "#aaa" : "#666"}
                      style={localStyles.selectorIcon}
                    />
                  </View>
                  {genderError ? <Text style={localStyles.errorText}>{genderError}</Text> : null}
                </View>
              </View>

              {/* Next Button */}
              <TouchableOpacity
                style={[localStyles.nextButton, { backgroundColor: isDark ? "#fff" : "#000" }]}
                onPress={handleNext}
              >
                <Text style={[localStyles.nextButtonText, { color: isDark ? "#000" : "#fff" }]}>İleri</Text>
                <MaterialCommunityIcons name="arrow-right" size={20} color={isDark ? "#000" : "#fff"} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
  },
  selectorWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    height: 56,
    paddingLeft: 16,
    paddingRight: 8,
  },
  inputIcon: {
    marginRight: 12,
  },
  selectorIcon: {
    marginLeft: "auto",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  modalSelector: {
    flex: 1,
    height: "100%",
  },
  selectStyle: {
    borderWidth: 0,
    height: "100%",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  selectTextStyle: {
    fontSize: 16,
    textAlign: "left",
  },
  initValueTextStyle: {
    fontSize: 16,
    textAlign: "left",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  nextButton: {
    flexDirection: "row",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
})

