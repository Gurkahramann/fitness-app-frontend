"use client"

import React from "react"
import { Modal, View, Text, TouchableOpacity, StyleSheet, useColorScheme, Animated, Dimensions } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export interface AlertButton {
  text: string
  style?: "default" | "cancel" | "destructive"
  onPress?: () => void
}

interface CustomAlertProps {
  visible: boolean
  title: string
  message?: string
  buttons: AlertButton[]
  onClose: () => void
  icon?: string
  iconColor?: string
}

const { width: screenWidth } = Dimensions.get("window")

export default function CustomAlert({ visible, title, message, buttons, onClose, icon, iconColor }: CustomAlertProps) {
  const isDark = useColorScheme() === "dark"
  const scaleValue = React.useRef(new Animated.Value(0)).current
  const opacityValue = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [visible])

  const getButtonStyle = (style?: string) => {
    switch (style) {
      case "destructive":
        return {
          backgroundColor: "#FF3B30",
          color: "#FFFFFF",
        }
      case "cancel":
        return {
          backgroundColor: isDark ? "#2C2C2E" : "#F2F2F7",
          color: isDark ? "#FFFFFF" : "#000000",
        }
      default:
        return {
          backgroundColor: "#007AFF",
          color: "#FFFFFF",
        }
    }
  }

  const getIconForAlert = () => {
    if (icon) return icon

    // Auto-detect icon based on button styles
    const hasDestructive = buttons.some((btn) => btn.style === "destructive")
    if (hasDestructive) return "alert-circle"
    return "information"
  }

  const getIconColor = () => {
    if (iconColor) return iconColor

    const hasDestructive = buttons.some((btn) => btn.style === "destructive")
    if (hasDestructive) return "#FF3B30"
    return "#007AFF"
  }

  const handleButtonPress = (button: AlertButton) => {
    onClose()
    setTimeout(() => {
      button.onPress?.()
    }, 150)
  }

  if (!visible) return null

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: opacityValue,
          },
        ]}
      >
        <TouchableOpacity style={styles.overlayTouch} activeOpacity={1} onPress={onClose} />

        <Animated.View
          style={[
            styles.alertContainer,
            {
              backgroundColor: isDark ? "#1C1C1E" : "#FFFFFF",
              transform: [{ scale: scaleValue }],
            },
          ]}
        >
          {/* Icon */}
          <View style={[styles.iconContainer, { backgroundColor: getIconColor() + "15" }]}>
            <MaterialCommunityIcons name={getIconForAlert() as any} size={32} color={getIconColor()} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={[styles.title, { color: isDark ? "#FFFFFF" : "#000000" }]}>{title}</Text>

            {message && <Text style={[styles.message, { color: isDark ? "#AEAEB2" : "#8E8E93" }]}>{message}</Text>}
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => {
              const buttonStyle = getButtonStyle(button.style)
              const isLastButton = index === buttons.length - 1

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.button,
                    {
                      backgroundColor: buttonStyle.backgroundColor,
                      marginBottom: isLastButton ? 0 : 8,
                    },
                  ]}
                  onPress={() => handleButtonPress(button)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.buttonText, { color: buttonStyle.color }]}>{button.text}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  overlayTouch: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  alertContainer: {
    width: Math.min(screenWidth - 40, 320),
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  content: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 24,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
})
