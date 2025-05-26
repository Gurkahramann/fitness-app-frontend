"use client"

import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"

interface WeeklySummaryCardProps {
  isDark: boolean
}

export default function WeeklySummaryCard({ isDark }: WeeklySummaryCardProps) {
  // Mock weekly data
  const weeklyData = {
    workouts: 3,
    calories: 1250,
    steps: 42500,
    distance: 28.5,
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#222" : "#fff" }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Haftalık Özet</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="chevron-right" size={24} color={isDark ? "#aaa" : "#666"} />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <View style={[styles.iconContainer, { backgroundColor: isDark ? "#333" : "#f5f5f5" }]}>
            <MaterialCommunityIcons name="dumbbell" size={20} color="#3DCC85" />
          </View>
          <View style={styles.summaryTextContainer}>
            <Text style={[styles.summaryValue, { color: isDark ? "#fff" : "#000" }]}>{weeklyData.workouts}</Text>
            <Text style={[styles.summaryLabel, { color: isDark ? "#aaa" : "#666" }]}>Antrenman</Text>
          </View>
        </View>

        <View style={styles.summaryItem}>
          <View style={[styles.iconContainer, { backgroundColor: isDark ? "#333" : "#f5f5f5" }]}>
            <MaterialCommunityIcons name="fire" size={20} color="#FF6347" />
          </View>
          <View style={styles.summaryTextContainer}>
            <Text style={[styles.summaryValue, { color: isDark ? "#fff" : "#000" }]}>{weeklyData.calories}</Text>
            <Text style={[styles.summaryLabel, { color: isDark ? "#aaa" : "#666" }]}>Kalori</Text>
          </View>
        </View>

        <View style={styles.summaryItem}>
          <View style={[styles.iconContainer, { backgroundColor: isDark ? "#333" : "#f5f5f5" }]}>
            <MaterialCommunityIcons name="shoe-print" size={20} color="#4682B4" />
          </View>
          <View style={styles.summaryTextContainer}>
            <Text style={[styles.summaryValue, { color: isDark ? "#fff" : "#000" }]}>{weeklyData.steps}</Text>
            <Text style={[styles.summaryLabel, { color: isDark ? "#aaa" : "#666" }]}>Adım</Text>
          </View>
        </View>

        <View style={styles.summaryItem}>
          <View style={[styles.iconContainer, { backgroundColor: isDark ? "#333" : "#f5f5f5" }]}>
            <MaterialCommunityIcons name="map-marker-distance" size={20} color="#9370DB" />
          </View>
          <View style={styles.summaryTextContainer}>
            <Text style={[styles.summaryValue, { color: isDark ? "#fff" : "#000" }]}>{weeklyData.distance} km</Text>
            <Text style={[styles.summaryLabel, { color: isDark ? "#aaa" : "#666" }]}>Mesafe</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  summaryLabel: {
    fontSize: 12,
  },
})
