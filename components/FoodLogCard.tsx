"use client"

import React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity, Image, Animated, Dimensions } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Ionicons } from "@expo/vector-icons"
import { useFoodLog } from "../app/context/FoodLogContext"
import { useAuth } from "../app/context/AuthContext"
import Toast from "../components/Toast"

interface FoodLogCardProps {
  onImageSelected?: (imageUri: string) => void
}

const { width } = Dimensions.get("window")

const FoodLogCard: React.FC<FoodLogCardProps> = ({ onImageSelected }) => {
  const isDark = useColorScheme() === "dark"
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [scaleAnim] = useState(new Animated.Value(1))
  const [pulseAnim] = useState(new Animated.Value(1))
  const [rotateAnim] = useState(new Animated.Value(0))
  const [dotsAnim] = useState([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)])
  const { addFoodLogWithPhoto, loading, success, error, reset } = useFoodLog()
  const { user } = useAuth()
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: "success" | "error" }>({
    visible: false,
    message: "",
    type: "success",
  })

  // Loading animations
  useEffect(() => {
    if (loading) {
      // Pulse animation for the main container
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      )

      // Rotation animation for the loading icon
      const rotateAnimation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      )

      // Dots animation
      const dotsAnimation = Animated.loop(
        Animated.stagger(
          200,
          dotsAnim.map((dot) =>
            Animated.sequence([
              Animated.timing(dot, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
              }),
              Animated.timing(dot, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
              }),
            ]),
          ),
        ),
      )

      pulseAnimation.start()
      rotateAnimation.start()
      dotsAnimation.start()

      return () => {
        pulseAnimation.stop()
        rotateAnimation.stop()
        dotsAnimation.stop()
      }
    }
  }, [loading])

  const animatePress = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()
    callback()
  }

  const handleImageProcess = async (uri: string) => {
    try {
      await addFoodLogWithPhoto(uri)
    } catch (e) {
      console.log("[FoodLogCard] Fotoğraf işleme/kaydetme hatası:", e)
    }
    onImageSelected?.(uri)
    setSelectedImage(null)
  }

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: false,
      quality: 0.8,
      aspect: [4, 3],
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri)
      await handleImageProcess(result.assets[0].uri)
      setSelectedImage(null)
    }
  }

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== "granted") {
      alert("Kamera izni gerekli!")
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.8,
      aspect: [4, 3],
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri)
      await handleImageProcess(result.assets[0].uri)
      setSelectedImage(null)
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
  }

  // Modern Loading State
  if (loading) {
    const spin = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    })

    return (
      <Animated.View
        style={[
          styles.loadingContainer,
          {
            backgroundColor: isDark ? "#1C1C1E" : "#FFFFFF",
            borderColor: isDark ? "#2C2C2E" : "#E5E5EA",
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        {/* Loading Icon */}
        <View style={styles.loadingIconSection}>
          <View style={[styles.loadingIconContainer, { backgroundColor: isDark ? "#2C2C2E" : "#F2F2F7" }]}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Ionicons name="analytics" size={32} color="#3DCC85" />
            </Animated.View>
          </View>
        </View>

        {/* Loading Text */}
        <View style={styles.loadingTextSection}>
          <Text style={[styles.loadingTitle, { color: isDark ? "#FFFFFF" : "#000000" }]}>Kalori Hesaplanıyor</Text>
          <View style={styles.dotsContainer}>
            {dotsAnim.map((dot, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor: isDark ? "#8E8E93" : "#6D6D70",
                    opacity: dot,
                  },
                ]}
              />
            ))}
          </View>
          <Text style={[styles.loadingSubtitle, { color: isDark ? "#8E8E93" : "#6D6D70" }]}>
            Fotoğrafınız analiz ediliyor
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={[styles.progressTrack, { backgroundColor: isDark ? "#2C2C2E" : "#F2F2F7" }]}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  backgroundColor: "#3DCC85",
                  transform: [{ scaleX: pulseAnim }],
                },
              ]}
            />
          </View>
        </View>

        {/* Loading Steps */}
        <View style={styles.stepsSection}>
          <View style={styles.stepItem}>
            <View style={[styles.stepIcon, { backgroundColor: "#3DCC85" }]}>
              <Ionicons name="checkmark" size={12} color="#FFFFFF" />
            </View>
            <Text style={[styles.stepText, { color: isDark ? "#8E8E93" : "#6D6D70" }]}>Fotoğraf yüklendi</Text>
          </View>
          <View style={styles.stepItem}>
            <Animated.View
              style={[
                styles.stepIcon,
                {
                  backgroundColor: "#3DCC85",
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <Ionicons name="analytics" size={12} color="#FFFFFF" />
            </Animated.View>
            <Text style={[styles.stepText, { color: isDark ? "#FFFFFF" : "#000000", fontWeight: "600" }]}>
              Kalori hesaplanıyor
            </Text>
          </View>
          <View style={styles.stepItem}>
            <View style={[styles.stepIcon, { backgroundColor: isDark ? "#2C2C2E" : "#F2F2F7" }]}>
              <Ionicons name="save" size={12} color={isDark ? "#8E8E93" : "#6D6D70"} />
            </View>
            <Text style={[styles.stepText, { color: isDark ? "#8E8E93" : "#6D6D70" }]}>Kayıt edilecek</Text>
          </View>
        </View>
      </Animated.View>
    )
  }

  // Success State
  if (success) {
    if (!toast.visible) setToast({ visible: true, message: "Yemeğiniz kaydedildi!", type: "success" })
    setTimeout(() => {
      reset()
      setToast((t) => ({ ...t, visible: false }))
    }, 2000)

    return (
      <>
        <View
          style={[
            styles.successContainer,
            {
              backgroundColor: isDark ? "#1C1C1E" : "#FFFFFF",
              borderColor: isDark ? "#2C2C2E" : "#E5E5EA",
            },
          ]}
        >
          <View style={styles.successIconContainer}>
            <Ionicons name="checkmark-circle" size={48} color="#3DCC85" />
          </View>
          <Text style={[styles.successTitle, { color: isDark ? "#FFFFFF" : "#000000" }]}>Yemeğiniz Kaydedildi!</Text>
          <Text style={[styles.successSubtitle, { color: isDark ? "#8E8E93" : "#6D6D70" }]}>
            Kalori bilgileri hesaplandı ve kaydedildi
          </Text>
        </View>
        <Toast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast((t) => ({ ...t, visible: false }))}
        />
      </>
    )
  }

  // Error State
  if (error) {
    if (!toast.visible) setToast({ visible: true, message: error, type: "error" })
    setTimeout(() => {
      reset()
      setToast((t) => ({ ...t, visible: false }))
    }, 2000)

    return (
      <>
        <View
          style={[
            styles.errorContainer,
            {
              backgroundColor: isDark ? "#1C1C1E" : "#FFFFFF",
              borderColor: isDark ? "#2C2C2E" : "#E5E5EA",
            },
          ]}
        >
          <View style={styles.errorIconContainer}>
            <Ionicons name="alert-circle" size={48} color="#FF453A" />
          </View>
          <Text style={[styles.errorTitle, { color: isDark ? "#FF453A" : "#FF3B30" }]}>Bir Hata Oluştu</Text>
          <Text style={[styles.errorSubtitle, { color: isDark ? "#8E8E93" : "#6D6D70" }]}>{error}</Text>
        </View>
        <Toast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast((t) => ({ ...t, visible: false }))}
        />
      </>
    )
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? "#1C1C1E" : "#FFFFFF",
          borderColor: isDark ? "#2C2C2E" : "#E5E5EA",
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={[styles.iconContainer, { backgroundColor: isDark ? "#2C2C2E" : "#F2F2F7" }]}>
          <Ionicons name="restaurant" size={24} color={isDark ? "#3DCC85" : "#3DCC85"} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: isDark ? "#FFFFFF" : "#000000" }]}>Yediklerinizi Kaydedin</Text>
          <Text style={[styles.subtitle, { color: isDark ? "#8E8E93" : "#6D6D70" }]}>
            Fotoğraf ile kaydedin ve analiz edin
          </Text>
        </View>
      </View>

      {/* Image Preview Section */}
      {selectedImage && (
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
            <TouchableOpacity
              style={[styles.removeButton, { backgroundColor: isDark ? "#FF453A" : "#FF3B30" }]}
              onPress={handleRemoveImage}
            >
              <Ionicons name="close" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.imageLabel, { color: isDark ? "#8E8E93" : "#6D6D70" }]}>
            Fotoğraf başarıyla yüklendi
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={[styles.actionButton, styles.galleryButton, { backgroundColor: isDark ? "#2C2C2E" : "#F2F2F7" }]}
          onPress={() => animatePress(handlePickImage)}
          activeOpacity={0.8}
        >
          <View style={[styles.buttonIconContainer, { backgroundColor: "#3DCC85" }]}>
            <Ionicons name="images" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.buttonTextContainer}>
            <Text style={[styles.buttonTitle, { color: isDark ? "#FFFFFF" : "#000000" }]}>Galeriden Seç</Text>
            <Text style={[styles.buttonSubtitle, { color: isDark ? "#8E8E93" : "#6D6D70" }]}>
              Mevcut fotoğraflardan seç
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={isDark ? "#8E8E93" : "#6D6D70"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.cameraButton, { backgroundColor: isDark ? "#2C2C2E" : "#F2F2F7" }]}
          onPress={() => animatePress(handleTakePhoto)}
          activeOpacity={0.8}
        >
          <View style={[styles.buttonIconContainer, { backgroundColor: "#007AFF" }]}>
            <Ionicons name="camera" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.buttonTextContainer}>
            <Text style={[styles.buttonTitle, { color: isDark ? "#FFFFFF" : "#000000" }]}>Kamera ile Çek</Text>
            <Text style={[styles.buttonSubtitle, { color: isDark ? "#8E8E93" : "#6D6D70" }]}>Yeni fotoğraf çek</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={isDark ? "#8E8E93" : "#6D6D70"} />
        </TouchableOpacity>
      </View>

      {/* Tips Section */}
      {!selectedImage && (
        <View style={styles.tipsSection}>
          <View style={styles.tipItem}>
            <Ionicons name="bulb-outline" size={14} color={isDark ? "#8E8E93" : "#6D6D70"} />
            <Text style={[styles.tipText, { color: isDark ? "#8E8E93" : "#6D6D70" }]}>
              En iyi sonuç için yemeği iyi aydınlatılmış ortamda çekin
            </Text>
          </View>
        </View>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },

  // Loading State Styles
  loadingContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    alignItems: "center",
    minHeight: 280,
    justifyContent: "center",
  },
  loadingIconSection: {
    marginBottom: 20,
  },
  loadingIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingTextSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  loadingTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },
  loadingSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
  progressSection: {
    width: "100%",
    marginBottom: 24,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 2,
    width: "70%",
  },
  stepsSection: {
    width: "100%",
    gap: 12,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stepIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  stepText: {
    fontSize: 14,
    fontWeight: "400",
  },

  // Success State Styles
  successContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    alignItems: "center",
    minHeight: 200,
    justifyContent: "center",
  },
  successIconContainer: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },

  // Error State Styles
  errorContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    alignItems: "center",
    minHeight: 200,
    justifyContent: "center",
  },
  errorIconContainer: {
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  errorSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },

  // Original Styles
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
  },
  imageSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    position: "relative",
  },
  imagePreview: {
    width: 140,
    height: 140,
    borderRadius: 16,
    resizeMode: "cover",
  },
  removeButton: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  imageLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 8,
  },
  buttonSection: {
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    minHeight: 72,
  },
  galleryButton: {
    // Additional styling if needed
  },
  cameraButton: {
    // Additional styling if needed
  },
  buttonIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  buttonSubtitle: {
    fontSize: 13,
    fontWeight: "400",
  },
  tipsSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(142, 142, 147, 0.2)",
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  tipText: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    flex: 1,
  },
})

export default FoodLogCard
