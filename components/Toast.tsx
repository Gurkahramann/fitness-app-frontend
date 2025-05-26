"use client"

import React, { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, TouchableOpacity, useColorScheme } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

// Define the toast types
export type ToastType = "success" | "error" | "info" | "warning"

// Define the props interface for the Toast component
interface ToastProps {
  visible: boolean
  message: string
  type?: ToastType
  duration?: number
  onDismiss: () => void
}

export default function Toast({ visible, message, type = "success", duration = 3000, onDismiss }: ToastProps) {
  const isDark = useColorScheme() === "dark"
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(-20)).current

  useEffect(() => {
    if (visible) {
      // Show toast
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()

      // Auto hide after duration
      const timer = setTimeout(() => {
        hideToast()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [visible])

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -20,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss()
    })
  }

  // If not visible, don't render
  if (!visible) return null

  // Icon and color based on toast type
  const getToastStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: "check-circle",
          backgroundColor: isDark ? "#1e392a" : "#e6f7ed",
          textColor: isDark ? "#4caf50" : "#2e7d32",
          borderColor: isDark ? "#4caf50" : "#a5d6a7",
        }
      case "error":
        return {
          icon: "alert-circle",
          backgroundColor: isDark ? "#3e2a2a" : "#ffebee",
          textColor: isDark ? "#f44336" : "#c62828",
          borderColor: isDark ? "#f44336" : "#ef9a9a",
        }
      case "warning":
        return {
          icon: "alert",
          backgroundColor: isDark ? "#3e3a2a" : "#fff8e1",
          textColor: isDark ? "#ffc107" : "#f57f17",
          borderColor: isDark ? "#ffc107" : "#ffe082",
        }
      case "info":
      default:
        return {
          icon: "information",
          backgroundColor: isDark ? "#2a3a3e" : "#e1f5fe",
          textColor: isDark ? "#03a9f4" : "#0277bd",
          borderColor: isDark ? "#03a9f4" : "#81d4fa",
        }
    }
  }

  const toastStyles = getToastStyles()

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
          backgroundColor: toastStyles.backgroundColor,
          borderColor: toastStyles.borderColor,
        },
      ]}
    >
      <View style={styles.content}>
        <MaterialCommunityIcons name={toastStyles.icon as keyof typeof MaterialCommunityIcons.glyphMap} size={24} color={toastStyles.textColor} style={styles.icon} />
        <Text style={[styles.message, { color: toastStyles.textColor }]}>{message}</Text>
        <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
          <MaterialCommunityIcons name="close" size={18} color={toastStyles.textColor} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 9999,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  icon: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },
  closeButton: {
    padding: 4,
  },
})
