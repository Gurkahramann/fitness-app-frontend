"use client"

import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"

interface TrainingHistoryCardProps {
  isDark: boolean
}

export default function TrainingHistoryCard({ isDark }: TrainingHistoryCardProps) {
  // Mock training history data
  const trainingHistory = [
    {
      id: "1",
      type: "Cardio",
      name: "Koşu",
      date: "8 May",
      duration: "30 dk",
      calories: 320,
    },
    {
      id: "2",
      type: "Strength",
      name: "Üst Vücut",
      date: "6 May",
      duration: "45 dk",
      calories: 280,
    },
    {
      id: "3",
      type: "Flexibility",
      name: "Yoga",
      date: "4 May",
      duration: "60 dk",
      calories: 180,
    },
  ]

  // Get icon based on training type
  const getTrainingIcon = (type: string) => {
    switch (type) {
      case "Cardio":
        return "run"
      case "Strength":
        return "weight-lifter"
      case "Flexibility":
        return "yoga"
      default:
        return "dumbbell"
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#222" : "#fff" }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Antrenman Geçmişi</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="chevron-right" size={24} color={isDark ? "#aaa" : "#666"} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={trainingHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.trainingItem, { borderBottomColor: isDark ? "#333" : "#eee" }]}>
            <View style={[styles.iconContainer, { backgroundColor: isDark ? "#333" : "#f5f5f5" }]}>
              <MaterialCommunityIcons name={getTrainingIcon(item.type)} size={24} color="#3DCC85" />
            </View>
            <View style={styles.trainingDetails}>
              <View style={styles.trainingHeader}>
                <Text style={[styles.trainingName, { color: isDark ? "#fff" : "#000" }]}>{item.name}</Text>
                <Text style={[styles.trainingDate, { color: isDark ? "#aaa" : "#666" }]}>{item.date}</Text>
              </View>
              <View style={styles.trainingStats}>
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="clock-outline" size={14} color={isDark ? "#aaa" : "#666"} />
                  <Text style={[styles.statText, { color: isDark ? "#aaa" : "#666" }]}>{item.duration}</Text>
                </View>
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="fire" size={14} color={isDark ? "#aaa" : "#666"} />
                  <Text style={[styles.statText, { color: isDark ? "#aaa" : "#666" }]}>{item.calories} kcal</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        scrollEnabled={false}
      />

      <TouchableOpacity style={[styles.viewAllButton, { backgroundColor: isDark ? "#333" : "#f5f5f5" }]}>
        <Text style={[styles.viewAllText, { color: isDark ? "#fff" : "#000" }]}>Tümünü Görüntüle</Text>
      </TouchableOpacity>
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
  trainingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  trainingDetails: {
    flex: 1,
  },
  trainingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  trainingName: {
    fontSize: 16,
    fontWeight: "500",
  },
  trainingDate: {
    fontSize: 12,
  },
  trainingStats: {
    flexDirection: "row",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    marginLeft: 4,
  },
  viewAllButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "500",
  },
})
