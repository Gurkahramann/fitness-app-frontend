"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"

interface GenderOption {
  key: string
  label: string
  icon: string
}

interface GenderSelectionModalProps {
  selectedValue: string
  onSelect: (value: string) => void
  error?: string
}

const GENDER_OPTIONS: GenderOption[] = [
  { key: "male", label: "Erkek", icon: "gender-male" },
  { key: "female", label: "Kadın", icon: "gender-female" },
]

const { height: screenHeight } = Dimensions.get("window")

export default function GenderSelectionModal({ selectedValue, onSelect, error }: GenderSelectionModalProps) {
  const isDark = useColorScheme() === "dark"
  const [modalVisible, setModalVisible] = useState(false)
  const [scaleAnim] = useState(new Animated.Value(0))
  const [opacityAnim] = useState(new Animated.Value(0))

  const selectedOption = GENDER_OPTIONS.find((option) => option.key === selectedValue)
  const displayText = selectedOption ? selectedOption.label : "Cinsiyet Seçiniz"

  const showModal = () => setModalVisible(true)
  const hideModal = () => setModalVisible(false)

  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [modalVisible])

  const handleSelect = (value: string) => {
    onSelect(value)
    hideModal()
  }

  return (
    <>
      {/* Selector Button */}
      <TouchableOpacity
        style={[
          styles.selectorButton,
          {
            borderColor: error ? "#ff4d4f" : isDark ? "#333" : "#e0e0e0",
            backgroundColor: isDark ? "#1e1e1e" : "#fff",
          },
        ]}
        onPress={showModal}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons
          name="gender-male-female"
          size={20}
          color={isDark ? "#aaa" : "#666"}
          style={styles.selectorIcon}
        />
        <Text
          style={[
            styles.selectorText,
            {
              color: selectedValue ? (isDark ? "#fff" : "#000") : isDark ? "#777" : "#aaa",
            },
          ]}
        >
          {displayText}
        </Text>
        <MaterialCommunityIcons
          name="chevron-down"
          size={20}
          color={isDark ? "#aaa" : "#666"}
          style={styles.chevronIcon}
        />
      </TouchableOpacity>

      {/* Error Text */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="none" statusBarTranslucent onRequestClose={hideModal}>
        <TouchableWithoutFeedback onPress={hideModal}>
          <Animated.View
            style={[
              styles.modalOverlay,
              {
                opacity: opacityAnim,
              },
            ]}
          >
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.modalContainer,
                  {
                    backgroundColor: isDark ? "#1C1C1E" : "#FFFFFF",
                    transform: [{ scale: scaleAnim }],
                  },
                ]}
              >
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <View style={[styles.headerIconContainer, { backgroundColor: isDark ? "#2C2C2E" : "#F2F2F7" }]}>
                    <MaterialCommunityIcons name="gender-male-female" size={24} color="#3DCC85" />
                  </View>
                  <Text style={[styles.modalTitle, { color: isDark ? "#FFFFFF" : "#000000" }]}>Cinsiyet Seçimi</Text>
                  <Text style={[styles.modalSubtitle, { color: isDark ? "#8E8E93" : "#6D6D70" }]}>
                    Lütfen cinsiyetinizi seçiniz
                  </Text>
                </View>

                {/* Gender Options */}
                <View style={styles.optionsContainer}>
                  {GENDER_OPTIONS.map((option) => (
                    <TouchableOpacity
                      key={option.key}
                      style={[
                        styles.optionButton,
                        {
                          backgroundColor:
                            selectedValue === option.key ? (isDark ? "#2C2C2E" : "#F2F2F7") : "transparent",
                          borderColor: selectedValue === option.key ? "#3DCC85" : isDark ? "#2C2C2E" : "#E5E5EA",
                        },
                      ]}
                      onPress={() => handleSelect(option.key)}
                      activeOpacity={0.7}
                    >
                      <View
                        style={[
                          styles.optionIconContainer,
                          {
                            backgroundColor:
                              option.key === "male" ? "#007AFF" : option.key === "female" ? "#FF2D92" : "#3DCC85",
                          },
                        ]}
                      >
                        <MaterialCommunityIcons name={option.icon as any} size={20} color="#FFFFFF" />
                      </View>
                      <Text style={[styles.optionText, { color: isDark ? "#FFFFFF" : "#000000" }]}>{option.label}</Text>
                      {selectedValue === option.key && (
                        <MaterialCommunityIcons name="check-circle" size={20} color="#3DCC85" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Modal Actions */}
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.cancelButton, { backgroundColor: isDark ? "#2C2C2E" : "#F2F2F7" }]}
                    onPress={hideModal}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.cancelButtonText, { color: isDark ? "#FFFFFF" : "#000000" }]}>Vazgeç</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  selectorButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
  },
  selectorIcon: {
    marginRight: 12,
  },
  selectorText: {
    flex: 1,
    fontSize: 16,
  },
  chevronIcon: {
    marginLeft: "auto",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 340,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  headerIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    minHeight: 64,
  },
  optionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
  modalActions: {
    gap: 12,
  },
  cancelButton: {
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
})
