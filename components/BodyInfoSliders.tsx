"use client"

import { useState, useEffect, useCallback } from "react"
import { View, Text, StyleSheet, Platform, useColorScheme } from "react-native"
import Slider from "@react-native-community/slider"
import { MaterialCommunityIcons, Feather,FontAwesome6} from "@expo/vector-icons"
import React from "react"

type IconLibrary = "MaterialCommunityIcons" | "Feather" |"FontAwesome6"

type OptimizedSliderProps = {
  label: string
  value: number
  minimumValue: number
  maximumValue: number
  step: number
  onValueChange: (value: number) => void
  unit?: string
  icon?: {
    name: string
    library: IconLibrary
  }
}

export default function OptimizedSlider({
  label,
  value,
  minimumValue,
  maximumValue,
  step,
  onValueChange,
  unit = "",
  icon,
}: OptimizedSliderProps) {
  const isDark = useColorScheme() === "dark"
  // Local state for the slider value to show real-time updates
  const [localValue, setLocalValue] = useState(value)

  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  // Update local value during sliding for immediate visual feedback
  const handleSliding = useCallback((val: number) => {
    setLocalValue(val)
  }, [])

  // Update parent component state when sliding completes
  const handleSlidingComplete = useCallback(
    (val: number) => {
      setLocalValue(val)
      onValueChange(val)
    },
    [onValueChange],
  )

  // Render the appropriate icon based on the library
  const renderIcon = () => {
    if (!icon) return null

    const iconColor = isDark ? "#fff" : "#000"

    if (icon.library === "MaterialCommunityIcons") {
      return (
        <MaterialCommunityIcons
          name={icon.name as keyof typeof MaterialCommunityIcons.glyphMap}
          size={20}
          color={iconColor}
          style={styles.icon}
        />
      )
    } else if (icon.library === "FontAwesome6") {
      return (
        <FontAwesome6 name={icon.name as keyof typeof FontAwesome6.glyphMap} size={20} color={iconColor} style={styles.icon} />
      )
    }

    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {renderIcon()}
        <Text style={[styles.label, { color: isDark ? "#fff" : "#000" }]}>{label}</Text>
        <Text style={[styles.value, { color: isDark ? "#fff" : "#000" }]}>
          {localValue.toFixed(step < 1 ? 1 : 0)} {unit}
        </Text>
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          step={step}
          value={value}
          // Use both for real-time updates
          onValueChange={handleSliding}
          onSlidingComplete={handleSlidingComplete}
          minimumTrackTintColor={isDark ? "#fff" : "#000"}
          maximumTrackTintColor={isDark ? "#444" : "#e0e0e0"}
          thumbTintColor={isDark ? "#fff" : "#000"}
          // Android-specific props for better performance
          {...(Platform.OS === "android" && {
            renderToHardwareTextureAndroid: true,
          })}
        />

        <View style={styles.rangeLabels}>
          <Text style={[styles.rangeLabel, { color: isDark ? "#aaa" : "#888" }]}>
            {minimumValue}
            {unit}
          </Text>
          <Text style={[styles.rangeLabel, { color: isDark ? "#aaa" : "#888" }]}>
            {maximumValue}
            {unit}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
  },
  sliderContainer: {
    width: "100%",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  rangeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -4,
  },
  rangeLabel: {
    fontSize: 12,
  },
})

